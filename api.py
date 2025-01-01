#pip install fastapi python-multipart uvicorn para instalar fastapi
from fastapi import FastAPI, File, UploadFile, HTTPException
import tensorflow as tf
import uuid
import os
import uvicorn
from typing import Dict

app = FastAPI(title="Plant Disease Detection API")


# Global variables
MODEL = None
UPLOAD_DIR = "uploaded_images"
RESULTS_CACHE: Dict[str, dict] = {}


# Create upload directory if it doesn't exist
os.makedirs(UPLOAD_DIR, exist_ok=True)


def load_model():
  """Load the trained model from model.h5"""
  global MODEL
  if MODEL is None:
    MODEL = tf.keras.models.load_model('model.h5')


# Poner un preprocesado que hagamos para entrenar el modelo
def preprocess_image(file_path: str):
    return None


@app.on_event("startup")
async def startup_event():
  """Load model on startup"""
  load_model()


@app.post("/predict/")
async def predict_disease(file: UploadFile = File(...)):
    """Upload an image and get a prediction ID"""
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File must be an image")

    prediction_id = str(uuid.uuid4())
    file_path = os.path.join(UPLOAD_DIR, f"{prediction_id}.jpg")

    with open(file_path, "wb") as buffer:
        contents = await file.read()
        buffer.write(contents)

    try:
        processed_image = preprocess_image(file_path)
        prediction = MODEL.predict(processed_image)[0][0]

        result = {
            "prediction": "diseased" if prediction > 0.5 else "healthy",
            "confidence": float(prediction) if prediction > 0.5 else float(1 - prediction),
            "status": "completed"
        }
        RESULTS_CACHE[prediction_id] = result

        os.remove(file_path)
        return {"prediction_id": prediction_id, "message": "Image processed successfully"}

    except Exception as e:
        if os.path.exists(file_path):
            os.remove(file_path)
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/result/{prediction_id}")
async def get_result(prediction_id: str):
    """Get the prediction result using the prediction ID"""
    if prediction_id not in RESULTS_CACHE:
        raise HTTPException(status_code=404, detail="Prediction not found")

    return RESULTS_CACHE[prediction_id]


@app.delete("/result/{prediction_id}")
async def delete_result(prediction_id: str):
    """Delete a prediction result from the cache"""
    if prediction_id in RESULTS_CACHE:
        del RESULTS_CACHE[prediction_id]
        return {"message": "Result deleted successfully"}
    raise HTTPException(status_code=404, detail="Prediction not found")


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)