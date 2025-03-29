from flask import Flask, jsonify
import json

#App class creation, loading data from JSON and routes creation
app = Flask(__name__)

# Load data from JSON file
with open("routes.json", "r") as file:
    routes = json.load(file)

products = routes.get("products", {})
users = routes.get("users", {})

# Function to create dynamic routes
def create_route(info_type, name, info):
    def route():
        return jsonify({info_type: {name: info}})
    return route

# Dynamically create routes for each product
for product_name, product_info in products.items():
    endpoint_name = f"product_{product_name}"
    app.add_url_rule(
        rule=f"/product/{product_name}",
        endpoint=endpoint_name,
        view_func=create_route("product", product_name, product_info)
    )

# Dynamically create routes for each user
for user_name, user_info in users.items():
    endpoint_name = f"user_{user_name}"
    app.add_url_rule(
        rule=f"/user/{user_name}",
        endpoint=endpoint_name,
        view_func=create_route("user", user_name, user_info)
    )

# Route to list all products
@app.route("/products")
def list_products():
    return jsonify(products)

# Route to list all users
@app.route("/users")
def list_users():
    return jsonify(users)



if __name__ == "__main__":
    app.run(debug=True)
