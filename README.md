# Medic-apis
- **[Source code of flutter Project](https://github.com/joeljsv/medic-apps)**
- **In REST API the authentication and0 Video calling Part is finished 1 day before hackthon Starts, the rest part is completed during period of 12-13 December 2020**
- **In Predicton API all models are using `Random forest classifier algorithm` for diffrent data sets**
- **Data Set is from Kaggle**
## Here is the apis used for medic apps
**There are two folders :**

      1. prediction-api
      2. rest-api
# API built with
- ## [Agora.io](https://www.agora.io/)
- ## [Twilio](https://www.twilio.com/console)
- ## [MongoDB](https://www.mongodb.com/)
# How to config 
### 1. prediction-api
  
  Its a ML api used for prediction its based on **Python Flask**
  
  #### How its run
    
 1. Create a Virtual env:
 ```
       pip install virtualenv
       virtualenv my_name
 ```
2. Install all plugins:
```  
       pip install -r requirements.txt
```
3. Run
```
      python app.py
```
**Its Now avlable on http://XXX.X.X.1:5000**

### 2. rest-api

1. Create a file for intialize env varibles:
```
      nodemon.json
```
2. Configure these variables
```
{
    "env": {
        "MONFO_ATLS_PW": "<Mongo-Db-Password>",
        "JWT_KEY": "<Databse-Key>",
        "appid": "<Agora Appid>",
        "token": "<Agora token>",
        "channel": "medic",
        "accountSid": "<Twilio Account SID>",
        "authToken": "<Twilio Auth Token>",
        "service": "<Twilio Service ID>",
        "Twilio_phone":<Twilio Number>
    }
}
```
3. Install Module
```
    npm install
```
4. Run
```
    npm start
```
**Its now avilable on http://localhost:3000/**

# Request in Prediction API
- ### Liver
```    
    Request : http://XXX.X.X.1:5000/predict??type=liver
```
    body:
```
{
    "Total Bilirubin": "1",
    "Direct_Bilirubin": "2",
    "Alkaline_Phosphotase": "3",
    "Alamine_Aminotransferase": "4",
    "Total_Protiens": "5",
    "Albumin": "6",
    "Albumin_and_Globulin_Ratio": "7"
}
```
- ### Heart
```    
    Request : http://XXX.X.X.1:5000/predict??type=heart
```
    body:
```
{
    "cp": "2",
    "trestbps": "62",
    "chol": "68",
    "fbs": "0",
    "restecg": "1",
    "thalach": "98",
    "exang": "1"
}
```

- ### Kidney
```    
    Request : http://XXX.X.X.1:5000/predict??type=kidney
```
    body:
```
{
    "Year": "54",
    "sg": "54",
    "al": "54",
    "su": "54",
    "rbc": "54",
    "pc": "54",
    "pcc": "54"
}
````
- ### Diabetes
```    
    Request : http://XXX.X.X.1:5000/predict??type=diabetes
```
    body:
```
{
    "Pregnancies": "56",
    "Present_Price": "546",
    "BloodPressure": "546",
    "BMI": "65",
    "DiabetesPedigreeFunction": "56",
    "Age": "56"
}
```
- ### Cancer
```    
    Request : http://XXX.X.X.1:5000/predict??type=cancer
```
    body:
```
{
    "concave points_mean": "87",
    "area_mean": "87",
    "radius_mean": "6",
    "perimeter_mean": "7",
    "concavity_mean": "68"
}
```

### Respond
- #### '0' For No Disease
- #### '1' For  Disease
```
{
    "data": "0",
    "status": "ok"
}
```
