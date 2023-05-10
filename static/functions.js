window.addEventListener('load', function () {
    var loader = document.getElementById('loader');
    loader.style.display = 'block'; // make the loader visible on page load
    setTimeout(function () {
        loader.style.display = 'none';
    }, 2500); // hide the loader after 3 seconds
});

//Validate Input
function validateInputs() {
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

    // Regular expression for whole numbers
    var pattern = /^\d+$/;

    if (height === "" || weight === "" || foot === "" || pace === "" || shooting === "" ||
        passing === "" || dribbling === "" || defending === "" || mentality_aggression === "" ||
        mentality_positioning === "" || mentality_composure === "" || mentality_vision === "") {

        alert("Please fill in all the fields.");
        return false;
    } else if (!pattern.test(height) || height < 150 || height > 200) {
        alert("Please enter a valid height between 150 and 200.");
        return false;
    } else if (!pattern.test(weight) || weight < 25 || weight > 90) {
        alert("Please enter a valid weight between 25 and 90.");
        return false;
    }
    else if (!pattern.test(pace) || pace < 1 || pace > 100 || !pattern.test(shooting) || shooting < 1 ||
        shooting > 100 || !pattern.test(passing) || passing < 1 || passing > 100 || !pattern.test(dribbling) ||
        dribbling < 1 || dribbling > 100 || !pattern.test(defending) || defending < 1 || defending > 100 ||
        !pattern.test(mentality_aggression) || mentality_aggression < 1 || mentality_aggression > 100 ||
        !pattern.test(mentality_positioning) || mentality_positioning < 1 || mentality_positioning > 100 ||
        !pattern.test(mentality_composure) || mentality_composure < 1 || mentality_composure > 100 ||
        !pattern.test(mentality_vision) || mentality_vision < 1 || mentality_vision > 100) {

        alert("Please enter valid ratings between 1 and 100.\nPlease note that technical skills are rated on a scale of 1 to 100");

        return false;
    }

    return true;
}


function predictPosition() {

    // Validate the inputs
    if (!validateInputs()) {
        return;
    }

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
        "preferred_foot": parseFloat(foot),
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

    console.log("foot:" + inputData.preferred_foot)

    const url = 'http://127.0.0.1:5000/predict'
    // Send a POST request (input data) to the Flask server for prediction
    fetch(url, {
        method: "POST",
        body: JSON.stringify(inputData),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(response => response.json())
        .then(data => {
            // Display the predicted position
            var predictedPosition = data.predicted_position;
            console.log(predictedPosition)
            // document.getElementById("predicted_position").textContent = predictedPosition;
            // Get the predicted position abbreviation from the model
            const predictedPositionOutput = positionMap[predictedPosition];
            // Display the predicted position in the HTML output
            document.getElementById("predicted_position").innerHTML = predictedPositionOutput;

        })
        .catch(error => console.error(error));

}

// var values = height + "," + weight + "," + foot + "," + pace + "," + shooting + "," 
// + passing + "," + dribbling +","+ defending + "," + mentality_aggression + "," 
// + mentality_positioning + "," + mentality_composure + "," + mentality_vision;

// console.log("test values:"+values);

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


// function to save form data in local storage
// add event listeners to input fields to save data when they change
document.getElementById("height").addEventListener("change", saveFormData);
document.getElementById("weight").addEventListener("change", saveFormData);
document.getElementById("preferred_foot").addEventListener("change", saveFormData);
document.getElementById("pace").addEventListener("change", saveFormData);
document.getElementById("shooting").addEventListener("change", saveFormData);
document.getElementById("passing").addEventListener("change", saveFormData);
document.getElementById("dribbling").addEventListener("change", saveFormData);
document.getElementById("defending").addEventListener("change", saveFormData);
document.getElementById("mentality_aggression").addEventListener("change", saveFormData);
document.getElementById("mentality_positioning").addEventListener("change", saveFormData);
document.getElementById("mentality_composure").addEventListener("change", saveFormData);
document.getElementById("mentality_vision").addEventListener("change", saveFormData);

// function to save form data
function saveFormData() {
    const formData = {
        height: document.getElementById("height").value,
        weight: document.getElementById("weight").value,
        preferred_foot: document.getElementById("preferred_foot").value,
        pace: document.getElementById("pace").value,
        shooting: document.getElementById("shooting").value,
        passing: document.getElementById("passing").value,
        dribbling: document.getElementById("dribbling").value,
        defending: document.getElementById("defending").value,
        mentality_aggression: document.getElementById("mentality_aggression").value,
        mentality_positioning: document.getElementById("mentality_positioning").value,
        mentality_composure: document.getElementById("mentality_composure").value,
        mentality_vision: document.getElementById("mentality_vision").value
    };

    // save form data to local storage
    localStorage.setItem("formData", JSON.stringify(formData));
}


// function to load form data from local storage
function loadFormData() {
    const formData = JSON.parse(localStorage.getItem("formData"));
    if (formData) {
        document.getElementById("height").value = formData.height;
        document.getElementById("weight").value = formData.weight;
        document.getElementById("preferred_foot").value = formData.preferred_foot;
        document.getElementById("pace").value = formData.pace;
        document.getElementById("shooting").value = formData.shooting;
        document.getElementById("passing").value = formData.passing;
        document.getElementById("dribbling").value = formData.dribbling;
        document.getElementById("defending").value = formData.defending;
        document.getElementById("mentality_aggression").value = formData.mentality_aggression;
        document.getElementById("mentality_positioning").value = formData.mentality_positioning;
        document.getElementById("mentality_composure").value = formData.mentality_composure;
        document.getElementById("mentality_vision").value = formData.mentality_vision;
    }
}

// load form data when the page is loaded
window.addEventListener("load", loadFormData);

function loadFormData() {
    // check if form data exists in local storage
    if (localStorage.getItem("formData")) {
        // parse the JSON data from local storage
        const formData = JSON.parse(localStorage.getItem("formData"));

        // populate the form fields with the saved data
        document.getElementById("height").value = formData.height;
        document.getElementById("weight").value = formData.weight;
        document.getElementById("preferred_foot").value = formData.preferred_foot;
        document.getElementById("pace").value = formData.pace;
        document.getElementById("shooting").value = formData.shooting;
        document.getElementById("passing").value = formData.passing;
        document.getElementById("dribbling").value = formData.dribbling;
        document.getElementById("defending").value = formData.defending;
        document.getElementById("mentality_aggression").value = formData.mentality_aggression;
        document.getElementById("mentality_positioning").value = formData.mentality_positioning;
        document.getElementById("mentality_composure").value = formData.mentality_composure;
        document.getElementById("mentality_vision").value = formData.mentality_vision;
    }
}



// JSON object that maps abbreviations to full forms
const positionMap = {
    "ST": "Striker",
    "LW": "Left Winger",
    "LF": "Left Forward",
    "CF": "Center Forward",
    "RF": "Right Forward",
    "RW": "Right Winger",
    "CAM": "Central Attacking Midfielder",
    "LM": "Left Midfielder",
    "CM": "Central Midfielder",
    "RM": "Right Midfielder",
    "CDM": "Central Defensive Midfielder",
    "LWB": "Left Wing Back",
    "LB": "Left Back",
    "CB": "Center Back",
    "RB": "Right Back",
    "RWB": "Right Wing Back"
};
