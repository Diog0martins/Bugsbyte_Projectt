import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix
from sklearn.preprocessing import MultiLabelBinarizer
import pickle


def load_history_model():
    try:
        with open("./models/modelbyHistory.pkl", 'rb') as f:
            model = pickle.load(f)
            
            
        return model
    except FileNotFoundError:
        print("Saved model not found. You need to train the model first.")
        return None, None
    except Exception as e:
        print(f"Error loading model: {e}")
        return None, None
    



def predict_user_purchase_history(model, shopping_cart, top_n=5):

    # Obter as colunas do modelo (produtos que o modelo foi treinado para reconhecer)
    product_columns = model.classes_

    # Criar um vetor com a mesma estrutura do DataFrame do modelo
    shopping_cart_vector = {product: 0 for product in product_columns}

    # Preencher o vetor com as quantidades dos produtos no carrinho
    for product, quantity in shopping_cart.items():
        if product in shopping_cart_vector:
            shopping_cart_vector[product] = quantity  # Adiciona a quantidade comprada

    # Criar DataFrame com uma única linha (um vetor com valores dos produtos no carrinho)
    X_new = pd.DataFrame([shopping_cart_vector])

    # Obter as probabilidades de cada classe
    probas = model.predict_proba(X_new)[0]
    
    # Obter os índices dos top_n produtos mais prováveis
    top_indices = probas.argsort()[-top_n:][::-1]  # Ordem decrescente
    
    # Mapear os índices para os nomes dos produtos
    top_products = [model.classes_[i] for i in top_indices]
    
    return top_products


def main():
    try:
        
        model,label_encoders = load_history_model()

        shopping_cart = {
        "LINGUADO DA GUINE": 2,
        "FIGO DA INDIA CNT KG": 1,
        "CASTANHETA MAD": 6
        }

        predicted_products = predict_user_purchase_history(model, label_encoders, shopping_cart, top_n=5)
        print(f"Os produtos mais prováveis que o utilizador comprará são: {predicted_products}")
        
    except FileNotFoundError:
        print("Error: File not found. Check the file path.")
    except Exception as e:
        print(f"Unexpected error: {e}")

if __name__ == "__main__":
    main()