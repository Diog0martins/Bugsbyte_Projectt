import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix
from sklearn.preprocessing import MultiLabelBinarizer

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
        # Read and merge data (unchanged)
        dfCompras = pd.read_csv("../csvs/sample_sales_info_encripted.csv", delimiter=",", quotechar='"', on_bad_lines="skip")
        dfUsers = pd.read_csv("../csvs/sample_account_info_encripted.csv", delimiter=",", quotechar='"', on_bad_lines="skip")
        df = pd.merge(dfCompras, dfUsers, on="account_no", how="left")

        # Create pivot table (unchanged)
        df_pivot = df.groupby([
            'account_no',
            'family_members', 
            'age_group',
            'district',
            'segment_cd_lifestyle',
            'segment_cd_lifestage',
            'product_dsc'
        ])['qty'].sum().unstack(fill_value=0)

        # Get target product and reset index PROPERLY
        df_pivot = df_pivot.copy()  # Explicit copy to avoid warnings
        df_pivot["target_product"] = df_pivot.idxmax(axis=1)
        df_final = df_pivot.reset_index()

        # Features and target
        features = [
            'family_members', 
            'age_group', 
            'district', 
            'segment_cd_lifestyle',
            'segment_cd_lifestage'
        ]
        
        # Create X and y PROPERLY
        X = df_final[features].copy()  # Explicit copy to avoid warnings
        y = df_final["target_product"]

        # Encode categorical features SAFELY
        label_encoders = {}
        for column in features:
            if X[column].dtype == 'object':
                le = LabelEncoder()
                X.loc[:, column] = le.fit_transform(X[column])  # Use .loc to avoid warnings
                label_encoders[column] = le

        # Split data
        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=0.2, random_state=42
        )

        # Train model
        model = RandomForestClassifier(
            n_estimators=100,
            random_state=42,
            class_weight='balanced'  # Handles imbalanced classes
        )
        model.fit(X_train, y_train)

        # Evaluate
        y_pred = model.predict(X_test)


        
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