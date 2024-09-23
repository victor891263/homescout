from flask import Flask, request
from flask_cors import CORS
import joblib
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
import psycopg2
import os
from geopy.geocoders import Nominatim
from geopy.exc import GeocoderTimedOut

app = Flask(__name__)
CORS(app)

# Function to get latitude and longitude from Postcodes.io
def get_lat_long(address):
    try:
        geolocator = Nominatim(user_agent="homescout")
        location = geolocator.geocode(address)
        if location:
            return location.latitude, location.longitude
        else:
            return None, None
    except GeocoderTimedOut:
        return None, None

# Define a route for making predictions
@app.route('/', methods=['POST'])
def predict():
    try:
        model = joblib.load('model.pkl')

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


@app.route('/train', methods=['POST'])
def train_model():
    secret = request.args.get('secret')

    if (secret == os.getenv("SECRET")):
        try:
            # Retrieve data from database

            DB_URL = os.getenv("DB_URL")
            conn = psycopg2.connect(DB_URL)

            query = "SELECT price, address, bathrooms, bedrooms, floors, type, tenure FROM properties"
            df_db = pd.read_sql(query, conn)

            conn.close()

            # Create latitude and longitudes and rename columns

            df_db['latitude'], df_db['longitude'] = zip(*df_db['address'].apply(get_lat_long))
            df_db = df_db.drop('address', axis=1)
            df_db = df_db.rename(columns={'bathrooms': 'num_bathrooms', 'bedrooms': 'num_bedrooms', 'floors': 'num_floors',
                                          'type': 'property_type'})

            # Load the data from local csv

            df_local = pd.read_csv('data.csv')

            # Combine two dataframes

            df = pd.concat([df_db, df_local], ignore_index=True)

            # Train the model

            df = pd.get_dummies(df, columns=['property_type'], prefix='property_type')
            df = df.replace({True: 1, False: 0})

            df = pd.get_dummies(df, columns=['tenure'], prefix='tenure')
            df = df.replace({True: 1, False: 0})

            x = df.drop(['price'], axis=1)
            y = df['price']

            x_train, x_test, y_train, y_test = train_test_split(x, y, test_size=0.2)

            model = RandomForestRegressor()
            model.fit(x_train, y_train)

            # Save the model, which replaces the old pkl with the new one

            joblib.dump(model, 'model.pkl')

            return 'New model successfully trained!'

        except Exception as e:
            print(e)
            return str(e), 500
    else:
        return "You don't have permission to do this", 500
