from flask import Flask, jsonify, request
import json

#App class creation, loading data from JSON and routes creation
app = Flask(__name__)

# Load data from JSON file
with open("../routes.json", "r") as file:
    routes = json.load(file)

    products = routes.get("Product", {})
    users = routes.get("User", {})
    categories = routes.get("Category", {})

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
@app.route("/product")
def list_products():
    return jsonify(products)

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
def get_product(product_id):
    return get_item(products, 'id', product_id)

@app.route('/product/<product_id>', methods=['POST'])
def update_product(product_id):
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


if __name__ == "__main__":
    app.run(debug=True)
