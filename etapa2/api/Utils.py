import joblib
import re
import string
from sklearn.metrics import precision_score, recall_score, f1_score
from sklearn.model_selection import train_test_split, cross_val_score
import numpy as np

# Cargar el modelo entrenado
model = joblib.load('./modelo_nb.joblib')

# Cargar el vectorizador
tfidf_vectorizer = joblib.load('./vectorizer_tfidf.joblib')

def clean_text(text):
    text = text.lower()
    text = re.sub(f"[{string.punctuation}]", "", text)
    text = re.sub(r'\d+', '', text)
    text = re.sub(r'\s+', ' ', text).strip()
    return text

def fix_special_characters(text):
    replacements = {
        'ãº': 'ú', 'ã±': 'n', 'ã¡': 'á', 'ã©': 'é', 'ã­': 'í', 'ã³': 'ó',
        'ã¼': 'ü', 'ãä': 'ä', 'ã«': 'ë', 'ã¯': 'ï', 'ã´': 'ó', 'ã§': 'ç', 'ã“': 'Ó'
    }
    for key, value in replacements.items():
        text = text.replace(key, value)
    return text

def preprocess_text(texts):
    cleaned_texts = [clean_text(text) for text in texts]
    fixed_texts = [fix_special_characters(text) for text in cleaned_texts]
    return fixed_texts

# Función para hacer la predicción usando el modelo cargado
def predict_proba(texts):
    cleaned_texts = preprocess_text(texts)
    
    X_tfidf = tfidf_vectorizer.transform(cleaned_texts).toarray()  
   
    predictions = model.predict(X_tfidf)
    probabilities = model.predict_proba(X_tfidf)
    
    return predictions, probabilities

def retrain_model(texts, labels):
    cleaned_texts = preprocess_text(texts)
    
    X_train, X_test, y_train, y_test = train_test_split(cleaned_texts, labels, test_size=0.2, random_state=42)
    
    X_train_tfidf = tfidf_vectorizer.transform(X_train)
    X_test_tfidf = tfidf_vectorizer.transform(X_test)

    model.partial_fit(X_train_tfidf, y_train, classes=np.unique(labels))

    y_pred = model.predict(X_test_tfidf)
    
    precision = precision_score(y_test, y_pred, average='weighted')
    recall = recall_score(y_test, y_pred, average='weighted')
    f1 = f1_score(y_test, y_pred, average='weighted')
    
    joblib.dump(model, 'modelo_nb.joblib')
    
    return precision, recall, f1