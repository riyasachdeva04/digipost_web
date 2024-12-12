import firebase_admin
from firebase_admin import credentials, db
import pandas as pd
import json

# Initialize the Firebase Admin SDK
cred = credentials.Certificate('/Users/riyasachdeva/Downloads/digipost_web/scripts/serviceAccountKey.json')
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://indiapost-33d9d-default-rtdb.firebaseio.com/'
})

# Fetch data from Firebase Realtime Database
ref = db.reference('dop_final_monthly')
data = ref.get()

# Flatten the JSON data
flattened_data = []
for state, offices in data.items():
    for office, villages in offices.items():
        for village, months in villages.items():
            for month, usage in months.items():
                usage['State'] = state
                usage['Officename ( BO/SO/HO)'] = office
                usage['Village/Locality name'] = village
                usage['Month'] = month
                flattened_data.append(usage)

# Convert the flattened data into a DataFrame
df = pd.DataFrame(flattened_data)

# Functions to process the data
def get_states():
    return df['State'].unique().tolist()

def get_villages(state):
    return df[df['State'] == state]['Village/Locality name'].unique().tolist()

def get_offices(state, village):
    return df[(df['State'] == state) & (df['Village/Locality name'] == village)]['Officename ( BO/SO/HO)'].unique().tolist()

def get_usage(state, village, office):
    usage = df[(df['State'] == state) & 
               (df['Village/Locality name'] == village) & 
               (df['Officename ( BO/SO/HO)'] == office)]
    return usage.to_dict(orient='records')

# Example: Specify inputs for demonstration
example_state = "Delhi"  # Replace with actual state
example_office = "Alipur SO"  # Replace with actual village
example_village = "Mungeshpur"  # Replace with actual office

# Generate the response
response = {
    "states": get_states(),
    "villages": get_villages(example_state),
    "offices": get_offices(example_state, example_village),
    "usage": get_usage(example_state, example_village, example_office)
}

# Print the final JSON
print(json.dumps(response))
