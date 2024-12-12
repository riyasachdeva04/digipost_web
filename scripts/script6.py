import os
import json
from groq import Groq
import sys

client = Groq(
    # This is the default and can be omitted
    api_key="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",
)

# Load responses from the JSON file
with open('responses.json', 'r') as file:
    responses = json.load(file)

# Convert the responses object to a JSON string
responses_str = json.dumps(responses)

topic = "india post"

def ask_ques():
    chat_completion = client.chat.completions.create(
        messages=[
            {
                "role": "system",
                "content": f"You are a helpful assistant that does sentiment analysis of customer complaints sent to Indian Post Office. Analyse the reviews and give the percentage of the top 5 sentiments found."
            },
            {
                "role": "user",
                "content": responses_str
            },
        ],
        model="llama3-8b-8192",
    )

    return chat_completion.choices[0].message.content

if __name__ == "__main__":
    print(ask_ques())
