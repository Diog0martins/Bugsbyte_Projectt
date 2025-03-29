import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix
from sklearn.preprocessing import MultiLabelBinarizer
import pickle


def load_model_and_encoders():
    try:
        with open("./models/modelbyInfo.pkl", 'rb') as f:
            model = pickle.load(f)
            
        with open("./models/modelbyInfoEncoder.pkl", 'rb') as f:
            label_encoders = pickle.load(f)
            
        return model, label_encoders
    except FileNotFoundError:
        print("Saved model not found. You need to train the model first.")
        return None, None
    except Exception as e:
        print(f"Error loading model: {e}")
        return None, None
    


def predict_user_purchase(model, label_encoders, user_data, top_n=5):
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


def main():
    try:
        
        model,label_encoders = load_model_and_encoders()

        user_data = {
        "family_members": 4,
        "age_group": "18-25 anos",
        "district": "vila real",
        "segment_cd_lifestyle": "8",
        "segment_cd_lifestage": "6"
        }

        predicted_products = predict_user_purchase(model, label_encoders, user_data, top_n=5)
        print(f"Os produtos mais prováveis que o utilizador comprará são: {predicted_products}")
        
    except FileNotFoundError:
        print("Error: File not found. Check the file path.")
    except Exception as e:
        print(f"Unexpected error: {e}")

if __name__ == "__main__":
    main()