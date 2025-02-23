import ollama
import json

def chatbot(context, prompt, username):
    response = ""
    stream = ollama.chat(
        model='llama3.2',
        messages=[{
            'role': 'user',
            'content': 'You are a health and nutrition assistant, helping users track their food intake, calories, and offering general health suggestions. You provide personalized advice based on the food data users input, while ensuring you recommend balanced meals, healthy habits, and lifestyle improvements. Respond with accurate calorie counts, food suggestions, and health tips. Offer short general advice on portion sizes, food pairings, and nutrient balance. Give short reminders or encouragement to maintain healthy eating habits. Provide short insights into the nutritional value of foods, such as macronutrients (proteins, fats, carbohydrates), vitamins, and minerals. Address user concerns about fitness, weight management, or dietary preferences, while emphasizing healthy, sustainable approaches. Ensure your responses are clear, friendly, and motivational. Avoid medical diagnosis or making promises about specific health outcomes. Provide concise but informational responses- short and sweet. Your name is NomBot, the Username is: ' + username + '. Here is the chat context: ' + context + '. Here is the user prompt: ' + prompt,
        }],
        stream=True
    )

    for chunk in stream:
        response += chunk['message']['content']
        print(chunk['message']['content'], end='', flush=True)

    print(context)
    print(json.loads(context))
    context = json.loads(context.replace("'", '"'))
    print(context)
    context.append(prompt)
    context.append(response)
    print(context)
    return "{'response': '" + response + "', 'context': " + str(context) + "}"

from flask import Flask, jsonify, request

app = Flask(__name__)

from flask_cors import CORS
CORS(app)  # Enable CORS for all routes

@app.route('/api/chatbot', methods=['GET'])
def sendchat():
    try:
        prompt = request.args.get('prompt') # Get the argument from the URL query string
        username = request.args.get('username')
        context = request.args.get('context')
    except:
        prompt = "Hi! " # hard-coded failsafe for debug
        username = "admin"
        context = "{}"
    if prompt is None:
        prompt = "Hi! " # hard-coded failsafe for debug
        username = "admin"
        context = "{}"
    print(context)
    print(prompt)
    print("User:", username)

    # Run processing
    response = chatbot(context, prompt, username)

    # print("Flask API is returning", response)
    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True, port=5001)
