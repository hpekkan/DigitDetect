import numpy as np 
import pandas as pd
import os
import pickle


# Machine learning

from tensorflow import keras
from tensorflow.keras import layers
from sklearn.model_selection import train_test_split
import absl.logging
absl.logging.set_verbosity(absl.logging.ERROR)

# Hide warnings
import warnings
warnings.simplefilter('ignore')
#data read
path = os.getcwd()
sub_dir = "data"
filename = "train.csv"
filepath = os.path.join(path, sub_dir, filename)
train=pd.read_csv(filepath)
#Splitting the data into features and labels
y = train['label']
X=train.drop(["label"],axis=1)

#Each image is 28 pixels wide and 28 pixles long. Reshaping to 28 x 28 x 1
X= X.values.reshape(-1,28,28,1)
# Normalizing the image 
X = X.astype("float32") / 255


num_classes = 10
input_shape = (28, 28, 1)

# Splitting the data into training and validation sets
X_train, X_val, Y_train, Y_val = train_test_split(X, y, test_size=0.2)

# Convert class vectors to binary class matrices
Y_train = keras.utils.to_categorical(Y_train, num_classes)
Y_val = keras.utils.to_categorical(Y_val, num_classes)

# Building the model
model = keras.Sequential(
    [
        keras.Input(shape=input_shape),
        
        layers.Conv2D(32, kernel_size=(3, 3), activation="relu"),
        layers.MaxPooling2D(pool_size=(2, 2)),
        layers.Conv2D(64, kernel_size=(3, 3), activation="relu"),
        layers.MaxPooling2D(pool_size=(2, 2)),

        layers.Flatten(),
        layers.Dropout(0.5),
        layers.Dense(num_classes, activation="softmax"),
    ]
)

batch_size = 128
epochs = 20

model.compile(loss="categorical_crossentropy", optimizer="adam", metrics=["accuracy"])

model.fit(X_train, Y_train, batch_size=batch_size, epochs=epochs, validation_split=0.1)

score = model.evaluate(X_val, Y_val, verbose=0)
print("Test loss:", score[0])
print("Test accuracy:", score[1])


# Save the Model
pickle.dump(model, open('model/digit_recog.pkl', 'wb'))


# Load the Model
loaded_model = pickle.load(open('model/digit_recog.pkl', 'rb'))
score = model.evaluate(X_val, Y_val, verbose=0)
print("Test loss:", score[0])
print("Test accuracy:", score[1])
