from pydantic import BaseModel
from typing import List

# Modelo de entrada para predicción
class PredictionInput(BaseModel):
    texts: List[str]

# Modelo de entrada para reentrenamiento
class RetrainInput(BaseModel):
    texts: List[str]
    labels: List[int]