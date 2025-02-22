from flask import Flask, jsonify, request

app = Flask(__name__)

from flask_cors import CORS
CORS(app)  # Enable CORS for all routes

@app.route('/api/process-image', methods=['GET'])
def processImage():
    try:
        blob = request.args.get('image')  # Get the argument from the URL query string
    except:
        blob = ""  # hard-coded
    print(blob)

    # Run processing
    run_prolog_script()
    data = process_bindings()
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)

