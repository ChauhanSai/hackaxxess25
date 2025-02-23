import cv2
import numpy as np
from sklearn.cluster import KMeans
from tensorflow.keras.applications.inception_v3 import InceptionV3, preprocess_input, decode_predictions
# from tensorflow.keras.applications.mobilenet_v2 import MobileNetV2, preprocess_input, decode_predictions
# from tensorflow.keras.applications.efficientnet import EfficientNetB0, preprocess_input, decode_predictions
from tensorflow.keras.preprocessing import image
from tensorflow.keras.applications.efficientnet import preprocess_input, decode_predictions
from ultralytics import YOLO
import mediapipe as mp

# Load the image
print("Loading image...")
image_bytes = open("image/anna-pelzer-IGfIGP5ONV0-unsplash.jpg", "rb").read()  # Replace with actual binary input
print("Image loaded successfully.")

# Convert image bytes to NumPy array
image_array = np.frombuffer(image_bytes, dtype=np.uint8)

# Decode the image from the NumPy array
print("Decoding image...")
image = cv2.imdecode(image_array, cv2.IMREAD_COLOR)
if image is None:
    raise ValueError("Error loading image. Check file path.")
print("Image decoded successfully.")

# Convert to grayscale and apply threshold
print("Converting image to grayscale...")
gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
_, thresh = cv2.threshold(gray, 127, 255, cv2.THRESH_BINARY)
print("Threshold applied.")

# Find contours
print("Finding contours...")
contours, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
print(f"Found {len(contours)} contours.")

# Draw bounding boxes around contours
for cnt in contours:
    area = cv2.contourArea(cnt)
    if area > 100:  # Ignore small noise
        x, y, w, h = cv2.boundingRect(cnt)
        cv2.rectangle(image, (x, y), (x + w, y + h), (0, 255, 0), 2)

print("Bounding boxes drawn around contours.")

# Reshape image for KMeans
pixels = image.reshape((-1, 3))
print("Reshaping image for KMeans...")

# KMeans clustering
print("Performing KMeans clustering...")
kmeans = KMeans(n_clusters=3, n_init=10)
kmeans.fit(pixels)
dominant_colors = kmeans.cluster_centers_
print("KMeans clustering completed. Dominant colors found.")

# Load InceptionV3 model
print("Loading InceptionV3 model...")
model = InceptionV3(weights="imagenet")
crop_size = 299 # Define the crop size

# Get image dimensions
height, width, _ = image.shape

# Iterate over the image with a sliding window
predictions = []
for y in range(0, height, crop_size):
    for x in range(0, width, crop_size):
        # Crop the image
        crop = image[y:y + crop_size, x:x + crop_size]

        # If the crop is smaller than the required size, pad it
        if crop.shape[0] < crop_size or crop.shape[1] < crop_size:
            crop = cv2.copyMakeBorder(crop, 0, crop_size - crop.shape[0], 0, crop_size - crop.shape[1],
                                      cv2.BORDER_CONSTANT, value=[0, 0, 0])

        # Preprocess the crop
        img_array = np.expand_dims(crop, axis=0)
        img_array = preprocess_input(img_array)

        # Make predictions
        preds = model.predict(img_array)
        decoded_preds = decode_predictions(preds, top=3)[0]
        predictions.extend(decoded_preds)

# Print aggregated predictions
print("Aggregated predictions:")
for pred in predictions:
    print(f"Class: {pred[1]}, Probability: {pred[2]:.4f}")

# Load YOLO model
print("Loading YOLO model...")
model = YOLO("yolov8n.pt")  # Pre-trained model
print("Performing object detection...")
results = model(image)

# Print bounding box coordinates
print("Detected bounding boxes:")
for r in results:
    print(r.boxes.xyxy)  # Bounding box coordinates

# Access bounding boxes directly
if results:
    # Assuming results is a SolutionOutputs object
    if hasattr(results, 'boxes'):
        boxes = results.boxes.xyxy  # Access the bounding boxes
        print("Detected bounding boxes:")
        for box in boxes:
            print(box)  # Print each bounding box
            x1, y1, x2, y2 = map(int, box)  # Convert to integer coordinates
            cv2.rectangle(image, (x1, y1), (x2, y2), (0, 255, 0), 2)  # Draw bounding box
            cv2.putText(image, "Detected", (x1, y1 - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)
    else:
        print("No bounding boxes found in the result.")
else:
    print("No results returned from the YOLO model.")

# Show the image with detected objects
cv2.imshow("Detected Objects", image)
cv2.waitKey(0)
cv2.destroyAllWindows()

# from flask import Flask, jsonify, request
#
# app = Flask(__name__)
#
# from flask_cors import CORS
# CORS(app)  # Enable CORS for all routes
#
# @app.route('/api/process-image', methods=['GET'])
# def processImage():
#     try:
#         blob = request.args.get('image')  # Get the argument from the URL query string
#     except:
#         blob = ""  # hard-coded
#     print(blob)
#
#     # Run processing
#     data = process_image()
#     return jsonify(data)
#
# if __name__ == '__main__':
#     app.run(debug=True)
#