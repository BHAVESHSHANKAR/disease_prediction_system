from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
from sklearn import preprocessing
from sklearn.svm import SVC
from sklearn.tree import DecisionTreeClassifier
import csv
import traceback

app = Flask(__name__)
CORS(app)  # Enable CORS for cross-origin requests

# Load training dataset
try:
    training = pd.read_csv(r'C:\Users\BHAVESH K\OneDrive\Desktop\csp\backend\datasets\hc training dataset (1).csv')
    symptoms = training.columns[:-1]  # All columns except the last one
except Exception as e:
    print("Error loading training dataset:", e)
    symptoms = []

# Train machine learning models
try:
    x = training[symptoms]
    y = training['prognosis']
    le = preprocessing.LabelEncoder()
    le.fit(y)
    y = le.transform(y)

    # Train classifiers
    clf = DecisionTreeClassifier().fit(x, y)
    model = SVC().fit(x, y)  # Use Support Vector Classifier as default
except Exception as e:
    print("Error training model:", e)

# Load supplementary datasets
severity_dict = {}
description_dict = {}
precaution_dict = {}

try:
    # Load severity data
    with open(r'C:\Users\BHAVESH K\OneDrive\Desktop\csp\backend\datasets\healthcare severity dataset (1).csv') as file:
        csv_reader = csv.reader(file)
        for row in csv_reader:
            severity_dict[row[0]] = int(row[1])

    # Load descriptions
    with open(r'C:\Users\BHAVESH K\OneDrive\Desktop\csp\backend\datasets\healthcare description dataset (1).csv') as file:
        csv_reader = csv.reader(file)
        for row in csv_reader:
            description_dict[row[0]] = row[1]

    # Load precautions
    with open(r'C:\Users\BHAVESH K\OneDrive\Desktop\csp\backend\datasets\healthcare precautions_1 (1).csv') as file:
        csv_reader = csv.reader(file)
        for row in csv_reader:
            precaution_dict[row[0]] = row[1:]
except Exception as e:
    print("Error loading supplementary datasets:", e)

# API to predict disease
@app.route('/predict', methods=['POST'])
def predict_disease():
    try:
        # Parse input data
        data = request.get_json()
        symptoms_present = data.get('symptoms', [])
        days = data.get('days', 1)

        # Validate symptoms
        symptoms_input = [symptom for symptom in symptoms_present if symptom in symptoms]
        if not symptoms_input:
            return jsonify({'error': "Invalid symptoms entered. Please enter known symptoms."}), 400

        # Create input vector for the model
        x_input = [1 if symptom in symptoms_input else 0 for symptom in symptoms]
        prediction = model.predict([x_input])

        # Decode prediction
        disease = le.inverse_transform(prediction)[0]
        description = description_dict.get(disease, "No description available")
        precautions = precaution_dict.get(disease, ["No precautions available"])
        severity = severity_dict.get(disease, "No severity info")

        # Respond with prediction details
        return jsonify({
            'disease': disease,
            'description': description,
            'precautions': precautions,
            'severity': severity
            
        })
    
    except Exception as e:
        print("Error during prediction:", e)
        print(traceback.format_exc())
        return jsonify({'error': "An error occurred during prediction. Please try again."}), 500


# Run Flask app
if __name__ == '__main__':
    app.run(debug=True)
    
