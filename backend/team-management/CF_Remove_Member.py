import functions_framework
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
        email = request_json.get("email")
    except:
        return (
            {
                "success": False,
                "msg": "Missing team or email in request",
            },
            200,
            headers,
        )

    def update_member(member):
        if member["email"] != email:
            member["role"] = "admin"
        return member

    try:
        doc_ref = db.collection("Members").document(team_name)
        doc_data = doc_ref.get()

        if doc_data.exists:
            members = doc_data.to_dict()["members"]
            current_member = list(
                filter(lambda member: member["email"] == email, members)
            )
            if current_member:
                updated_members = list(
                    filter(lambda member: member["email"] != email, members)
                )
                doc_ref.set({"members": updated_members}, merge=True)
                return (
                    {
                        "success": True,
                        "msg": "Member removed",
                        "data": f"{email} removed from team",
                    },
                    200,
                    headers,
                )
            else:
                return (
                    {
                        "success": False,
                        "msg": "Member does not exist",
                    },
                    200,
                    headers,
                )
        else:
            return (
                {
                    "success": False,
                    "msg": "Team does not exist",
                },
                200,
                headers,
            )
    except Exception:
        return {"success": False, "msg": "Unable to fetch collection"}, 400, headers
