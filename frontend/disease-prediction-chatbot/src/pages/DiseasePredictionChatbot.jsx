import React, { useState } from "react";
import "../styles/DiseasePredictionChatbot.css"

function DiseasePredictionChatbot() {
    const [symptomsInput, setSymptomsInput] = useState("");
    const [predictionResult, setPredictionResult] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSymptomClick = (symptomText) => {
        // Extract symptoms from the text
        const symptoms = symptomText.split(",").map(s => s.trim().toLowerCase().replace(/ /g, '_'));
        
        // Add symptoms to input
        const currentSymptoms = symptomsInput
            ? symptomsInput.split(",").map(s => s.trim())
            : [];
        
        const newSymptoms = [...new Set([...currentSymptoms, ...symptoms])];
        setSymptomsInput(newSymptoms.join(", "));
        setError(null);
    };

    const predictDisease = async () => {
        if (!symptomsInput.trim()) {
            setError("Please enter at least one symptom");
            return;
        }

        setIsLoading(true);
        setError(null);
        const symptoms = symptomsInput.split(",").map((s) => s.trim()).filter(s => s);
        const requestData = { symptoms, days: 1 };

        try {
            const response = await fetch("https://dps-backend-a198.onrender.com/predict", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(requestData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "An error occurred during prediction");
            }

            setPredictionResult(data);
            setError(null);
        } catch (error) {
            console.error("Error:", error);
            setError(error.message || "An unexpected error occurred. Please try again.");
            setPredictionResult(null);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !isLoading) {
            predictDisease();
        }
    };

    const clearInput = () => {
        setSymptomsInput("");
        setError(null);
        setPredictionResult(null);
    };

    return (
        <div className="disease-prediction-system">
            <h1>Disease Prediction System</h1>
            
            <div className="main-content">
                <div className="symptoms-list">
                    <h3>Common Symptoms and Related Diseases</h3>
                    <p className="help-text">Click on any disease to add its symptoms to the input</p>
                    <ul className="disease-symptoms-container">
                        <li onClick={() => handleSymptomClick("sneezing, sore_throat, watering_eyes, headache, fatigue, cough, high_fever, chills")}>
                            <strong>Cold/Flu</strong>
                            Sneezing, Sore Throat, Watering Eyes, Headache,
                            Fatigue, Cough, High Fever, Chills
                        </li>
                        <li onClick={() => handleSymptomClick("sneezing, watering_eyes, itching, skin_rash, fatigue")}>
                            <strong>Allergic Reactions</strong>
                            Sneezing, Watering Eyes, Itching, Skin Rash, Fatigue
                        </li>
                        <li onClick={() => handleSymptomClick("loss_of_appetite, stomach_pain, vomiting, abdominal_pain, diarrhoea, constipation, blood_in_stool")}>
                            <strong>Gastrointestinal Issues</strong>
                            Loss of Appetite, Stomach Pain, Vomiting, Abdominal Pain,
                            Diarrhea, Constipation, Blood in Stool
                        </li>
                        <li onClick={() => handleSymptomClick("burning_micturition, burning_urination, smelly_urine, dark_urine")}>
                            <strong>Urinary Tract Infections (UTI)</strong>
                            Burning Micturition, Burning Urination, Smelly Urine, Dark Urine
                        </li>
                        <li onClick={() => handleSymptomClick("shivering, chills, high_fever, sweating, fatigue, joint_pain, muscle_pain")}>
                            <strong>Malaria/Dengue</strong>
                            Shivering, Chills, High Fever, Sweating, Fatigue,
                            Joint Pain, Muscle Pain
                        </li>
                        <li onClick={() => handleSymptomClick("excessive_thirst, frequent_urination, weight_loss")}>
                            <strong>Diabetes</strong>
                            Excessive Thirst, Frequent Urination, Weight Loss
                        </li>
                        <li onClick={() => handleSymptomClick("yellowing_of_skin, dark_urine, fatigue, abdominal_pain")}>
                            <strong>Jaundice</strong>
                            Yellowing of Skin, Dark Urine, Fatigue, Abdominal Pain
                        </li>
                        <li onClick={() => handleSymptomClick("chest_pain, breathlessness, fatigue, weakness")}>
                            <strong>Heart Disease</strong>
                            Chest Pain, Breathlessness, Fatigue, Weakness
                        </li>
                        <li onClick={() => handleSymptomClick("headache, nose_bleeding, blurred_vision, fatigue")}>
                            <strong>Hypertension</strong>
                            Headache, Nose Bleeding, Blurred Vision, Fatigue
                        </li>
                        <li onClick={() => handleSymptomClick("skin_rash, pus_filled_pimples, blackheads, scurring")}>
                            <strong>Skin Conditions</strong>
                            Skin Rash, Pus Filled Pimples, Blackheads, Scurring
                        </li>
                        <li onClick={() => handleSymptomClick("cough, chest_pain, breathlessness, yellow_sputum")}>
                            <strong>Respiratory Issues</strong>
                            Cough, Chest Pain, Breathlessness, Yellow Sputum
                        </li>
                        <li onClick={() => handleSymptomClick("mild_fever, muscle_pain, fatigue, sweating")}>
                            <strong>General Infections</strong>
                            Mild Fever, Muscle Pain, Fatigue, Sweating
                        </li>
                    </ul>
                </div>

                <div className="input-section">
                    <div className="symptom-input-container">
                        <div className="input-instructions">
                            <h4>How to Enter Symptoms:</h4>
                            <ul>
                                <li>Click on any disease from the left to add its symptoms</li>
                                <li>Or manually enter symptoms using lowercase letters</li>
                                <li>Separate words with underscores (e.g., "sore_throat")</li>
                                <li>Separate multiple symptoms with commas</li>
                            </ul>
                        </div>

                        <div className="input-wrapper">
                            <input
                                type="text"
                                value={symptomsInput}
                                onChange={(e) => {
                                    setSymptomsInput(e.target.value);
                                    setError(null);
                                }}
                                onKeyPress={handleKeyPress}
                                placeholder="Enter symptoms (e.g., sore_throat, fever, cough)"
                                disabled={isLoading}
                                className={error ? 'error' : ''}
                            />
                            {symptomsInput && (
                                <button onClick={clearInput} className="clear-button">
                                    ×
                                </button>
                            )}
                        </div>
                        
                        <button 
                            onClick={predictDisease} 
                            className="predict-button"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    Predicting...
                                    <span className="loading"></span>
                                </>
                            ) : (
                                'Predict Disease'
                            )}
                        </button>

                        {error && (
                            <div className="error-message">
                                {error}
                            </div>
                        )}
                    </div>

                    {predictionResult && (
                        <div className="prediction-result-container">
                            <h2>Prediction Result</h2>
                            <div className="result-grid">
                                <div className="result-item">
                                    <strong>Disease</strong>
                                    <span>{predictionResult.disease || "Not available"}</span>
                                </div>
                                <div className="result-item">
                                    <strong>Severity</strong>
                                    <span className={`severity-${predictionResult.severity?.toLowerCase()}`}>
                                        {predictionResult.severity || "Not available"}
                                    </span>
                                </div>
                                <div className="result-item description">
                                    <strong>Description</strong>
                                    <p>{predictionResult.description || "Not available"}</p>
                                </div>
                                <div className="result-item">
                                    <strong>Precautions</strong>
                                    {predictionResult.precautions ? (
                                        <ul className="precautions-list">
                                            {predictionResult.precautions.map((precaution, index) => (
                                                <li key={index}>{precaution}</li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <span>Not available</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default DiseasePredictionChatbot;