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
    # request_json = request.get_json(silent=True)
    try:
        # team_name = request_json.get("team")
        # email = request_json.get("email")
        # name = request_json.get("name")
        team_name = request.args.get("team")
        email = request.args.get("email")
        name = request.args.get("name")
        role = "member"
    except:
        # return {
        #     "success": False,
        #     "msg": "Missing team, email or name parameters in request",
        # }, 200
        return f"Missing info in request - Unable to process request", 200, headers

    try:
        doc_ref = db.collection("Members").document(team_name)
        doc_data = doc_ref.get()

        if doc_data.exists:
            members = doc_data.to_dict()["members"]
            current_member = list(
                filter(lambda member: member["email"] == email, members)
            )
            if current_member:
                # return {
                #     "success": False,
                #     "msg": "Member already exists",
                # }, 200
                return f"Member already registered in {team_name}", 200, headers
            else:
                new_member = {"name": name, "email": email, "role": role}
                members.append(new_member)
                doc_ref.set({"members": members}, merge=True)
                # return {
                #     "success": True,
                #     "msg": "Member added to team",
                #     "data": members,
                # }, 200
                return f"You are added to {team_name}", 200, headers
        else:
            # return {
            #     "success": False,
            #     "msg": "Team not found or team does not exist",
            # }, 200
            return f"Unable to add you in {team_name}", 202, headers
    except Exception:
        traceback.print_exc()
        return {"success": False, "msg": "Unable to fetch collection"}, 400, headers
