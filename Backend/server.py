from flask import Flask, json, request
from flask_cors import CORS
import os
import subprocess

app = Flask(__name__)

CORS(app)

@app.route('/', methods=["POST"])
def index():
    data = request.json
    code = data['code']

    file_path = os.path.join(os.getcwd(), "temp_code.py")
    
    with open(file_path, 'w') as file:
        file.write(code)
    
    output = subprocess.run(["python", file_path], capture_output=True, text=True)
    if output.stdout == '':
        return output.stderr
    else:
        return output.stdout

@app.route('/dialogues')
def dialogues():
    with open(os.getcwd() + '/Dialogues.json') as Dialogues:
        data = json.load(Dialogues)
        Introduction = data["Introduction"]
    return Introduction

if __name__ == "__main__":
    app.run(port=1010)
