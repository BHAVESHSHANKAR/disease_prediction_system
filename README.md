# Disease Prediction System

A modern web application that predicts diseases based on symptoms using machine learning. The system features a user-friendly interface with an interactive symptom selection system and detailed disease information output.

## System Requirements

### Backend Requirements

1. **Python Requirements**
   - Python 3.8 or higher
   - Required Python packages (install using `pip install -r requirements.txt`):
     - Flask==2.0.1
     - Flask-CORS==3.0.10
     - pandas==1.3.0
     - scikit-learn==0.24.2
     - numpy==1.21.0

2. **Dataset Files**
   The following CSV files are required in the `backend/datasets` directory:
   - `hc training dataset (1).csv` - Main training dataset
   - `healthcare severity dataset (1).csv` - Disease severity information
   - `healthcare description dataset (1).csv` - Disease descriptions
   - `healthcare precautions_1 (1).csv` - Disease precautions

### Frontend Requirements

1. **Node.js Requirements**
   - Node.js 14.0 or higher
   - npm 6.0 or higher

2. **Required npm packages**
   ```json
   {
     "dependencies": {
       "react": "^18.2.0",
       "react-dom": "^18.2.0"
     },
     "devDependencies": {
       "@types/react": "^18.2.15",
       "@types/react-dom": "^18.2.7",
       "@vitejs/plugin-react": "^4.0.3",
       "eslint": "^8.45.0",
       "vite": "^4.4.5"
     }
   }
   ```

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd disease_prediction_system/backend
   ```

2. Create and activate a virtual environment (recommended):
   ```bash
   # Windows
   python -m venv venv
   .\venv\Scripts\activate

   # Linux/Mac
   python3 -m venv venv
   source venv/bin/activate
   ```

3. Install required packages:
   ```bash
   pip install -r requirements.txt
   ```

4. Start the Flask server:
   ```bash
   python app.py
   ```
   The server will run on `http://127.0.0.1:5000`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd disease_prediction_system/frontend/disease-prediction-chatbot
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`

## Features

### 1. Interactive Disease Prediction
- Real-time symptom input and validation
- Click-to-add symptoms from common disease categories
- Support for multiple symptoms input

### 2. User Interface
- Modern, responsive design
- Side-by-side layout for easy symptom selection
- Clear input instructions and feedback
- Loading states and error handling
- Mobile-friendly interface

### 3. Disease Information Display
- Predicted disease name
- Detailed disease description
- Severity level indication
- Recommended precautions
- Color-coded severity indicators

### 4. Symptom Management
- Easy symptom input with underscores
- Clickable symptom suggestions
- Input validation and error messages
- Clear input option

### 5. API Features
- RESTful API endpoints
- CORS support for cross-origin requests
- Robust error handling
- Machine learning-based prediction

## API Endpoints

### 1. Predict Disease
- **Endpoint**: `/predict`
- **Method**: POST
- **Input**:
  ```json
  {
    "symptoms": ["symptom1", "symptom2"],
    "days": 1
  }
  ```
- **Response**:
  ```json
  {
    "disease": "Disease Name",
    "description": "Disease Description",
    "precautions": ["Precaution 1", "Precaution 2"],
    "severity": "High/Medium/Low"
  }
  ```

## Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Android Chrome)

## Known Limitations

1. The system requires an active internet connection
2. Predictions are based on the training dataset and may not cover all possible diseases
3. The system is not a substitute for professional medical advice
4. Symptom input must match the exact format in the training data

## Future Enhancements

1. Add user authentication and history tracking
2. Implement multi-language support
3. Add more detailed medical information and references
4. Integrate with medical databases for expanded disease coverage
5. Add symptom severity input options
6. Implement progressive web app (PWA) features

## Security Considerations

1. Input validation on both frontend and backend
2. CORS policy implementation
3. Rate limiting for API endpoints
4. Sanitized data display
5. No storage of sensitive medical information

## Support

For issues and feature requests, please create an issue in the repository or contact the development team.
