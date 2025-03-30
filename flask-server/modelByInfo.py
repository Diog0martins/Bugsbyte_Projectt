import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix
from sklearn.preprocessing import MultiLabelBinarizer
import pickle
import os

def train_and_save_model():
    try:
        # Read and merge data
        dfCompras = pd.read_csv("../../csv/sample_sales_info_encripted.csv", delimiter=",", quotechar='"', on_bad_lines="skip")
        dfUsers = pd.read_csv("../../csv/sample_account_info_encripted.csv", delimiter=",", quotechar='"', on_bad_lines="skip")
        df = pd.merge(dfCompras, dfUsers, on="account_no", how="left")

        print(df)

        # Create pivot table
        df_pivot = df.groupby([
            'account_no',
            'family_members', 
            'age_group',
            'district',
            'segment_cd_lifestyle',
            'segment_cd_lifestage',
            'product_dsc'
        ])['qty'].sum().unstack(fill_value=0)

        # Get target product and reset index
        df_pivot = df_pivot.copy()
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
        
        X = df_final[features].copy()
        y = df_final["target_product"]

        # Encode categorical features
        label_encoders = {}
        for column in features:
            if X[column].dtype == 'object':
                le = LabelEncoder()
                X.loc[:, column] = le.fit_transform(X[column])
                label_encoders[column] = le

        # Split data
        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=0.2, random_state=42
        )

        # Train model
        model = RandomForestClassifier(
            n_estimators=100,
            random_state=42,
            class_weight='balanced'
        )
        model.fit(X_train, y_train)

        # Save model and encoders
        with open("../../models/modelbyInfo.pkl", 'wb') as f:
            pickle.dump(model, f)
        
        with open("../../models/modelbyInfoEncoder.pkl", 'wb') as f:
            pickle.dump(label_encoders, f)
            
        print("Model trained and saved successfully.")
        
    except FileNotFoundError:
        print("Error: File not found. Check the file path.")
    except Exception as e:
        print(f"Unexpected error during training: {e}")


def main():
    # Check if model exists, if not train and save it
    if not os.path.exists("../../models/modelbyInfo.pkl") or not os.path.exists("../../models/modelbyInfoEncoder.pkl"):
        print("Model not found. Training new model...")
        train_and_save_model()
    
    else:
        print("Model already exists")
    

if __name__ == "__main__":
    main()
