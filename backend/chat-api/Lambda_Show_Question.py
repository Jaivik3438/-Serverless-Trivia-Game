# References
# [1] https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/example_cross_ApiGatewayWebsocketChat_section.html

import json
import logging
import os
import boto3
from botocore.exceptions import ClientError

logger = logging.getLogger()
logger.setLevel(logging.INFO)


def handle_question(table, connection_id, event_body, apig_management_client):
    print("<----------Inside handleQuestion()---------->")
    status_code = 200
    user_name = "guest"
    try:
        item_response = table.get_item(Key={"connection_id": connection_id})
        user_name = item_response["Item"]["user_name"]
        print("Got user name %s.", user_name)
    except ClientError:
        print("Couldn't find user name. Using %s.", user_name)

    connection_ids = []
    try:
        scan_response = table.scan(ProjectionExpression="connection_id")
        connection_ids = [item["connection_id"] for item in scan_response["Items"]]
        print("Found %s active connections.", len(connection_ids))
    except ClientError:
        print("Couldn't get connections.")
        status_code = 404

    # message = f"Question : {event_body['question']}".encode("utf-8")
    # message = event_body["question"]
    message = event_body
    print("Message: %s", message)

    for conn_id in connection_ids:
        try:
            send_response = apig_management_client.post_to_connection(
                Data=json.dumps(message), ConnectionId=conn_id
            )
            print(
                "Posted question to connection %s, got response %s.",
                conn_id,
                send_response,
            )
        except ClientError:
            print("Couldn't post to connection %s.", conn_id)
        except apig_management_client.exceptions.GoneException:
            print("Connection %s is gone, removing.", conn_id)
            try:
                table.delete_item(Key={"connection_id": conn_id})
            except ClientError:
                print("Couldn't remove connection %s.", conn_id)

    return status_code


def lambda_handler(event, context):
    route_key = event["requestContext"]["routeKey"]
    connection_id = event["requestContext"]["connectionId"]

    # table_name = "team1"
    response = {}

    if route_key == "showQuestion":
        print("<----------Inside showQuestion route---------->")
        body = event.get("body")
        body = json.loads(body if body is not None else '{"question": {}, "team": ""}')
        table_name = body["team"]
        table = boto3.resource("dynamodb").Table(table_name)
        try:
            print("<----------Calling handle_question()---------->")
            apig_management_client = boto3.client(
                "apigatewaymanagementapi",
                endpoint_url=f"https://8tcj2pzqo7.execute-api.us-east-1.amazonaws.com/production",
            )
            response["statusCode"] = handle_question(
                table, connection_id, body, apig_management_client
            )
        except Exception as e:
            print(str(e))
            response["statusCode"] = 400
    else:
        response["statusCode"] = 404

    return response
