from flask import Flask, request
from flask_cors import CORS
import joblib
import pandas as pd

app = Flask(__name__)
CORS(app)

# Load the trained model
model = joblib.load('model.pkl')

# Define a route for making predictions
@app.route('/', methods=['POST'])
def predict():
    try:
        # Get the JSON data from the request
        data = request.json

        # Convert the incoming data to a DataFrame
        df = pd.DataFrame([data])

        # Preprocess the data to match the training format
        df = pd.get_dummies(df, columns=['property_type'], prefix='property_type')
        df = df.replace({True: 1, False: 0})

        df = pd.get_dummies(df, columns=['tenure'], prefix='tenure')
        df = df.replace({True: 1, False: 0})

        # Ensure the DataFrame has the same columns as the training data
        expected_cols = model.feature_names_in_
        for col in expected_cols:
            if col not in df.columns:
                df[col] = 0

        df = df[expected_cols]

        # Make the prediction
        prediction = model.predict(df)

        # Return the prediction as JSON
        return str(prediction[0])

    except Exception as e:
        return str(e), 500
