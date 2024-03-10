import jwt
import pymongo
from credentials import secret_key, mongo_uri


def decode_jwt(token):

    # # Varify the JWT Token
    if token == 'None':
        return {
            'Status': 'Token is missing !!',
            'StatusCode': 0,
            'status_code': 401
        }

    try:
        decoded_token = jwt.decode(token, secret_key, algorithms=["HS256"])

        client = pymongo.MongoClient(mongo_uri)
        db = client["techxport"]

        # Check if the user already exists by User_id
        existing_user = db['user_info'].find_one(
            {"Username": decoded_token["username"]})

        # print(existing_user)
        print('1')
        if existing_user:
            return {
                'Status': "Success",
                'StatusCode': 1,
                'user_mail_id': existing_user['Email']
            }
    except jwt.DecodeError:
        print('2')
        return {
            'Status': 'Token decoding failed',
            'StatusCode': 0
        }
    except jwt.ExpiredSignatureError:
        print('3')
        return {
            'Status': 'Signature expired. Please log in again.',
            'StatusCode': 0
        }

    except jwt.InvalidTokenError:
        print('4')
        return {
            'Status': 'Invalid token. Please log in again.',
            'StatusCode': 0
        }
