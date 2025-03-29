import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix
import pickle
import os

def train_and_save_model():
    try:
        # Read and merge data
        dfCompras = pd.read_csv("../csvs/sample_sales_info_encripted.csv", delimiter=",", quotechar='"', on_bad_lines="skip")
        dfUsers = pd.read_csv("../csvs/sample_account_info_encripted.csv", delimiter=",", quotechar='"', on_bad_lines="skip")
        df = pd.merge(dfCompras, dfUsers, on="account_no", how="left")

        # Create a DataFrame where each row corresponds to a user and each column to a product bought
        df_pivot = df.groupby(['account_no', 'product_dsc'])['qty'].sum().unstack(fill_value=0).reset_index()

        # The first column will be account_no and the rest will be the quantity of each product bought by the user
        df_final = df_pivot

        # Define the target as the most bought product per user (could change to another target)
        df_final["target_product"] = df_final.drop(columns=["account_no"]).idxmax(axis=1)

        # Features are the quantities of products bought, and target is the product to recommend
        X = df_final.drop(columns=["account_no", "target_product"])  # Exclude account_no and target_product
        y = df_final["target_product"]

        # Split data into train and test sets
        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=0.2, random_state=42
        )

        # Train the model
        model = RandomForestClassifier(
            n_estimators=100,
            random_state=42,
            class_weight='balanced'
        )
        model.fit(X_train, y_train)

        # Save the model
        with open("./models/modelbyHistory.pkl", 'wb') as f:
            pickle.dump(model, f)
            
        print("Model trained and saved successfully.")
        
    except FileNotFoundError:
        print("Error: File not found. Check the file path.")
    except Exception as e:
        print(f"Unexpected error during training: {e}")


def main():
    # Check if model exists, if not train and save it
    if not os.path.exists("./models/modelbyHistory.pkl"):
        print("Model not found. Training new model...")
        train_and_save_model()
    
    else:
        print("Model already exists")
    

if __name__ == "__main__":
    main()
