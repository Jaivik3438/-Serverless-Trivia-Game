# References
# https://cloud.google.com/pubsub/docs/publisher

import functions_framework, traceback
from google.cloud import pubsub_v1

project_id = "prefab-pixel-391815"
topic_id = "invitation_topic"

publisher = pubsub_v1.PublisherClient()
topic_path = publisher.topic_path(project_id, topic_id)


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
        data_str = f"You have been invited to join team - {team_name}"
        # Data must be a bytestring
        data = data_str.encode("utf-8")
        # Add attributes to the message
        future = publisher.publish(
            topic_path, data, email=email, name=name, team=team_name
        )
        print(future.result())
        print(f"Published messages with custom attributes to {topic_path}.")
        return (
            {
                "success": True,
                "msg": "Invitation sent",
                "data": request_json,
            },
            200,
            headers,
        )
    except Exception:
        traceback.print_exc()
        return {"success": False, "msg": "Unable to publish message"}, 400, headers
