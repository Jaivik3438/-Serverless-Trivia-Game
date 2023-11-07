import functions_framework, traceback
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


@functions_framework.http
def hello_http(request):
    headers = cors_enabled_function(request)
    request_json = request.get_json(silent=True)
    try:
        team_name = request_json.get("team")
        score = request_json.get("score")
    except:
        return (
            {
                "success": False,
                "msg": "Missing team in request",
            },
            200,
            headers,
        )

    def update_member(member):
        member["score"] = score
        return member

    try:
        doc_ref = db.collection("Members").document(team_name)
        doc_data = doc_ref.get()
        if doc_data.exists:
            members = doc_data.to_dict()["members"]
            updated_members = list(map(update_member, members))
            doc_ref.set({"members": updated_members}, merge=True)
        return (
            {
                "success": True,
                "msg": "Score updated",
                "data": {"members": updated_members},
            },
            200,
            headers,
        )
    except Exception:
        traceback.print_exc()
        return {"success": False, "msg": "Unable to update score"}, 400, headers
