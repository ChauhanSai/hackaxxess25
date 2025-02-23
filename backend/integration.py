from flask import Flask, jsonify, request
import imageProcessorOllama
import awsStack

app = Flask(__name__)

from flask_cors import CORS
CORS(app)  # Enable CORS for all routes

@app.route('/api/process-image', methods=['GET'])
def processImage():
    try:
        filename = request.args.get('image') # Get the argument from the URL query string
        username = request.args.get('username')
    except:
        filename = "anna-pelzer-IGfIGP5ONV0-unsplash.jpg" # hard-coded failsafe for debug
        username = "admin"
    if filename is None:
        filename = "anna-pelzer-IGfIGP5ONV0-unsplash.jpg" # hard-coded failsafe for debug
        username = "admin"
    print(filename)
    print("User:", username)

    # Run processing
    data = imageProcessorOllama.process_image(filename)

    awsStack.forkastData(username, filename, data)

    print("Flask API is returning", data)
    return jsonify(data)

@app.route('/api/register-user', methods=['GET'])
def registerUser():
    try:
        user = request.args.get('user') # Get the argument from the URL query string
    except:
        user = "" # hard-coded failsafe for debug
    if user is None:
        user = "" # hard-coded failsafe for debug
    print(user)
    print("User:", user)

    # Run processing
    data = awsStack.userData(user)

    print("Flask API is returning", data)
    return jsonify(data)

if __name__ == '__main__':
    # processImage()
    app.run(debug=True)
