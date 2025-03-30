import json

def print_categories(json_file):
    """Reads JSON and prints all unique categories from 'categorySlug' in 'Product' section."""
    with open(json_file, "r", encoding="utf-8") as file:
        data = json.load(file)  # Load the entire JSON

    # Extract only the "Product" section
    products = data.get("Product", [])  # Defaults to an empty list if "Product" key is missing

    # Extract unique category slugs
    categories = {product.get("categorySlug", "outros") for product in products}

    # Print the categories
    for category in categories:
        print(category)

# Example usage:
json_filename = "routes.json"  # Replace with your actual JSON file
print_categories(json_filename)
