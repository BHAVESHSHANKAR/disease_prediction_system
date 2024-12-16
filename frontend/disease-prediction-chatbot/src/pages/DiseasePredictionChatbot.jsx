import React, { useState } from "react";
import "../styles/DiseasePredictionChatbot.css"
function DiseasePredictionChatbot() {
    const [symptomsInput, setSymptomsInput] = useState("");
    const [predictionResult, setPredictionResult] = useState(null);

    const predictDisease = async () => {
        const symptoms = symptomsInput.split(",").map((s) => s.trim());
        const requestData = { symptoms, days: 1 };

        try {
            const response = await fetch("http://127.0.0.1:5000/predict", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(requestData),
            });

            if (!response.ok) throw new Error("Network response was not ok");

            const result = await response.json();
            setPredictionResult(result);
        } catch (error) {
            console.error("Error:", error);
            alert(
                "Enter a valid symptom which you have or there might be a network issue."
            );
        }
    };

    return (
        <>
        <h1>Disease Prediction System</h1><div className="symptoms-list">
            <h3>Common Symptoms and Related Diseases</h3>
            <ul className="disease-symptoms-container">
                <li>
                    <strong>Cold/Flu:</strong> Sneezing, Sore Throat, Watering Eyes, Headache,
                    Fatigue, Cough, High Fever, Chills.
                </li>
                <li>
                    <strong>Allergic Reactions:</strong> Sneezing, Watering Eyes, Itching, Skin
                    Rash, Fatigue.
                </li>
                <li>
                    <strong>Gastrointestinal Issues:</strong> Loss of Appetite, Stomach Pain,
                    Vomiting, Abdominal Pain, Diarrhea, Constipation, Blood in Stool.
                </li>
                <li>
                    <strong>Urinary Tract Infections (UTI):</strong> Burning Micturition,
                    Burning Urination, Smelly Urine, Dark Pee.
                </li>
                <li>
                    <strong>Malaria/Dengue:</strong> Shivering, Chills, High Fever, Night Sweats,
                    Fatigue, Joint Pain, Muscle Pain.
                </li>
                <li>
                    <strong>Diabetes:</strong> Often Thirsty, Often Urinating, Weight Loss.
                </li>
                <li>
                    <strong>Jaundice:</strong> Yellow Skin, Dark Pee, Fatigue, Abdominal Pain.
                </li>
                <li>
                    <strong>Heart Disease:</strong> Chest Pain, Difficulty Breathing, Fatigue,
                    Tired and Weak.
                </li>
                <li>
                    <strong>Hypertension:</strong> Headache, Nose Bleeds, Blurred Vision,
                    Fatigue.
                </li>
                <li>
                    <strong>Skin Conditions (Acne):</strong> Whiteheads, Blackheads, Puss Bumps,
                    Itching.
                </li>
                <li>
                    <strong>Respiratory Issues:</strong> Cough, Chest Pain, Difficulty Breathing,
                    Yellow Mucus.
                </li>
                <li>
                    <strong>General Infections:</strong> Low Fever, Muscle Pain, Fatigue,
                    Night Sweats.
                </li>
            </ul>
        </div><div className="disease-prediction-system">
                

                <div className="symptom-input-container">
                    <h3>Enter Symptoms with small letters and buy adding _ between and Enter two or more Symptoms by ,</h3>
                    <input
                        type="text"
                        value={symptomsInput}
                        onChange={(e) => setSymptomsInput(e.target.value)}
                        placeholder="Enter symptoms separated by commas" />
                    <button onClick={predictDisease} className="predict-button">
                        Predict
                    </button>
                </div>



                {predictionResult && (
                    <div className="prediction-result-container">
                        <h2>Prediction Result</h2>
                        <p>
                            <strong>Disease:</strong> {predictionResult.disease || "Not available"}
                        </p>
                        <p>
                            <strong>Description:</strong>{" "}
                            {predictionResult.description || "Not available"}
                        </p>
                        <p>
                            <strong>Precautions:</strong>{" "}
                            {predictionResult.precautions
                                ? predictionResult.precautions.join(", ")
                                : "Not available"}
                        </p>
                        <p>
                            <strong>Severity:</strong>{" "}
                            {predictionResult.severity || "Not available"}
                        </p>
                    </div>
                )}
            </div></>
    );
}

export default DiseasePredictionChatbot;