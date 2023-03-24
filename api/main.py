# Importing necessary libraries
import uvicorn
import pickle
import numpy as np
from pydantic import BaseModel
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Initializing the fast API server
app = FastAPI()

origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:3000",
    "http://localhost:3001"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Loading up the trained model
model = pickle.load(open('../model/model/digit_recog.pkl', 'rb'))


# Defining the model input types
class Image(BaseModel):
    image: list

# Setting up the home route
@app.get("/")
def read_root():
    return {"data": "Welcome to online employee hireability prediction model"}

# Setting up the prediction route
@app.post("/prediction/")
async def get_predict(data: Image):
    sample = np.array(data.image)
    sample= sample.reshape(-1,28,28,1)
    sample = sample.astype('float32')/255
    pred = model.predict(sample)
    digit = np.argmax(pred, axis=1)
    return {
        "data": {
            'prediction': str(digit[0]),
            
            #'interpretation': 'Candidate can be hired.' if hired == 1 else 'Candidate can not be hired.'
        }
    }

# Configuring the server host and port
if __name__ == '__main__':
    uvicorn.run(app, port=8080, host='0.0.0.0')
