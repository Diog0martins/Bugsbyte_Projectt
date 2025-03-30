import csv
import json
import os
import random

dicionario_de_categorias = {
    "carne": ["1101 - bovino", "1104 - aves e coelho"],
    "peixe": ["1201 - peixe,marisco fresco"],
    "ingredientes-basicos": ["1002 - ingredientes básicos"],
    "frutas": ["1501 - frutas"],
}

def defineCategory(code):
    for category, values in dicionario_de_categorias.items():
        print(code)
        if code in values:
            return category
    # Return a default category if no match is found
    return "uncategorized"

def csv_to_json(csv_filename, json_filename):
    csv_path = os.path.join(os.path.dirname(__file__), "../../csv", csv_filename)
    json_path = os.path.join(os.path.dirname(__file__), json_filename)

    with open(csv_path, mode='r', encoding='utf-8') as file:
        # First, check the column names in the CSV file
        csv_reader = csv.DictReader(file, delimiter=',')
        
        # Print the actual column names for debugging
        column_names = csv_reader.fieldnames
        print(f"Available columns in CSV: {column_names}")
        
        # Reset file pointer to start
        file.seek(0)
        csv_reader = csv.DictReader(file, delimiter=';')
        
        json_data = []
        for row in csv_reader:
            # Use try/except to handle potential missing keys
            try:
                dicionario = {
                    "id": row.get("sku", "unknown_id"),  # Use .get() with fallback value
                    "name": row.get("product_dsc", "unknown_name"),
                    "description": None,
                    "price": random.randint(1,20),
                    "image": None,
                    "categorySlug": defineCategory(row.get("cat_dsc_ext", "unknown_category")),
                    "featured": False,
                    "recomended" : False, 
                }
                json_data.append(dicionario)
            except Exception as e:
                print(f"Error processing row: {row}")
                print(f"Error details: {e}")

        product = {"Product": json_data}

    # Fix the order of operations - open file first, then dump JSON
    with open(json_path, mode='w', encoding='utf-8') as json_file:
        json.dump(product, json_file, indent=4, ensure_ascii=False)
    
    print(f"Successfully converted {csv_filename} to {json_filename}")

# Example usage
csv_to_json(
    csv_filename="sample_prod_info.csv",  # Remove the leading slash
    json_filename="routes.json"
)
