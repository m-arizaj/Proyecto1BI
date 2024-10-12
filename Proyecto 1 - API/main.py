from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
import joblib
import logging
from Utils import preprocess_text, predict_proba, retrain_model  
from DataModel import PredictionInput, RetrainInput

# Configurar los logs
logging.basicConfig(filename='model_logs.log', level=logging.INFO,
                    format='%(asctime)s - %(levelname)s - %(message)s')

app = FastAPI()

@app.post("/predict/")
async def predict(input_data: PredictionInput):
    logging.info(f"Datos recibidos para prediccion: {input_data.texts}")
    try:
        # Usar preprocess_text para limpiar los textos antes de la predicción
        cleaned_texts = preprocess_text(input_data.texts)
        
        predictions, probabilities = predict_proba(cleaned_texts)  # Pasar los textos ya procesados
        logging.info(f"Predicciones: {predictions}, Probabilidades: {probabilities}")
        return {
            "predictions": predictions.tolist(),
            "probabilities": probabilities.tolist()
        }
    except Exception as e:
        logging.error(f"Error en predicción: {str(e)}")
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/retrain/")
async def retrain(input_data: RetrainInput):
    logging.info(f"Datos recibidos para reentrenamiento: {input_data.texts}, Labels: {input_data.labels}")
    try:
        # Usar preprocess_text para limpiar los textos antes del reentrenamiento
        cleaned_texts = preprocess_text(input_data.texts)
        
        precision, recall, f1, f1_score_mean = retrain_model(cleaned_texts, input_data.labels)  # Pasar los textos ya procesados
        logging.info(f"Metricas tras reentrenamiento - Precision: {precision}, Recall: {recall}, F1: {f1}")
        return {
            "precision": precision,
            "recall": recall,
            "f1_score": f1,
            "f1_score_mean": f1_score_mean
        }
    except Exception as e:
        logging.error(f"Error en reentrenamiento: {str(e)}")
        raise HTTPException(status_code=400, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
