from json import JSONDecodeError
import ollama
import json
from dotenv import load_dotenv
import os
import requests
from numpy.f2py.auxfuncs import throw_error

def process_image(filename):
    print("Processing image", filename)
    pathname = 'image/' + str(filename)
    # Get list of ingredients
    response = ""
    stream = ollama.chat(
        model='llama3.2-vision',
        messages=[{
            'role': 'user',
            'content': 'Return a list of ingredients found in this image. In your message back, just have the list in python array form and nothing else, no punctuation. ',
            'images': [pathname],
        }],
        stream=True
    )

    for chunk in stream:
        response += chunk['message']['content']
        # print(chunk['message']['content'], end='', flush=True)

    print()
    try:
        # Parse ollama response
        ingredients = json.loads(response.replace("'", '"'))
        print(ingredients)
    except JSONDecodeError:
        try:
            ingredients = json.loads(response.replace("'", '"')[:-1])
            print(ingredients)
        except JSONDecodeError:
            throw_error("Unknown error parsing ingredients")
    except Exception as e:
        throw_error("Unknown error parsing ingredients" + str(e))

    # Load the .env file
    load_dotenv()
    API_KEY = os.getenv("FOODATA_CENTRAL_API_KEY")

    # Map ingredient to nutrients
    nutrients = {}
    for ingredient in ingredients:
        print("Finding", ingredient)
        url = f'https://api.nal.usda.gov/fdc/v1/foods/search?api_key={API_KEY}&query={ingredient}&sortBy=publishedDate&sortOrder=desc&numberOfResultsPerPage=10000&pageSize=10000'
        request = json.loads(requests.get(url).text)
        # print(request)
        for item in request["foods"]:
            if item.get("foodCategory") is not None and item.get("description") is not None:
                if item["foodCategory"] in ["Fruits and Fruit Juices", "Vegetables and Vegetable Products"]:
                    print("Found USDA", item["description"], "getting nutrients...")
                    if item.get("foodNutrients") is not None:
                        for nutrient in item["foodNutrients"]:
                            if nutrient["nutrientName"] + " " + nutrient["unitName"] in ['Biotin UG', 'Calcium, Ca MG', 'Carbohydrate, by difference G', 'Cholesterol MG', 'Energy KCAL', 'Fatty acids, total monounsaturated G', 'Fatty acids, total polyunsaturated G', 'Fatty acids, total saturated G', 'Fatty acids, total trans G', 'Fiber, total dietary G', 'Glucose G', 'Iron, Fe MG', 'Potassium, K MG', 'Sodium, Na MG', 'Sugars, Total G', 'Total Sugars G', 'Vitamin A, IU IU', 'Vitamin B-6 MG', 'Vitamin C, total ascorbic acid MG', 'Vitamin D (D2 + D3), International Units IU']:
                                if nutrients.get(nutrient["nutrientName"] + " " + nutrient["unitName"]) is None:
                                    nutrients[nutrient["nutrientName"] + " " + nutrient["unitName"]] = round(nutrient["value"], 2)
                                else:
                                    nutrients[nutrient["nutrientName"] + " " + nutrient["unitName"]] += round(nutrient["value"], 2)
                        if nutrients.get("Sugars, Total G") is not None and nutrients.get("Total Sugars") is not None:
                            nutrients["Sugars, Total G"] += nutrients["Total Sugars G"]
                            nutrients.pop("Total Sugars G")
                        elif nutrients.get("Sugars, Total G") is None and nutrients.get("Total Sugars") is not None:
                            nutrients["Sugars, Total G"] = nutrients["Total Sugars G"]
                            nutrients.pop("Total Sugars G")
                        break

    print(nutrients)
    return nutrients

if __name__ == '__main__':
    process_image("anna-pelzer-IGfIGP5ONV0-unsplash.jpg")

