from flask import Flask, jsonify, request
from flask_cors import CORS
import json

#App class creation, loading data from JSON and routes creation
app = Flask(__name__)
CORS(app) 

# Load data from JSON file
with open("routes.json", "r") as file:
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
    product_name = product.get('name')
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

#Communicate with the other contexts
@app.route('/product/<product_name>', methods=['GET', 'POST'])
def get_product(product_name):
    if request.method == 'GET':
        product_info = products.get(product_name)
        if product_info:
            return jsonify(product_info)
        else:
            return jsonify({"error": "Product not found"}), 404
    elif request.method == 'POST':
        if product_name in products:
            data = request.get_json()
            products[product_name].update(data)
            return jsonify({"message": f"Product '{product_name}' updated successfully."})
        else:
            return jsonify({"error": "Product not found"}), 404
        
@app.route('/user/<user_name>', methods=['GET', 'POST'])
def get_user(user_name):
    if request.method == 'GET':
        user_info = users.get(user_name)
        if user_info:
            return jsonify(user_info)
        else:
            return jsonify({"error": "User not found"}), 404
    elif request.method == 'POST':
        if user_name in users:
            data = request.get_json()
            users[user_name].update(data)
            return jsonify({"message": f"User '{user_name}' updated successfully."})
        else:
            return jsonify({"error": "User not found"}), 404


@app.route('/category/<category_name>', methods=['GET', 'POST'])
def get_category(category_name):
    if request.method == 'GET':
        category_info = categories.get(category_name)
        if category_info:
            return jsonify(category_info)
        else:
            return jsonify({"error": "Category not found"}), 404
    elif request.method == 'POST':
        if category_name in categories:
            data = request.get_json()
            categories[category_name].update(data)
            return jsonify({"message": f"Category '{category_name}' updated successfully."})
        else:
            return jsonify({"error": "Category not found"}), 404


if __name__ == "__main__":
    app.run(debug=True)
