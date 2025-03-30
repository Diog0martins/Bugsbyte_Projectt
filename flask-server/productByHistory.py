import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix
from sklearn.preprocessing import MultiLabelBinarizer
import pickle


def load_model_and_columns():
    try:
        with open("../../models/modelbyHistory.pkl", 'rb') as f:
            model = pickle.load(f)

        with open("../../models/columns.pkl", 'rb') as f:
            columns = pickle.load(f)

        return model, columns
    except FileNotFoundError:
        print("Saved model not found. You need to train the model first.")
        return None, None
    except Exception as e:
        print(f"Error loading model: {e}")
        return None, None


def predict_user_purchase_history(model, feature_columns, shopping_cart, top_n=5):

    # Criar um vetor com a mesma estrutura das features do modelo
    shopping_cart_vector = {product: 0 for product in feature_columns}

    # Preencher o vetor com as quantidades dos produtos no carrinho
    for product, quantity in shopping_cart.items():
        if product in shopping_cart_vector:
            shopping_cart_vector[product] = quantity  

    # Criar DataFrame garantindo que as colunas estão na ordem correta
    X_new = pd.DataFrame([shopping_cart_vector], columns=feature_columns)

    # Obter as probabilidades de cada classe
    probas = model.predict_proba(X_new)[0]

    # Obter os índices dos top_n produtos mais prováveis
    top_indices = probas.argsort()[-top_n:][::-1]

    # Mapear os índices para os nomes dos produtos
    top_products = [model.classes_[i] for i in top_indices]

    return top_products

def give_user_recommendations(shopping_cart):
    model, columns = load_model_and_columns()
    if model is None or columns is None:
        return {"error": "Model not loaded."}

    # Preencher o vetor com as quantidades dos produtos no carrinho
    recommendations = predict_user_purchase_history(model, columns, shopping_cart)
    
    return recommendations
