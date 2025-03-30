from flask import Flask, jsonify, request
import json
import atexit
import sys
import os
# Add the parent directory to the Python path to resolve the relative import
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

import productByInfo as productmodule

# App class creation, loading data from JSON and routes creation
app = Flask(__name__)

JSON_FILE = "routes.json"

# Load JSON once at the start
def load_routes():
    """Load routes from JSON file."""
    with open(JSON_FILE, "r") as file:
        return json.load(file)

# Save updated routes to JSON file
def save_routes(routes):
    """Save updated routes back to JSON file."""
    with open(JSON_FILE, "w") as file:
        json.dump(routes, file, indent=4)

# Load the data into memory
routes = load_routes()
products = routes.get("Product", [])
users = routes.get("User", [])
categories = routes.get("Category", {})

def get_user_component(user_name):
    user_info = next((u for u in users if u.get('routename') == user_name), None)
    
    if user_info:
        # Remove the 'routename', 'email', and 'phone' keys
        user_info = {key: value for key, value in user_info.items() if key not in ['routename', 'email', 'phone', 'account_no']}
        return jsonify(user_info)
    else:
        return jsonify({"error": "User not found"}), 404

# Function to create dynamic routes
def create_route(info_type, name, info):
    def route():
        return jsonify({info_type: {name: info}})
    return route

# Dynamically create routes for each product
for product in products:
    product_name = product.get('id')
    if product_name:
        endpoint_name = f"product_{product_name}"
        app.add_url_rule(
            rule=f"/product/{product_name}",
            endpoint=endpoint_name,
            view_func=create_route("product", product_name, product)
        )

# Dynamically create routes for each user
for user in users:
    user_name = user.get('username')
    if user_name:
        endpoint_name = f"user_{user_name}"
        app.add_url_rule(
            rule=f"/user/{user_name}",
            endpoint=endpoint_name,
            view_func=create_route("user", user_name, user)
        )

# Dynamically create routes for each category
for category in categories:
    category_name = category.get('name')
    if category_name:
        endpoint_name = f"{category['slug']}"
        app.add_url_rule(
            rule=f"/category/{category['slug']}",
            endpoint=endpoint_name,
            view_func=create_route("category", category_name, category)
        )

# Route to list all products
@app.route("/product", methods=['GET'])
def list_products():
    return jsonify(products)

@app.route("/product", methods=['POST'])
def update_product():
    data = request.json  # Extract JSON data

    if not data or "routename" not in data:
        return jsonify({"error": "Missing 'routename' in request"}), 400

    username = data["routename"]

    # Check if username exists in users
    user_exists = any(user["routename"] == username for user in users)

    if not user_exists:
        return jsonify({"error": f"User '{username}' not found"}), 404

    user_component = get_user_component(username)
    
    print("================================================")
    for item in user_component.json:
        print(item)
    print("================================================")

    featured_products = productmodule.give_user_products(user_component)

    print("vou embora")
    print(featured_products)
    
    for product in products:
        if product["name"] in featured_products:
            product["featured"] = True

    return jsonify({"message": "Product updated", "updated_product": product})


# Route to list all users
@app.route("/user")
def list_users():
    return jsonify(users)

# Route to list all categories
@app.route("/category")
def list_categories():
    return jsonify(categories)

def get_item(collection, key, value):
    """Retrieve an item from a collection based on a key-value pair."""
    item = next((entry for entry in collection if entry.get(key) == value), None)
    if item:
        return jsonify(item)
    return jsonify({"error": f"{key.capitalize()} not found"}), 404

def update_item(collection, key, value, data):
    """Update an item in a collection if it exists."""
    item = next((entry for entry in collection if entry.get(key) == value), None)
    if item:
        item.update(data)
        return jsonify({"message": f"{key.capitalize()} '{value}' updated successfully."})
    return jsonify({"error": f"{key.capitalize()} not found"}), 404

# Product Routes
@app.route('/product/<product_id>', methods=['GET'])
def get_product_by_id(product_id):
    return get_item(products, 'id', product_id)

@app.route('/product/<product_id>', methods=['POST'])
def update_product_by_id(product_id):
    return update_item(products, 'id', product_id, request.get_json())

# User Routes
@app.route('/user/<user_name>', methods=['GET'])
def get_user(user_name):
    if request.method == 'GET':
        user_info = next((u for u in users if u.get('routename') == user_name), None)
        if user_info:
            return jsonify(user_info)
        else:
            return jsonify({"error": "User not found"}), 404
    elif request.method == 'POST':
        user_info = next((u for u in users if u.get('routename') == user_name), None)
        if user_info:
            data = request.get_json()
            user_info.update(data)
            return jsonify({"message": f"User '{user_name}' updated successfully."})
        else:
            return jsonify({"error": "User not found"}), 404

@app.route('/user/<user_name>', methods=['POST'])
def update_user(user_name):
    return update_item(users, 'username', user_name, request.get_json())

# Category Routes
@app.route('/category/<category_name>', methods=['GET'])
def get_category(category_name):
    return get_item(categories, 'name', category_name)

@app.route('/category/<category_name>', methods=['POST'])
def update_category(category_name):
    return update_item(categories, 'name', category_name, request.get_json())

# Function to save changes at shutdown
def save_on_exit():
    save_routes(routes)

atexit.register(save_on_exit)

if __name__ == "__main__":
    app.run(debug=True)
