import os
import json
from groq import Groq
import sys
client = Groq(
    # This is the default and can be omitted
    api_key="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",
)

responses = {
            "working hours": "India Post offices are generally open from 9:00 AM to 5:30 PM, Monday to Saturday. Timings may vary by location. Some offices may also be open on Sundays.",
            "track parcel": "To track your parcel, use the tracking ID on our 'Track Consignment' page on the India Post website or use the India Post mobile app.",
            "apply for po box": "To apply for a P.O. Box, visit your nearest post office with a valid ID and address proof. Fees may apply depending on the location and the box size.",
            "postage rates": "Postage rates depend on the weight and destination of the item. You can use our postage calculator on the India Post website to find out more.",
            "lost parcel": "If your parcel is lost, please lodge a complaint on our website or visit your nearest post office with the tracking ID for assistance.",
            "return policy": "If you wish to return an item sent via India Post, please check the seller's return policy and contact your nearest post office for guidance.",
            "international shipping": "India Post offers international shipping services to over 150 countries. Check out our website for details on rates, delivery times, and required documentation.",
            "services provided": "India Post offers a range of services including postal delivery, P.O. Boxes, money transfer, insurance, philately, and more. Visit our website for a full list of services.",
            "address proof": "You can use documents like an Aadhaar card, voter ID, or passport as address proof for services like P.O. Box applications and more.",
            "customs clearance": "For parcels sent abroad, customs clearance procedures depend on the destination country. Ensure that you fill out the required customs forms correctly to avoid delays.",
            "postal savings account": "India Post offers Postal Savings Accounts which you can open at your nearest post office. Please bring a valid ID and address proof for account opening.",
        }

topic = "india post"

def ask_ques(user_query):
    chat_completion = client.chat.completions.create(
        messages=[
            {
                "role": "system",
                "content": f"you are a helpful assistant that answers customer queries. use {responses} as reference for standard queries but rephrase them instead of copying exact responses. if any new question is asked, give a standard answer, otherwise a hypothetical answer. never say i dont know the answer to that."
            },
            
            {
            "role": "user",
            "content": user_query
            },
        ],
        model="llama3-8b-8192",
    )

    return chat_completion.choices[0].message.content

if __name__ == "__main__":
    user_query = sys.argv[1]
    result = ask_ques(user_query)
    print(json.dumps(result))
