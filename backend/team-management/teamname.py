from flask import Flask, request
import os, traceback
import openai

openai.api_key = os.environ.get("OPENAI_KEY", "OpenAI key not found")

import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from flask_cors import CORS

# Initializing with Default credentials
cred = credentials.ApplicationDefault()
# firebase_admin.initialize_app(cred)

# Firestore client
db = firestore.Client(project="prefab-pixel-391815")

app = Flask(__name__)
# Enable CORS
CORS(app)

openairesponse = {
    "msg": "New team created",
    "response": {
        "choices": [
            {
                "finish_reason": "stop",
                "index": 0,
                "message": {"content": "Dazzling-Swift", "role": "assistant"},
            }
        ],
        "created": 1689174665,
        "id": "chatcmpl-7bVmbxQ7T6qwQHZV7xj25jE7AYW6Z",
        "model": "gpt-3.5-turbo-0613",
        "object": "chat.completion",
        "usage": {"completion_tokens": 6, "prompt_tokens": 20, "total_tokens": 26},
    },
}


@app.route("/create-team", methods=["GET"])
def create_team():
    def get_team_name():
        # role = "system"
        # content = "Generate a unique team name with two adjectives separated by hyphen"
        # conversation = []
        # conversation.append({"role": role, "content": content})
        # model = "gpt-3.5-turbo"
        # response = openai.ChatCompletion.create(model=model, messages=conversation)
        # return response.choices[0].message.content
        response = openairesponse.load()
        return response.choices[0].message.content

    try:
        team_name = get_team_name()
        doc_ref = db.collection("Teams").document(team_name)
        # doc_ref.set(
        #     {"game_played": 0, "losses": 0, "name": team_name, "points": 0, "wins": 0}
        # )
        return {
            "success": True,
            "msg": "New team created",
            "data": {"team": team_name},
        }, 200
    except Exception:
        traceback.print_exc()
        return {"success": False, "msg": "Unable to create team"}, 400


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 5001)))
