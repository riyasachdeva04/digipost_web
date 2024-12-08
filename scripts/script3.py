import random
import os
from groq import Groq
import json

# Initialize Groq client
client = Groq(
    api_key="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",
)

# Word of the day logic
postal_words = ["letter", "parcel", "stamp", "courier", "postal code", "delivery", "postman", "sorting", "address", "mailbox"]
word_of_the_day = random.choice(postal_words)

# Prompt
prompt_for_mcqs = f"""
You are a helpful assistant. The word of the day related to postal services is '{word_of_the_day}'.

1. Generate two tricky MCQ questions based on the word of the day '{word_of_the_day}' with answers.
2. Generate one MCQ based on the history of Indian Post with the answer.
3. Generate one situation-based MCQ that an employee of the Department of Posts India might face, with the answer.
Write the 4 questions in the format Q1. Q2. Q3. Q4. Also, at the end of all questions and answers, write a factual interesting summary based on the questions you asked.
"""

# Generate MCQs
chat_completion_mcqs = client.chat.completions.create(
    messages=[
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": prompt_for_mcqs},
    ],
    model="llama3-8b-8192",
)

# Prepare JSON response
response = {
    "word_of_the_day": word_of_the_day,
    "mcqs": chat_completion_mcqs.choices[0].message.content,
}

print(json.dumps(response))
