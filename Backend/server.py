from flask import Flask

app = Flask(__name__)

@app.route('/')
def index():
    print("Working")
    return "Working"

if __name__ == "__main__":
    app.run(port=1010)