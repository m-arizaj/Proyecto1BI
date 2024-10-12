import React, { useState } from 'react';
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  ListGroup,
  Alert,
} from 'react-bootstrap';
import axios from 'axios';
import * as XLSX from 'xlsx';

const OpinionAnalysisPage = () => {
  const [textInput, setTextInput] = useState('');
  const [opinions, setOpinions] = useState([]);
  const [file, setFile] = useState(null);
  const [columnName, setColumnName] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  // Función para agregar la opinión ingresada al listado
  const addOpinion = () => {
    if (textInput.trim() !== '') {
      setOpinions([...opinions, textInput]);
      setTextInput(''); // Limpiar el input después de agregar
    }
  };

  // Función para manejar el archivo subido
  const handleFileUpload = (event) => {
    setFile(event.target.files[0]);
  };

  // Función para consumir la API con opiniones manuales
  const predictManualOpinions = async () => {
    try {
      const response = await axios.post('http://localhost:8000/predict/', { texts: opinions });
      setResults(response.data);
      setError(null);
    } catch (error) {
      setError('Error al realizar la predicción');
      console.error(error);
    }
  };

  // Función para procesar el archivo y consumir la API
  const predictFromFile = () => {
    if (!file || !columnName) {
      setError('Sube un archivo e ingresa el nombre de la columna.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const binaryStr = event.target.result;
      const workbook = XLSX.read(binaryStr, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(sheet);

      // Extraer la columna de textos
      const texts = data.map((row) => row[columnName]);

      if (texts.length > 0) {
        // Hacer la petición a la API
        axios
          .post('http://localhost:8000/predict/', { texts })
          .then((response) => {
            setResults(response.data);
            setError(null);
          })
          .catch((error) => {
            setError('Error al realizar la predicción');
            console.error(error);
          });
      }
    };

    reader.readAsBinaryString(file);
  };

  return (
    <Container className="py-5">
      <h1 className="mb-4">Análisis de Opiniones y ODS</h1>

      {/* Sección de Agregar Opiniones Manualmente */}
      <Row className="mb-5">
        <Col md={6}>
          <h4>Agregar Opinión</h4>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Escribe tu opinión..."
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
            />
          </Form.Group>
          <Button className="mt-2" onClick={addOpinion}>
            Agregar Opinión
          </Button>
        </Col>

        <Col md={6}>
          <h4>Listado de Opiniones</h4>
          <ListGroup>
            {opinions.map((opinion, index) => (
              <ListGroup.Item key={index}>{opinion}</ListGroup.Item>
            ))}
          </ListGroup>
          {opinions.length > 0 && (
            <Button className="mt-3" onClick={predictManualOpinions}>
              Predecir Opiniones
            </Button>
          )}
        </Col>
      </Row>

      {/* Sección de Subir Archivo */}
      <Row className="mb-5">
        <Col md={6}>
          <h4>Subir Archivo (Excel/CSV)</h4>
          <Form.Group>
            <Form.Control type="file" onChange={handleFileUpload} />
          </Form.Group>
          <Form.Group className="mt-3">
            <Form.Control
              type="text"
              placeholder="Nombre de la columna con los textos"
              value={columnName}
              onChange={(e) => setColumnName(e.target.value)}
            />
          </Form.Group>
          <Button className="mt-3" onClick={predictFromFile}>
            Predecir desde Archivo
          </Button>
        </Col>
      </Row>

      {/* Mostrar Resultados */}
      {error && <Alert variant="danger">{error}</Alert>}
      {results.predictions && (
        <Row>
          <Col>
            <h4>Resultados de la Predicción</h4>
            <ListGroup>
              {results.predictions.map((prediction, index) => (
                <ListGroup.Item key={index}>
                  Opinión {index + 1}: ODS {prediction} (Probabilidades: {results.probabilities[index].join(', ')})
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default OpinionAnalysisPage;
