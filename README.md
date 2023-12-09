<img src="https://res.cloudinary.com/dtwgxcqkr/image/upload/v1692472989/Kheti%20Sahayak%20Related%20Media/Kheti_Sahayak_Logo.png" height="100px" width="100px" alt="Kheti Sahayak" align="right">

<br>

# Kheti Sahayak 🌾

<p align="justify">Welcome to Kheti Sahayak, your trusted companion in the world of farming!</p>

<br>

![Kheti Sahayak Home Page](https://res.cloudinary.com/dtwgxcqkr/image/upload/v1705433192/Kheti%20Sahayak%20Related%20Media/eipoxryuwjwbc9fnbpeq.png)

<br>

## 🌱 About Kheti Sahayak

<p align="justify">Kheti Sahayak is a dedicated platform designed to revolutionize your agricultural experience. We're here to empower you by connecting you with fellow farmers and offering cutting-edge solutions for crop yield prediction, fertilizer recommendations, and disease detection.</p>

<br>

## 🚀 Key Features

- **Community Collaboration**: Join our vibrant community of dedicated farmers. Share experiences, learn from one another, and collaborate on innovative agricultural projects.

- **Crop Yield Prediction**: Leverage our machine learning capabilities to predict crop yields based on climate and soil conditions.

- **Fertilizer Recommendation**: Get personalized fertilizer recommendations for your crops, optimizing their growth.

- **Disease Detection**: Detect and prevent potential crop diseases using machine learning-based disease prediction models.

<br>

## 🛠️ Getting Kheti Sahayak

To get started with the Kheti Sahayak project, you will need to have [Node.js](https://nodejs.org/en/) and [MongoDB](https://www.mongodb.com/try/download/community) installed on your computer. 

You will also need a [Cloudinary account](https://cloudinary.com/) to store images.

You can clone the current version of the project from the [GitHub repository](https://github.com/BlaiseMariaJames/Kheti-Sahayak) and install the necessary dependencies by running the following commands:

```
git clone https://github.com/BlaiseMariaJames/Kheti-Sahayak.git
cd Kheti-Sahayak
npm install
```

Once you have installed the dependencies, you have to create an .env file with the following environment variables:

Name and secret for Session (Optional):

```
SESSION_NAME='<your_session_name>'
SESSION_SECRET='<your_session_secret>'
```

Your cloudinary account credentials (Required):

```
CLOUDINARY_CLOUD_NAME='<your_cloudinary_account_name>'
CLOUDINARY_KEY='<your_cloudinary_account_key>'
CLOUDINARY_SECRET='<your_cloudinary_account_secret>'
```

Your Open Weather API Key (Required):

```
OPEN_WEATHER_API_KEY='<your_open_weather_api_key>'
```

Your mongoDB Atlas URL (Optional):

```
ATLAS_DATABASE_URL='<your_database_url>'
```

Once all variables are declared, open anaconda prompt in the directory where the project was cloned and paste the following block:

```
conda create -n khetisahayak python=3.6.12
conda activate khetisahayak
pip install -r ./backend/requirements.txt
```

With mongod running behind, now you can start the application by running the following command:

```
node Kheti\ Sahayak.js
```

You can then access the application by opening your web browser and navigating to http://localhost:8888/.

<br>

## 💳 Credits

This project is heavily inspired from this [GitHub repository](https://github.com/Gladiator07/Harvestify) (especially the Python backend). This project is an extended version of the mentioned project.

<br>

## 🤝 Join the Kheti Sahayak Community

<p align="justify"><a href="https://blaise-maria-james-kheti-sahayak.onrender.com/">Visit our website</a> and embark on this exciting journey with us. Together, we'll cultivate success! 🌱🤗</p>

---

<div align="center">
    <p>Kheti Sahayak &copy; 2023</p>
</div>