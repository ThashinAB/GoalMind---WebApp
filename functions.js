window.addEventListener('load', function () {
    var loadingScreen = document.getElementById('loading-screen');
    loadingScreen.style.display = 'none';
});

function predictPosition() {
    // Get the input values
    var height = document.getElementById("height").value;
    var weight = document.getElementById("weight").value;
    var foot = document.getElementById("preferred_foot").value;
    var pace = document.getElementById("pace").value;
    var shooting = document.getElementById("shooting").value;
    var passing = document.getElementById("passing").value;
    var dribbling = document.getElementById("dribbling").value;
    var defending = document.getElementById("defending").value;
    var mentality_aggression = document.getElementById("mentality_aggression").value;
    var mentality_positioning = document.getElementById("mentality_positioning").value;
    var mentality_composure = document.getElementById("mentality_composure").value;
    var mentality_vision = document.getElementById("mentality_vision").value;


    // Create the input data object
    var inputData = {
        "height_cm": parseFloat(height),
        "weight_kg": parseFloat(weight),
        "preferred_foot": foot,
        "pace": parseFloat(pace),
        "shooting": parseFloat(shooting),
        "passing": parseFloat(passing),
        "dribbling": parseFloat(dribbling),
        "defending": parseFloat(defending),
        "mentality_aggression": parseFloat(mentality_aggression),
        "mentality_positioning": parseFloat(mentality_positioning),
        "mentality_composure": parseFloat(mentality_composure),
        "mentality_vision": parseFloat(mentality_vision)
    };

    // Send the input data to the Flask app for prediction
    fetch("/predict_position", {
        method: "POST",
        body: JSON.stringify(inputData),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (result) {
            // Update the predicted position on the webpage
            var predictedPosition = document.getElementById("predicted-position");
            predictedPosition.innerHTML = "Predicted Position: " + result.prediction;
        })
        .catch(function (error) {
            console.log(error);
        });
}

function clearFields() {
    // Clear all the input fields
    document.getElementById("height").value = "";
    document.getElementById("weight").value = "";
    document.getElementById("preferred_foot").value = "";
    document.getElementById("pace").value = "";
    document.getElementById("shooting").value = "";
    document.getElementById("passing").value = "";
    document.getElementById("dribbling").value = "";
    document.getElementById("defending").value = "";
    document.getElementById("mentality_aggression").value = "";
    document.getElementById("mentality_positioning").value = "";
    document.getElementById("mentality_composure").value = "";
    document.getElementById("mentality_vision").value = "";

    // Clear the predicted position
    var predictedPosition = document.getElementById("predicted-position");
    predictedPosition.innerHTML = "";
}