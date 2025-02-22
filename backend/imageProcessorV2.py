import torch
from torchvision import transforms
from PIL import Image
from model import RecipeModel  # Assuming you downloaded a trained model

# Load the model (Example: im2recipe)
model = RecipeModel()
model.load_state_dict(torch.load("recipe1m_model.pth"))
model.eval()

# Load Image
image_path = "food_image.jpg"
image = Image.open(image_path)
transform = transforms.Compose([transforms.Resize((224, 224)), transforms.ToTensor()])
image = transform(image).unsqueeze(0)

# Predict Ingredients
with torch.no_grad():
    ingredients = model(image)

print("Predicted Ingredients:", ingredients)
