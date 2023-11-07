import functions_framework, traceback, openai, json, os
from firebase_admin import firestore

db = firestore.Client(project="prefab-pixel-391815")


def cors_enabled_function(request):
    if request.method == "OPTIONS":
        headers = {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET",
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Max-Age": "3600",
        }
        return headers
    headers = {"Access-Control-Allow-Origin": "*"}
    return headers


openai.api_key = os.environ.get("OPENAI_KEY", "OpenAI key not found")

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


def get_team_name():
    # role = "system"
    # content = "Generate a unique team name with two adjectives separated by hyphen"
    # conversation = []
    # conversation.append({"role": role, "content": content})
    # model = "gpt-3.5-turbo"
    # response = openai.ChatCompletion.create(model=model, messages=conversation)
    # return response.choices[0].message.content
    # response = json.load(openairesponse)
    # return response.choices[0].message.content
    return "Dazzling-Swift"


@functions_framework.http
def hello_http(request):
    headers = cors_enabled_function(request)
    request_json = request.get_json(silent=True)
    try:
        email = request_json.get("email")
        name = request_json.get("name")
    except:
        return (
            {
                "success": False,
                "msg": "Missing team, name or email in request",
            },
            200,
            headers,
        )

    try:
        team_name = get_team_name()
        doc_ref = db.collection("Teams").document(team_name)
        doc_ref.set(
            {"game_played": 0, "losses": 0, "name": team_name, "points": 0, "wins": 0}
        )
        try:
            doc_ref_members = db.collection("Members").document(team_name)
            members = []
            members.append({"email": email, "name": name, "role": "admin"})
            doc_ref_members.set({"members": members}, merge=True)
        except Exception:
            traceback.print_exc()
            return (
                {"success": False, "msg": "Unable to add you in Members"},
                400,
                headers,
            )
        return (
            {
                "success": True,
                "msg": "New team created and added you to the team as admin",
                "data": {"team": team_name},
            },
            200,
            headers,
        )
    except Exception:
        traceback.print_exc()
        return {"success": False, "msg": "Unable to create team"}, 400, headers
