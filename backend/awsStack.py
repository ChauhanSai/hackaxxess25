from dotenv import load_dotenv
import os
import requests
import json
from datetime import datetime

load_dotenv()
AWS_INVOKE_URL = os.getenv("AWS_INVOKE_URL")


def float_to_hex(float_num):
    # Ensure the float has 2 decimal places
    float_num = round(float_num, 2)

    # Convert the float to an integer representation
    int_rep = int(float_num * 100)

    # Convert the integer to a 6-bit hexadecimal string
    hex_rep = format(int_rep, '06x')

    return hex_rep

def encrypt(dictionary):
    map = {
        'Biotin UG': '00',
        'Calcium, Ca MG': '01',
        'Carbohydrate, by difference G': '02',
        'Cholesterol MG': '03',
        'Energy KCAL': '04',
        'Fatty acids, total monounsaturated G': '05',
        'Fatty acids, total polyunsaturated G': '06',
        'Fatty acids, total saturated G': '07',
        'Fatty acids, total trans G': '08',
        'Fiber, total dietary G': '09',
        'Glucose G': '0a',
        'Iron, Fe MG': '0b',
        'Potassium, K MG': '0c',
        'Sodium, Na MG': '0d',
        'Sugars, Total G': '0e',
        'Total Sugars G': '0f',
        'Vitamin A, IU IU': '10',
        'Vitamin B-6 MG': '11',
        'Vitamin C, total ascorbic acid MG': '12',
        'Vitamin D (D2 + D3), International Units IU': '13'
    }

    data = ""

    for item in dictionary:
        if item in map:
            data += map[item] + float_to_hex(dictionary[item])

    return data


def forkastData(username, image, data):
    id = username + datetime.now().strftime("%Y%m%d-%H%M%S")

    data = encrypt(data)

    dump = {
        "id": id,
        "image": image,
        "data": encrypt(data)
    }

    response = requests.post(
        AWS_INVOKE_URL + "/nutrition",
        headers={"Content-Type": "application/json"},
        data=json.dumps(dump)
    )

    print(response.text)

if __name__ == '__main__':
    data = {'Iron, Fe MG': 3.34, 'Potassium, K MG': 2078, 'Sodium, Na MG': 110.2, 'Glucose G': 5.7700000000000005, 'Fiber, total dietary G': 10.78, 'Calcium, Ca MG': 110.56, 'Carbohydrate, by difference G': 47.449999999999996, 'Sugars, Total G': 11.68, 'Vitamin C, total ascorbic acid MG': 14.8, 'Vitamin B-6 MG': 0.43, 'Biotin UG': 2.51, 'Vitamin D (D2 + D3), International Units IU': 0.0, 'Fatty acids, total monounsaturated G': 0.02, 'Fatty acids, total polyunsaturated G': 0.05, 'Energy KCAL': 16.0, 'Fatty acids, total saturated G': 0.03, 'Total Sugars G': 1.86, 'Vitamin A, IU IU': 7.0, 'Fatty acids, total trans G': 0.0, 'Cholesterol MG': 0.0}
    encrypt(data)