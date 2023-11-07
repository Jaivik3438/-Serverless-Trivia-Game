import base64, traceback, os
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
import functions_framework

# Triggered from a message on a Cloud Pub/Sub topic.
@functions_framework.cloud_event
def hello_pubsub(cloud_event):
    sender_email = os.environ.get("EMAIL_SOURCE", "Email source not found")
    api_key = os.environ.get("SENDGRID_EMAIL_API_KEY", "API Key not found - Send Grid")

    # pubsub_message = base64.b64decode(cloud_event.data["message"]["data"])
    pubsub_message = cloud_event.data["message"]["data"]
    print(pubsub_message)
    # message_json = json.loads(pubsub_message)
    email = cloud_event.data["message"]["attributes"]["email"]
    name = cloud_event.data["message"]["attributes"]["name"]
    team = cloud_event.data["message"]["attributes"]["team"]

    print(f"sender_email : {sender_email}")
    message = Mail(
        from_email=sender_email,
        to_emails=email,
        subject=f"You have been invited to join {team}",
        html_content="""
        <p>Hello {name},</p>
        <p>You are invited to join {team}</p>
        <a href="https://us-central1-prefab-pixel-391815.cloudfunctions.net/add_member-1?name={name}&email={email}&team={team}">Accept</a>
        """.format(
            name=name, team=team, email=email
        ),
    )

    try:
        sg = SendGridAPIClient(api_key)
        response = sg.send(message)
        print(f"Status Code : {response.status_code}")
        print(f"Response Body : {response.body}")
        print(f"Response Headers : {response.headers}")
    except Exception as e:
        print(f"Exception : {e}")
        traceback.print_exc()
