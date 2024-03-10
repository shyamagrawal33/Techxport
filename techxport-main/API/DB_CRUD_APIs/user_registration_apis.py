# Import Modules
import pymongo
import random
import string
import re
from fastapi import APIRouter
from Schemas_for_data.schema_db_crud_apis import Signup, Signin, OtpBasedAuthentication, Update_password
from datetime import datetime, timedelta, date
from credentials import secret_key, mongo_uri
import hashlib
from uuid import uuid4
import jwt
import sent_email

user_registration_apis_obj = APIRouter()

COMMON_PASSWORDS = ["password", "123456", "qwerty"]


def is_valid_length(password, min_length=8, max_length=16):
    return min_length <= len(password) <= max_length


def has_required_characters(password):
    return any(c.isupper() for c in password) and \
        any(c.islower() for c in password) and \
        any(c.isdigit() for c in password) and \
        any(c in "!@#$%^&*" for c in password)


def is_common_password(password):
    return password.lower() not in COMMON_PASSWORDS


def generate_otp(length=6):
    return ''.join(random.choice(string.digits) for _ in range(length))


@user_registration_apis_obj.post('/signup')
def signup(jsonData: Signup):

    jsonData = jsonData.dict()

    mail_id = jsonData['mail_id'].strip()
    password = jsonData['password'].strip()

    # Validate mail_id and password
    if '@' in mail_id and mail_id != "" and password != "":
        pass
    else:
        return {
            'Status': 'Wrong input',
            'StatusCode': 0
        }

    # and not is_common_password(password):
    if is_valid_length(password) and has_required_characters(password):
        pass
    else:
        return {
            'Status': 'Password should have minimum length of 8 or Password should have upper or lower char.,numbers or special character also',
            'StatusCode': 0
        }

    username = mail_id.split('@')[0].strip()

    # current date and time
    now = datetime.now().date()

    Updated_date = Created_date = str(now)

    # For encrypt the Password using md5 alogorithem:
    # encoding using encode() then sending to md5()

    result = hashlib.md5(password.encode())
    encrypted_passwd = result.hexdigest()

    # Code for User_id
    date_Creation = date.today()
    user_id = f"{username}_{date_Creation}"

    client = pymongo.MongoClient(mongo_uri)
    db = client["techxport"]

    # Sample user information
    user_detail = {
        "User_id": user_id,
        "Username": username,
        "Email": mail_id,
        "Password": encrypted_passwd,
        "Otp": "",
        "Email_verified": "unverified",
        "Created_date": Created_date,
        "Updated_date": Updated_date
    }

    # Check if the user already exists by User_id
    existing_user = db['user_info'].find_one({"Email": user_detail["Email"]})
    # print(existing_user)

    if existing_user:
        return {
            'Status': 'User Already Exist',
            'StatusCode': 0
        }

    else:
        db['user_info'].insert_one(user_detail)
        print('yes1')

        sent_otp = generate_otp()

        client = pymongo.MongoClient(mongo_uri)
        db = client["techxport"]

        collection_name = "user_info"

        filter_condition = {"Email": mail_id}
        update_operation = {
            "$set": {
                "Otp": sent_otp
            }
        }

        result = db[collection_name].update_one(
            filter_condition, update_operation)

        print('yes2')

        sent_email.sent_email_for_otp(sent_otp, mail_id)

        client.close()
        return {
            'Status': 'User Registeration is in Process, Can you please verify otp sent to your email',
            'StatusCode': 1
        }


# SignIn API
@user_registration_apis_obj.post('/signin')
def signin(jsonData: Signin):
    # Step - 1: Input Section
    jsonData = jsonData.dict()
    mail_id = jsonData['mail_id'].strip()
    password = jsonData['password'].strip()

    # Validate mail_id and password
    if '@' in mail_id and mail_id != "" and password != "":
        pass
    else:
        return {
            'Status': 'Wrong input',
            'StatusCode': 0
        }

    # Assign Username
    username = mail_id.split('@')[0].strip()

    # For encrypt the Password using md5 alogorithem:
    # encoding using encode() then sending to md5()
    result = hashlib.md5(password.encode())
    encrypted_passwd = result.hexdigest()

    client = pymongo.MongoClient(mongo_uri)
    db = client["techxport"]

    # Check if the user already exists by User_id
    existing_user = db['user_info'].find_one({"Username": username})

    if existing_user:
        if existing_user["Email_verified"] == "unverified":
            return {
                'Status': 'Email Verification is not completed. Please verify otp first.',
                'StatusCode': 0
            }
    else:
        return {
            'Status': 'No Such User Exist',
            'StatusCode': 0
        }

    if encrypted_passwd != existing_user['Password']:
        return {
            'Status': 'Wrong Password',
            'StatusCode': 0
        }

    # # Generate the  JWT Token
    token = jwt.encode({
        'username': username,
        'user_mail_id': mail_id,
        'exp': datetime.utcnow() + timedelta(minutes=60)
    }, secret_key, algorithm="HS256")

    if existing_user:
        return {
            'Status': 'Login Successful',
            'StatusCode': 1,
            'token': token
        }

    else:
        return {
            'Status': 'No Such User Exist',
            'StatusCode': 0
        }


