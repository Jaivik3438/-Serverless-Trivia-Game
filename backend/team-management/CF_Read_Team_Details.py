import functions_framework
from firebase_admin import firestore
import json

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


@functions_framework.http
def hello_http(request):
    headers = cors_enabled_function(request)
    request_json = request.get_json(silent=True)
    try:
        team_name = request_json.get("team")
    except:
        return (
            {
                "success": False,
                "msg": "Missing team name in request",
            },
            200,
            headers,
        )

    try:
        doc_ref = db.collection("Teams").document(team_name)
        doc_data = doc_ref.get()
        team_dict = doc_data.to_dict()

        doc_ref_members = db.collection("Members").document(team_name)
        doc_data_members = doc_ref_members.get()
        members_dict = doc_data_members.to_dict()

        team_dict = team_dict | members_dict

        if doc_data.exists:
            return (
                {
                    "success": True,
                    "msg": "Team information found",
                    "data": team_dict,
                },
                200,
                headers,
            )
        else:
            return (
                {
                    "success": False,
                    "msg": "Team not found or team does not exist",
                },
                200,
                headers,
            )
    except Exception:
        return {"success": False, "msg": "Unable to fetch collection"}, 400, headers
