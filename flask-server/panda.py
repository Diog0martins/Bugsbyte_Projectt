import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score


def main():
    # Load data

    filepath = "../csvs/sample_prod_info.csv"


    try:
        df = pd.read_csv(filepath,
                         delimiter=",",
                         quotechar='"',
                         on_bad_lines="skip")  
        
        print("Data loaded successfully!\n")
        
        print("First 5 rows:")
        print(df[1], "\n")

    except FileNotFoundError:
        print("Error: File not found. Check the file path.")

if __name__ == "__main__":
    main()