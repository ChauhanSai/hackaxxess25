# Forkast
### Submission to [Hack Axxess 2025](https://devpost.com/software/forkcast)

## Why use Forkast? 🥗
Lots of apps exist that scan the barcodes of grocery store products and track your nutrition, diet habits, etc. However, there is no place to go to get accurate, quick, and easy nutrition information for home-cooked, restaurant-style, or, for students, dining-hall meals. Thats where **Forkast** comes in. Unlike traditional nutrition-tracking apps that rely on barcode scanning, Forkast uses AI to analyze images of food in places where nutrition information is often unavailable. Just snap a picture, and Forkast instantly identifies your meal, provides detailed nutrition insights, and tracks your eating habits over time.

With an integrated chatbot, you can ask questions about macros, calories, or even meal suggestions based on your diet goals. Whether you’re a student navigating dining hall options or someone who enjoys cooking at home, Forkast ensures you get accurate, personalized nutrition data—without the guesswork.

## What is Forkast? 🧠
 - **Secure Authentication** – Ensures user privacy with encrypted data flows, leveraging a serverless architecture on Amazon Web Services (AWS) for scalability and reliability.
 - **AI-Powered Insights** – NomBot, your secure, accurate, personal nutrition assistant, answers questions about meal composition, macros, and dietary trends in real time trained on 1 billion tokens through llama-3.2.
 - **Instant Meal Recognition** – Uses Python and open artificial intelligence models, such as llama-vision-3.2, to analyze home-cooked, restaurant-style, and dining hall meals, providing accurate nutrition breakdowns without the need for barcodes.
 - **Personalized Dashboard** – Stores your meal history and nutrition data to help identify trends, set goals, and make informed dietary decisions using high detail charts.

## Framework & Tech Stack 🧑‍🍳
 - **Amazon Web Services** – We use a cloud-focused and secure, serverless setup on AWS to handle authentication, data storage, and processing, ensuring scalability and security.
 - **Llama Image Recognition and ChatBot** – Leveraging computer vision models, our app identifies meals from user-uploaded images and extracts nutritional information. Additionally, using natural language processing (NLP) and machine learning, NomBot provides real-time responses to nutrition-related queries.
 - **React Native and Recharts** – Front-end developed with React Native, ensuring a smooth cross-platform experience for iOS and Android users that is scaleable for future needs, with Recharts for dynamic nutrition data visualizations.
 - **USDA FoodData Central API** – Retrieves accurate nutritional information from an extensive database of food items to enhance meal analysis.
 - **Multer** – Handles image uploads efficiently, enabling secure and fast processing of user-submitted meal photos.

## Challenges We Faced 🐀
 - **Python Backend Integration** – Integrating the Flask-based backend with NomBot AI presented unexpected challenges, particularly in optimizing response times and API communication.
 - **AWS Lambda Setup** – Setting up AWS Lambda functions for the first time required overcoming hurdles in serverless deployment and event-driven execution.
 - **Image Recognition Model** – Training a large, custom food recognition model proved too time-consuming for our current scope, leading us to explore alternative solutions.
 - **FoodData Central API** – Sorting through USDA’s FoodData Central API to extract relevant and structured nutrition data required extensive filtering and optimization.

## Biggest Accomplishments ⏲️
 - **Data Encryption** – Successfully implemented secure image processing and data processing pipeline, ensuring user privacy and protection.
 - **UI/UX Design & Dashboard** – Built an intuitive, user-friendly frontend with React Native and Recharts, providing a seamless experience for meal tracking.
 - **First Serverless Deployment** – Successfully deployed a serverless architecture on AWS for the first time.

## What's Next? 🍰
 - **Blood Data Integration** – Enable users to upload blood test data from doctors to receive personalized dietary recommendations.
 - **Custom Diet & Health Preferences** – Allow users to set custom health requirements and dietary restrictions for more tailored nutrition tracking.
 - **Medical Data Sharing** – Provide an option to securely share nutrient information and eating history with physicians, aiding in yearly check-ups or medical consultations.
 - **Training Our Own AI Model** – Develop and train a custom food recognition model, improving accuracy and expanding support for a wider variety of home-cooked meals.

**Forkast**: Snap! Track! Eat smarter! 🍽️✨

Developed by Prerita Babarjung, Sai Chauhan, Ishita Saran, and Allen Zheng
