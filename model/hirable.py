# Import Libraries
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn import metrics
import pickle
import warnings
warnings.filterwarnings("ignore")

# Load Dataset
df = pd.read_csv("employees.csv")

# Clean and Preprocess Dataset
df = df.drop(columns=["sl_no", "ssc_p", "ssc_b", "hsc_p", "hsc_b", "hsc_s", "specialisation", "salary", "degree_t"])
df = df.rename(columns={"degree_p": "bsc", "mba_p": "msc"})
df['gender'] = df['gender'].replace({'M': 1, 'F': 2})
df['workex'] = df['workex'].replace({'Yes': 1, 'No': 0})
df['status'] = df['status'].replace({'Placed': 1, 'Not Placed': 0})

# Define Downscaling Function
def downscale(score):
    return score / 10 / 2

# Apply Downscaling to BSc and MSc grades
df[['bsc', 'msc']] = downscale(df[['bsc', 'msc']])

# Split into Features and Labels
features = df.drop(columns=['status'])
labels = df['status']

# Split into Training and Testing Sets
X_train, X_test, y_train, y_test = train_test_split(features, labels, train_size=0.8, random_state=1)

# Train the Model
model = RandomForestClassifier(n_estimators=100)
model.fit(X_train, y_train)

# Evaluate the Model
y_pred = model.predict(X_test)
print("Accuracy:", metrics.accuracy_score(y_test, y_pred))
print("Classification Report:\n", metrics.classification_report(y_test, y_pred))

# Test the Model on New Data
sample = np.array([[0, 2.9, 1, 78.50, 3.7]])
model.predict(sample)

# Save the Model
pickle.dump(model, open('hireable.pkl', 'wb'))

# Load the Model
loaded_model = pickle.load(open('hireable.pkl', 'rb'))
result = loaded_model.score(X_test, y_test)
print("Model Accuracy:", result)
