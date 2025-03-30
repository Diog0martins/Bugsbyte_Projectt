import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix
from sklearn.preprocessing import MultiLabelBinarizer
import pickle
import json

def load_model_and_encoders():
    try:
        with open("../../models/modelbyInfo.pkl", 'rb') as f:
            model = pickle.load(f)
            
        with open("../../models/modelbyInfoEncoder.pkl", 'rb') as f:
            label_encoders = pickle.load(f)
            
        return model, label_encoders
    except FileNotFoundError:
        print("Saved model not found. You need to train the model first.")
        return None, None
    except Exception as e:
        print(f"Error loading model: {e}")
        return None, None
    


def predict_user_purchase(model, label_encoders, user_data, top_n=20):
    # Transform categorical values using the stored label encoders
    user_encoded = {}
    for col, value in user_data.items():
        if col in label_encoders:
            user_encoded[col] = label_encoders[col].transform([value])[0]  # Encode category
        else:
            user_encoded[col] = value  # Keep numerical values as is

    # Criar DataFrame com uma única linha
    X_new = pd.DataFrame([user_encoded])

    # Obter as probabilidades de cada classe
    probas = model.predict_proba(X_new)[0]
    
    # Obter os índices dos top_n produtos mais prováveis
    top_indices = probas.argsort()[-top_n:][::-1]  # Ordem decrescente
    
    # Mapear os índices para os nomes dos produtos
    top_products = [model.classes_[i] for i in top_indices]
    
    return top_products


def get_products_by_names(predicted_products):
    """
    Takes a list of predicted product names and returns complete product information
    from routes.json for those products.
    
    Args:
        predicted_products: List of product names (strings)
        
    Returns:
        List of product objects with complete information
    """
    try:
        # Load routes.json file
        with open('./routes.json', 'r', encoding='utf-8') as f:
            routes_data = json.load(f)
        
        # Get all products from routes.json
        all_products = routes_data.get('Product', [])
        
        # Create a dictionary for quick lookup by name
        products_by_name = {product['name']: product for product in all_products if 'name' in product}
        
        # Find the products that match the predicted names
        matched_products = []
        for product_name in predicted_products:
            if product_name in products_by_name:
                matched_products.append(products_by_name[product_name])
        
        return matched_products
    
    except FileNotFoundError:
        print("Error: routes.json file not found")
        return []
    except json.JSONDecodeError:
        print("Error: routes.json is not a valid JSON file")
        return []
    except Exception as e:
        print(f"Unexpected error: {e}")
        return []

def give_user_products(user_data = {
                        "family_members": 4,
                        "age_group": "18-25 anos",
                        "district": "vila real",
                        "segment_cd_lifestyle": "8",
                        "segment_cd_lifestage": "6"
                }
):
    try:
        model, label_encoders = load_model_and_encoders()           


        predicted_product_names = predict_user_purchase(model, label_encoders, user_data, top_n=20)
        
        # Get complete product information for the predicted products
        recommended_products = get_products_by_names(predicted_product_names)

        return recommended_products
        
    except FileNotFoundError:
        print("Error: File not found. Check the file path.")
        return []
    except Exception as e:
        print(f"Unexpected error: {e}")
        return []

