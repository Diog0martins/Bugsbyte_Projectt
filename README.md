# Bugsbyte_Project

## Setting Up a Virtual Environment (venv)

To ensure a clean and isolated Python environment for the project, you can use `venv`. Follow these steps:

1. **Create a Virtual Environment**:
    ```bash
    python3 -m venv venv
    ```
    This will create a directory named `venv` in your project folder.

2. **Activate the Virtual Environment**:
    - On **Linux/macOS**:
      ```bash
      source venv/bin/activate
      ```
    - On **Windows**:
      ```bash
      .\venv\Scripts\activate
      ```

3. **Install Dependencies**:
    Once the virtual environment is activated, install the required dependencies:
    ```bash
    pip install -r requirements.txt
    ```

4. **Deactivate the Virtual Environment**:
    When you're done working, deactivate the virtual environment by running:
    ```bash
    deactivate
    ```

Using `venv` ensures that dependencies for this project do not interfere with other Python projects on your system.

## Server Communication: Python and React

This project facilitates communication between a Python backend and a React frontend using JSON-formatted trade information. Here's an overview of how the interaction works:

1. **Python Backend (`server.py`)**:
    - The backend is responsible for processing trade data and serving it to the frontend.
    - It uses a web framework (e.g., Flask or FastAPI) to expose RESTful APIs.
    - Trade information is formatted as JSON and sent to the React frontend via HTTP responses.
    - To execute the backend server, run the following command:
      ```bash
      python3 server.py
      ```

2. **React Frontend**:
    - The frontend fetches trade data from the Python backend using HTTP requests (e.g., `fetch` or `axios`).
    - It parses the JSON response and dynamically updates the UI to display the trade information.

3. **Data Flow**:
    - **Python to React**: The backend sends JSON data to the frontend through API endpoints.
    - **React to Python**: The frontend can send user inputs or actions back to the backend via HTTP POST/PUT requests, also formatted as JSON.

This architecture ensures a seamless exchange of data between the backend and frontend, enabling real-time updates and user interactions.
