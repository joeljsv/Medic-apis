from flask import Flask, render_template, url_for, flash, redirect,jsonify
import joblib
from flask import request
import numpy as np

app = Flask(__name__, template_folder='templates')

@app.route("/")

@app.route("/heart")
def Heart():
    return render_template("heart.html")
@app.route("/liver")
def Liver():
    return render_template("liver.html")
@app.route("/kidney")
def Kidney():
    return render_template("kidney.html")
@app.route("/diabetes")
def Diabetes():
    return render_template("diabetes.html")
@app.route("/cancer")
def Cancer():
    return render_template("cancer.html")


def ValuePredictor(to_predict_list, size,types):
    
    to_predict = np.array(to_predict_list).reshape(1,size)
    if(size==7 ):
        loaded_model = joblib.load(r''+types+'_model.pkl')
        result = loaded_model.predict(to_predict)
    elif(size==6):
        loaded_model = joblib.load(r'diabetes_model.pkl')
        result = loaded_model.predict(to_predict)
    else:
        loaded_model = joblib.load(r'cancer_model.pkl')
        result = loaded_model.predict(to_predict)
    return result[0]


@app.route('/predict', methods = ["POST"])
def predict():
    
    if request.method == "POST":
        to_predict_list = request.json
        types=request.args.get('type')
        to_predict_list = list(to_predict_list.values())
        to_predict_list = list(map(float, to_predict_list))
         #liver
        if(len(to_predict_list)==7):
            result = ValuePredictor(to_predict_list,7,types)
        #diabetes
        elif(len(to_predict_list)==6):
            result = ValuePredictor(to_predict_list,6,types)
        #cancer
        elif(len(to_predict_list)==5):
            result = ValuePredictor(to_predict_list,5,types)
    
    
    if(int(result)==1):
        # Sorry you chances of getting the disease. Please consult the doctor immediately
        prediction = "1"
    else:
        # No need to fear. You have no dangerous symptoms of the disease
        prediction = "0"
    return jsonify({"data": prediction,"status":"ok"})
@app.route('/predict_web', methods = ["POST"])
def predict_web():
    if request.method == "POST":
        types=request.args.get('type')
        to_predict_list = request.form.to_dict()
        # print(to_predict_list)
        to_predict_list = list(to_predict_list.values())
        to_predict_list = list(map(float, to_predict_list))
         #liver #heart #kidney
        if(len(to_predict_list)==7):
            result = ValuePredictor(to_predict_list,7,types)
         #diabetes
        elif(len(to_predict_list)==6):
            result = ValuePredictor(to_predict_list,6,types)
        #cancer
        elif(len(to_predict_list)==5):
            result = ValuePredictor(to_predict_list,5,types)
    
    if(int(result)==1):
        prediction = "Sorry you have chances of getting the "+types+"\ndisease. Please consult the doctor immediately"
    else:
        prediction = "No need to fear.\nYou have no dangerous symptoms of the "+types+" disease"
    return(render_template("result.html", prediction_text=prediction))   

if __name__ == "__main__":
    app.run(debug=True)
