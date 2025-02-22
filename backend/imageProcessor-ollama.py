import ollama
import json

response = ollama.chat(
    model='llama3.2-vision',
    messages=[{
        'role': 'user',
        'content': 'Return a list of ingredients found in this image. In your message back, just have the list in python array form and nothing else. ',
        'images': ['leilani-angel-d2aZ2MJBSeU-unsplash.jpg']
    }]
)

content = response['message']['content'].strip()

array = json.loads(content.replace("'", '"'))

print(array)