# Standard library imports
import sys
import json
import ast # abstact syntax tree
import pickle

# External library imports
import numpy as np
import pandas as pd
import requests
import torch
from PIL import Image
from torchvision import transforms

# Custom module imports
from utilities.resnet9_configuration import ResNet9
from utilities.disease_detection import disease_dic
from utilities.fertilizer_recommendation import fertilizer_dic

# Constants
NITROGEN = "N"
PHOSPHOROUS = "P"
POTASSIUM = "K"

# Define disease classes for model output
disease_classes = [
    "Apple___Apple_scab",
    "Apple___Black_rot",
    "Apple___Cedar_apple_rust",
    "Apple___healthy",
    "Blueberry___healthy",
    "Cherry_(including_sour)___Powdery_mildew",
    "Cherry_(including_sour)___healthy",
    "Corn_(maize)___Cercospora_leaf_spot_Gray_leaf_spot",
    "Corn_(maize)___Common_rust_",
    "Corn_(maize)___Northern_Leaf_Blight",
    "Corn_(maize)___healthy",
    "Grape___Black_rot",
    "Grape___Esca_(Black_Measles)",
    "Grape___Leaf_blight_(Isariopsis_Leaf_Spot)",
    "Grape___healthy",
    "Orange___Haunglongbing_(Citrus_greening)",
    "Peach___Bacterial_spot",
    "Peach___healthy",
    "Pepper,_bell___Bacterial_spot",
    "Pepper,_bell___healthy",
    "Potato___Early_blight",
    "Potato___Late_blight",
    "Potato___healthy",
    "Raspberry___healthy",
    "Soybean___healthy",
    "Squash___Powdery_mildew",
    "Strawberry___Leaf_scorch",
    "Strawberry___healthy",
    "Tomato___Bacterial_spot",
    "Tomato___Early_blight",
    "Tomato___Late_blight",
    "Tomato___Leaf_Mold",
    "Tomato___Septoria_leaf_spot",
    "Tomato___Spider_mites_Two-spotted_spider_mite",
    "Tomato___Target_Spot",
    "Tomato___Tomato_Yellow_Leaf_Curl_Virus",
    "Tomato___Tomato_mosaic_virus",
    "Tomato___healthy",
]

# Function to load the pre-trained disease classification model
def load_disease_model(model_path, num_classes):
    model = ResNet9(3, num_classes)
    model.load_state_dict(torch.load(model_path, map_location=torch.device("cpu")))
    model.eval()
    return model

# Function to load the pre-trained crop recommendation model
def load_crop_recommendation_model(model_path):
    return pickle.load(open(model_path, "rb"))

# Function to fetch and return the temperature and humidity of a city
def weather_fetch(api_key, city_name):
    base_url = "http://api.openweathermap.org/data/2.5/weather?"
    complete_url = f"{base_url}appid={api_key}&q={city_name}"
    try:
        response = requests.get(complete_url)
        # Raise HTTPError for bad responses
        response.raise_for_status()
        weather_data = response.json()
        if weather_data["cod"] != "404":
            main_data = weather_data["main"]
            temperature = round((main_data["temp"] - 273.15), 2)
            humidity = main_data["humidity"]
            return temperature, humidity
    except requests.RequestException as e:
        pass
    return None

# CLI function for crop recommendation
def crop_recommendation_cli(response, model):
    api_key = response['api_key']
    try:
        N = int(response['nitrogen'])
        P = int(response['phosphorous'])
        K = int(response['pottasium'])
        ph = float(response['ph'])
        rainfall = float(response['rainfall'])
        district = response['district']
        if weather_fetch(api_key, district) is not None:
            temperature, humidity = weather_fetch(api_key, district)
            data = np.array([[N, P, K, temperature, humidity, ph, rainfall]])
            crop_prediction = model.predict(data)
            recommended_crop = crop_prediction[0]
            response['result'] = f"Recommended crop: {recommended_crop}"
        else:
            response['error'] =  "Error fetching weather data. Please try again."
    except ValueError as e:
        response['error'] =  f"Invalid input. Please enter a valid number: {e}"
    return response

