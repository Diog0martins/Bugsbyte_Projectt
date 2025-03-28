from flask import Flask, request
import json

app = Flask(__name__)

@app.route("/")
def hello_world():

    return {"prediction": 10}

if __name__ == "__main__":
    app.run()