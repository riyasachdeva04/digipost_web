import os

from groq import Groq

client = Groq(
    # This is the default and can be omitted
    api_key="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",
)
topic = "india post"
description = "i am an employee"


chat_completion = client.chat.completions.create(
    messages=[
        {
            "role": "system",
            "content": "you are a helpful assistant."
        },
        
        {
          "role": "user",
          "content": f"""Give me a tricky mcq question based on {topic}. 
          The description of the question is {description}. Also give me the answer"""
        },
    ],
    model="llama3-8b-8192",
)

print(chat_completion.choices[0].message.content)