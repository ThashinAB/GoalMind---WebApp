from flask import Flask, render_template, request
import joblib as jl
import numpy as np
import sklearn

app = Flask(__name__)
model = jl.load("model_nn.pkl")
le = jl.load("label_encoder.joblib")

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/predict_position", methods=["GET", "POST"])
def predict_position():
    if request.method == "POST":
        # Get the data from the request
        data = request.get_json()

        # Extract the features from the data
        height = data["height_cm"]
        weight = data["weight_kg"]
        foot = data["preferred_foot"]
        pace = data["pace"]
        shooting = data["shooting"]
        passing = data["passing"]
        dribbling = data["dribbling"]
        defending = data["defending"]
        aggression = data["mentality_aggression"]
        positioning = data["mentality_positioning"]
        composure = data["mentality_composure"]
        vision = data["mentality_vision"]

        # Convert the data to a numpy array
        data = np.array([[height, weight, foot, pace, shooting, passing, dribbling, defending, aggression, positioning, composure, vision]])

        # Make a prediction
        prediction = model.predict(data)
        predicted_position = le.inverse_transform(prediction)[0]

        # Return the prediction as a JSON response
        return {"prediction": predicted_position}
    else:
        # Handle GET requests to the route
        return "This route accepts only POST requests"
