from flask import Flask, request, jsonify, render_template
import joblib as jl
import numpy as np
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

model = jl.load("model_nn(0.84).pkl")
le = jl.load("label_encoder.joblib")


# @app.route("/")
# def index():
#     return render_template("index.html")

@app.route('/')
def home():
    return 'Welcome to GoalMind'


@app.route("/predict", methods=["POST"])
def predict():
    # Get the data from the request
    print("Predict function Called")
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
    data = np.array([[height, weight, foot, pace, shooting, passing, dribbling, defending, aggression, positioning,
                      composure, vision]])

    # Make a prediction
    prediction = model.predict(data)
    predicted_position = le.inverse_transform(prediction)[0]

    # Return the prediction as a JSON response
    return jsonify({"predicted_position": predicted_position})


if __name__ == "__main__":
    app.run()