# CLI function for fertilizer recommendation
def fert_recommendation_cli(response):
    try:
        verdict = {
            'NHigh': """<h5 class="text-center mb-3">The <b>nitrogen (N)</b> value of your soil is <b>high</b>.</h5>""",
            'Nlow': """<h5 class="text-center mb-3">The <b>nitrogen (N)</b> value of your soil is <b>low</b>.</h5>""",
            'PHigh': """<h5 class="text-center mb-3">The <b>phosphorus (P)</b> value of your soil is <b>high</b>.</h5>""",
            'Plow': """<h5 class="text-center mb-3">The <b>phosphorus (P)</b> value of your soil is <b>low</b>.</h5>""",
            'KHigh': """<h5 class="text-center mb-3">The <b>potassium (K)</b> value of your soil is <b>high</b>.</h5>""",
            'Klow': """<h5 class="text-center mb-3">The <b>potassium (K)</b> value of your soil is <b>low</b>.</h5>"""
        }
        crop_name = response['crop']
        N = int(response['nitrogen'])
        P = int(response['phosphorous'])
        K = int(response['pottasium'])
        df = pd.read_csv("backend/data/fertilizer_recommendation.csv")
        nr = df[df["Crop"] == crop_name][NITROGEN].iloc[0]
        pr = df[df["Crop"] == crop_name][PHOSPHOROUS].iloc[0]
        kr = df[df["Crop"] == crop_name][POTASSIUM].iloc[0]
        n = nr - N
        p = pr - P
        k = kr - K
        temp = {abs(n): NITROGEN, abs(p): PHOSPHOROUS, abs(k): POTASSIUM}
        max_value = temp[max(temp.keys())]
        if max_value == NITROGEN:
            key = "NHigh" if n < 0 else "Nlow"
        elif max_value == PHOSPHOROUS:
            key = "PHigh" if p < 0 else "Plow"
        else:
            key = "KHigh" if k < 0 else "Klow"
        response['verdict'] = f"{verdict[key]}"
        response['result'] = f"{fertilizer_dic[key]}"
    except ValueError as e:
        response['error'] =  f"Invalid input. Please enter a valid number: {e}"
    return response

# CLI function for disease prediction
def disease_prediction_cli(response, model):
    img_path = response['path']
    try:
        transform = transforms.Compose(
            [
                transforms.Resize(256),
                transforms.ToTensor(),
            ]
        )
        image = Image.open(img_path).convert("RGB")
        img_tensor = transform(image)
        img_tensor = torch.unsqueeze(img_tensor, 0)
        with torch.no_grad():
            model.eval()
            predictions = model(img_tensor)
        _, predicted_class = torch.max(predictions, dim=1)
        predicted_disease = disease_classes[predicted_class[0].item()]
        response['result'] = disease_dic[predicted_disease]
    except Exception as e:
        response['error'] =  "Error predicting disease. Please try retaking the image."
    return response

# Main menu function to choose the appropriate CLI function based on the option
def main_menu(response):
    option = response['option']
    if option == 1:
        model = load_crop_recommendation_model("backend/models/crop recommendation/random_forest.pkl")
        return crop_recommendation_cli(response, model)
    elif option == 2:
        return fert_recommendation_cli(response)
    else:
        model = load_disease_model( "backend/models/plant disease detection/resnet9_classifier.pth", len(disease_classes))
        return disease_prediction_cli(response, model)

if __name__ == "__main__":
    request = sys.argv[1]
    response = ast.literal_eval(request)
    response = main_menu(response)
    try :
        option = response['option']
        del response['option']
        if option == 1:
            del response['api_key']
        elif option == 3:
            del response['path']
    finally:
        print(json.dumps(response))
        sys.stdout.flush()