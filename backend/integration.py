from flask import Flask, jsonify, request
import imageProcessorOllama

def encryptInfo(dictionary):
    # Encrypt the dictionary
    return dictionary

app = Flask(__name__)

from flask_cors import CORS
CORS(app)  # Enable CORS for all routes

@app.route('/api/process-image', methods=['GET'])
def processImage():
    try:
        filename = request.args.get('image')  # Get the argument from the URL query string
    except:
        filename = "anna-pelzer-IGfIGP5ONV0-unsplash.jpg"  # hard-coded failsafe for debug
    if filename is None:
        filename = "anna-pelzer-IGfIGP5ONV0-unsplash.jpg"  # hard-coded failsafe for debug
    print(filename)

    # Run processing
    data = imageProcessorOllama.process_image(filename)
    print("Flask API is returning", data)
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)
