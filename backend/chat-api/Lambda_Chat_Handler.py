# References
# [1] https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/example_cross_ApiGatewayWebsocketChat_section.html

import json
import logging
import os
import boto3
from botocore.exceptions import ClientError

logger = logging.getLogger()
logger.setLevel(logging.INFO)


def table_exists(table, dynamodb):
    try:
        table = dynamodb.Table(table)
        table_status = table.table_status
        return table_status == "ACTIVE"
    except ClientError as e:
        return False


def create_table(table_name, dynamodb):
    table = dynamodb.create_table(
        TableName=table_name,
        KeySchema=[{"AttributeName": "connection_id", "KeyType": "HASH"}],
        AttributeDefinitions=[{"AttributeName": "connection_id", "AttributeType": "S"}],
        ProvisionedThroughput={"ReadCapacityUnits": 5, "WriteCapacityUnits": 5},
    )
    table.wait_until_exists()


def handle_connect(user_name, table, connection_id):
    status_code = 200
    try:
        table.put_item(Item={"connection_id": connection_id, "user_name": user_name})
        print("Added connection %s for user %s.", connection_id, user_name)
    except ClientError:
        print("Couldn't add connection %s for user %s.", connection_id, user_name)
        status_code = 503
    return status_code


def handle_disconnect(table, connection_id):
    status_code = 200
    try:
        table.delete_item(Key={"connection_id": connection_id})
        print("Disconnected connection %s.", connection_id)
    except ClientError:
        print("Couldn't disconnect connection %s.", connection_id)
        status_code = 503
    return status_code


def handle_message(table, connection_id, event_body, apig_management_client):
    print("<----------Inside handleMessage()---------->")
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

    message = f"{user_name}: {event_body['msg']}".encode("utf-8")
    print("Message: %s", message)

    for other_conn_id in connection_ids:
        try:
            if other_conn_id != connection_id:
                send_response = apig_management_client.post_to_connection(
                    Data=message, ConnectionId=other_conn_id
                )
                print(
                    "Posted message to connection %s, got response %s.",
                    other_conn_id,
                    send_response,
                )
        except ClientError:
            print("Couldn't post to connection %s.", other_conn_id)
        except apig_management_client.exceptions.GoneException:
            print("Connection %s is gone, removing.", other_conn_id)
            try:
                table.delete_item(Key={"connection_id": other_conn_id})
            except ClientError:
                print("Couldn't remove connection %s.", other_conn_id)

    return status_code


def lambda_handler(event, context):
    route_key = event["requestContext"]["routeKey"]
    connection_id = event["requestContext"]["connectionId"]

    dynamodb = boto3.resource("dynamodb")

    # table_name = "team1"

    if route_key is None or connection_id is None:
        return {"statusCode": 400}

    # table = dynamodb.Table(table_name)
    response = {}

    if route_key == "$connect":
        user_name = event.get("queryStringParameters", {"name": "Guest User"}).get(
            "name"
        )
        table_name = event.get("queryStringParameters", {"team": "Guest Team"}).get(
            "team"
        )
        if table_name != "Guest Team" and table_exists(table_name, dynamodb):
            table = dynamodb.Table(table_name)
        else:
            create_table(table_name, dynamodb)
            table = dynamodb.Table(table_name)
        response["statusCode"] = handle_connect(user_name, table, connection_id)
    elif route_key == "$disconnect":
        table_name = event.get("queryStringParameters", {"team": "Guest Team"}).get(
            "team"
        )
        if table_name != "Guest Team" and table_exists(table_name, dynamodb):
            table = dynamodb.Table(table_name)
        else:
            create_table(table_name, dynamodb)
            table = dynamodb.Table(table_name)
        response["statusCode"] = handle_disconnect(table, connection_id)
    elif route_key == "sendMessage":
        print("<----------Inside sendMessage route---------->")
        body = event.get("body")
        body = json.loads(body if body is not None else '{"msg": "", "team": ""}')
        table_name = body["team"]
        if table_name != "Guest Team" and table_exists(table_name, dynamodb):
            table = dynamodb.Table(table_name)
        else:
            create_table(table_name, dynamodb)
            table = dynamodb.Table(table_name)
        try:
            print("<----------Calling handle_message()---------->")
            apig_management_client = boto3.client(
                "apigatewaymanagementapi",
                endpoint_url=f"https://8tcj2pzqo7.execute-api.us-east-1.amazonaws.com/production",
            )
            response["statusCode"] = handle_message(
                table, connection_id, body, apig_management_client
            )
        except Exception as e:
            print(str(e))
            response["statusCode"] = 400
    else:
        response["statusCode"] = 404

    return response
