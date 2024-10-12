
# Proyecto 1

### Desarrollado por:
- Miguel Angel Ariza Jimenez
- Julian Escobar Rivera
- Juan David Obando Novoa

### Descripción
Este proyecto fue realizado para la materia 'ISIS3301 Inteligencia de Negocios' del programa Ingeniería de Sistemas y Computación de la Universidad de los Andes.

## Instrucciones para ejecutar el proyecto

### Backend (API)

1. **Navegar a la carpeta `api`:**

   Abre una terminal y ubícate en la carpeta `api` del proyecto.

   ```bash
   cd etapa2/api
   ```

2. **Crear un entorno virtual:**

   Crea un entorno virtual usando `venv`.

   ```bash
   python -m venv .venv
   ```

3. **Activar el entorno virtual:**

   - **En Windows:**

     ```bash
     .venv\Scripts\activate
     ```

   - **En macOS/Linux:**

     ```bash
     source .venv/bin/activate
     ```

4. **Instalar las dependencias:**

   Con el entorno virtual activado, instala los paquetes necesarios desde el archivo `requirements.txt`.

   ```bash
   pip install -r requirements.txt
   ```

5. **Ejecutar el servidor:**

   Inicia el servidor utilizando `uvicorn`.

   ```bash
   uvicorn main:app --reload
   ```

   El servidor estará disponible en `http://localhost:8000`.

---

### Frontend (Web)

1. **Navegar a la carpeta `web`:**

   En otra terminal, ve a la carpeta `etapa2/web`.

   ```bash
   cd web
   ```

2. **Instalar dependencias:**

   Ejecuta el siguiente comando para instalar las dependencias de Node.js.

   ```bash
   npm install
   ```

3. **Iniciar la aplicación web:**

   Una vez instaladas las dependencias, ejecuta la aplicación.

   ```bash
   npm start
   ```

   La aplicación web estará disponible en `http://localhost:3000`.

---

### Notas

- La API fue realizada utilizando FastAPI y el frontend con React.
- Asegúrate de tener Python y Node.js instalados en tu sistema.