@user_registration_apis_obj.post('/sent_and_verify_otp')
def sent_and_verify_otp(jsonData: OtpBasedAuthentication):
    jsonData = jsonData.dict()
    mail_id = jsonData['mail_id'].strip().lower()
    otp = jsonData['otp'].strip()

    if otp == "":
        sent_otp = generate_otp()
        sent_email.sent_email_for_otp(sent_otp, mail_id)

        client = pymongo.MongoClient(mongo_uri)
        db = client["techxport"]

        # Check if the user already exists by User_id
        existing_user = db['user_info'].find_one({"Email": mail_id})
        if existing_user:
            pass
        else:
            return {
                'Status': 'No Such User Exist',
                'StatusCode': 0
            }

        collection_name = "user_info"

        filter_condition = {"Email": mail_id}
        update_operation = {
            "$set": {
                "Otp": sent_otp
            }
        }

        result = db[collection_name].update_one(
            filter_condition, update_operation)
        if result.modified_count == 1:
            return {
                'Status': 'Mail Sent Successfully',
                'StatusCode': 1
            }

    else:
        client = pymongo.MongoClient(mongo_uri)
        db = client["techxport"]

        # Check if the user already exists by User_id
        existing_user = db['user_info'].find_one({"Email": mail_id})

        if existing_user:
            if existing_user['Otp'] == otp:
                collection_name = "user_info"
                filter_condition = {"Email": mail_id}
                update_operation = {
                    "$set": {
                        "Email_verified": "verified"
                    }
                }

                result = db[collection_name].update_one(
                    filter_condition, update_operation)
                return {
                    'Status': 'Otp Verified Successfully',
                    'StatusCode': 1
                }
            else:
                return {
                    'Status': 'Wrong Otp',
                    'StatusCode': 0
                }
        else:
            return {
                'Status': 'No Such User Exist',
                'StatusCode': 0
            }


@user_registration_apis_obj.post('/update/password')
def update_password(jsonData: Update_password):
    jsonData = jsonData.dict()
    mail_id = jsonData['mail_id'].strip().lower()
    otp = jsonData['otp'].strip()
    password = jsonData['new_password'].strip()

    # Validate mail_id and password
    if '@' in mail_id and mail_id != "":
        pass
    else:
        return {
            'Status': 'Wrong input',
            'StatusCode': 0
        }

    # Assign Username
    username = mail_id.split('@')[0].strip()

    # and not is_common_password(password):
    if is_valid_length(password) and has_required_characters(password):
        pass
    else:
        return {
            'Status': 'Password should have minimum length of 8 or Password should have upper or lower char.,numbers or special character also',
            'StatusCode': 0
        }

    # ******************* Step-4 Entry in database ************************ #
    # current date and time
    now = datetime.now().date()

    Updated_date = str(now)

    # For encrypt the Password using md5 alogorithem:

    # encoding using encode() then sending to md5()
    result = hashlib.md5(password.encode())
    encrypted_passwd = result.hexdigest()

    client = pymongo.MongoClient(mongo_uri)
    db = client["techxport"]
    collection_name = "user_info"

    # Check if the user already exists by Username
    existing_user = db['user_info'].find_one({"Username": username})
    print(existing_user)
    # exit()

    if existing_user:
        if existing_user['Otp'] == otp:

            filter_condition = {"Email": mail_id}
            update_operation = {
                "$set": {
                    "Password": encrypted_passwd,
                    "Updated_date": Updated_date
                }
            }

            result = db[collection_name].update_many(
                filter_condition, update_operation)
            return {
                'Status': 'Password has been successfully updated',
                'StatusCode': 1,
            }
        else:
            return {
                'Status': 'Wrong Otp',
                'StatusCode': 0
            }

    else:
        return {
            'Status': 'No Such User Exist',
            'StatusCode': 0
        }
