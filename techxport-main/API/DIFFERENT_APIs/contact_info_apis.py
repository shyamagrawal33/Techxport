from fastapi import APIRouter, Header, Form, File, UploadFile
from typing import List
import json
import jwt
import os
import utilities
import pymongo
import dropbox_code
from credentials import mongo_uri
from bson import ObjectId
import ast
from awsHelper import upload_to_aws, download_from_s3

contact_info_related_apis_obj = APIRouter()

contact_info_route_path = '/contact/info'


@contact_info_related_apis_obj.get(contact_info_route_path)
def get_contact_info_api(token: str = Header("token")):

    token_data = utilities.decode_jwt(token)
    if token_data['StatusCode'] == 0:
        return token_data

    mail_id = token_data["user_mail_id"]
    client = pymongo.MongoClient(mongo_uri)
    db = client["techxport"]

    # Check if the user already exists by User_id
    existing_user = db['user_info'].find_one(
        {"Email": mail_id})

    # print(existing_user)
    if existing_user:
        # Sample contact detail information

        contact_info_details = db['contact_info'].find(
            {"mail_id": mail_id})

        final_contact_list = []
        for j in contact_info_details:
            company_detail = {
                'id': str(j["_id"]),
                "company_name": j['contact_data']["company_name"],
                "email": j['contact_data']["email"],
                "address": j['contact_data']["address"],
                "city": j['contact_data']["city"],
                "state": j['contact_data']["state"],
                "pincode": j['contact_data']["pincode"],
                "country": j['contact_data']["country"],
                "phone_no": j['contact_data']["phone_no"],
                "logo": j['contact_data']["logo"],
                "gst_no": j['contact_data']["gst_no"],
                "optionalField": j['contact_data']["optionalField"]
            }
            final_contact_list.append(company_detail)
        return {
            'all_contact_details': final_contact_list,
            'StatusCode': 1
        }
    else:
        return {
            'Status': 'No Such User Exist',
            'StatusCode': 0
        }


@contact_info_related_apis_obj.post(contact_info_route_path)
async def create_contact_info_api(company_name: str = Form(...), email: str = Form(...), phone_no: str = Form(...), address: str = Form(...), city: str = Form(...), state: str = Form(...), country: str = Form(...), pincode: str = Form(...), optionalField: str = Form(...), gst_no: str = Form(...), logo: UploadFile = File(...), token: str = Header("token")):

    token_data = utilities.decode_jwt(token)
    if token_data['StatusCode'] == 0:
        return token_data

    mail_id = token_data["user_mail_id"]

    username = mail_id.split('@')[0].strip()

    print(optionalField)

    client = pymongo.MongoClient(mongo_uri)
    db = client["techxport"]

    # all folder append into a list:
    all_files_folder_lst = [var for var in os.listdir(
        os.getcwd()) if os.path.isdir(os.getcwd() + '/' + var)]
    # print(all_files_folder_lst)

    if 'logos' in all_files_folder_lst:
        if os.path.isdir(os.getcwd()+f"/logos/{username}"):
            pass
        else:
            os.mkdir(os.getcwd() + f"/logos/{username}")
    else:
        os.mkdir(os.getcwd()+f"/logos")
        os.mkdir(os.getcwd()+f"/logos/{username}")

    try:
        aws_logo_doc_path = f"/logos/{username}/{logo.filename}"
        with open(os.getcwd() + aws_logo_doc_path, "wb") as f:
            f.write(logo.file.read())

        # print(os.getcwd() + aws_logo_doc_path)
        res = upload_to_aws(aws_logo_doc_path)
        if res['StatusCode'] == 1:
            os.remove(os.getcwd() + aws_logo_doc_path)
    except:
        pass

    # Check if the user already exists by User_id
    existing_user = db['user_info'].find_one(
        {"Email": mail_id})

    if existing_user:
        client = pymongo.MongoClient(mongo_uri)
        db = client["techxport"]

        collection_name = "contact_info"

        # Dynamic JSON data to be saved (without an explicit _id field)
        dynamic_json_data = {
            "mail_id": mail_id,
            "contact_data":
                {
                    "company_name": company_name,
                    "email": email,
                    "address": address,
                    "city": city,
                    "state": state,
                    "pincode": pincode,
                    "country": country,
                    "phone_no": phone_no,
                    "logo": aws_logo_doc_path,
                    "gst_no": gst_no,
                    "optionalField": optionalField
                }
        }
        # exit()

        # Insert the dynamic JSON data into MongoDB, let MongoDB generate the _id
        db[collection_name].insert_one(dynamic_json_data)

        # result = db[collection_name].insert_one(filter_condition, update_operation)
        return {
            'Status': 'Contact info added Successfully',
            'StatusCode': 1
        }
    else:
        return {
            'Status': 'No Such User Exist',
            'StatusCode': 1
        }


@contact_info_related_apis_obj.put(contact_info_route_path)
async def update_contact_info_api(id: str = Form(...), company_name: str = Form(...), email: str = Form(...), phone_no: str = Form(...), address: str = Form(...), city: str = Form(...), state: str = Form(...), country: str = Form(...), pincode: str = Form(...), optionalField: str = Form(...), gst_no: str = Form(...), logo: UploadFile = File(None), token: str = Header("token")):

    token_data = utilities.decode_jwt(token)
    if token_data['StatusCode'] == 0:
        return token_data

    mail_id = token_data["user_mail_id"]
    username = mail_id.split('@')[0].strip()

    client = pymongo.MongoClient(mongo_uri)
    db = client["techxport"]

    # all folder append into a list:
    all_files_folder_lst = [var for var in os.listdir(
        os.getcwd()) if os.path.isdir(os.getcwd() + '/' + var)]
    # print(all_files_folder_lst)

    if 'logos' in all_files_folder_lst:
        if os.path.isdir(os.getcwd()+f"/logos/{username}"):
            pass
        else:
            os.mkdir(os.getcwd() + f"/logos/{username}")
    else:
        os.mkdir(os.getcwd()+f"/logos")
        os.mkdir(os.getcwd()+f"/logos/{username}")

    try:
        aws_logo_doc_path = f"/logos/{username}/{logo.filename}"
        with open(os.getcwd() + aws_logo_doc_path, "wb") as f:
            f.write(logo.file.read())

        # print(os.getcwd() + aws_logo_doc_path)
        res = upload_to_aws(aws_logo_doc_path)
        if res['StatusCode'] == 1:
            os.remove(os.getcwd() + aws_logo_doc_path)
    except:
        pass

    # Check if the user already exists by User_id
    existing_user = db['user_info'].find_one(
        {"Email": mail_id})

    if existing_user:
        client = pymongo.MongoClient(mongo_uri)
        db = client["techxport"]

        collection_name = "contact_info"
        target_id = ObjectId(id)

        # Dynamic JSON data to be saved (without an explicit _id field)
        dynamic_json_data = {
            "mail_id": mail_id,
            "contact_data":
                {
                    "company_name": company_name,
                    "email": email,
                    "address": address,
                    "city": city,
                    "state": state,
                    "pincode": pincode,
                    "country": country,
                    "phone_no": phone_no,
                    "logo": aws_logo_doc_path,
                    "gst_no": gst_no,
                    "optionalField": optionalField
                }
        }

        db[collection_name].update_one(
            {"_id": target_id}, {"$set": dynamic_json_data})

        return {
            'Status': 'Contact info updated Successfully',
            'StatusCode': 1
        }
    else:
        return {
            'Status': 'No Such User Exist',
            'StatusCode': 0
        }


@contact_info_related_apis_obj.delete(contact_info_route_path)
def delete_product_info_api(ids: str = Form(...), token: str = Header("token")):

    token_data = utilities.decode_jwt(token)
    if token_data['StatusCode'] == 0:
        return token_data

    mail_id = token_data["user_mail_id"]

    client = pymongo.MongoClient(mongo_uri)
    db = client["techxport"]

    existing_user = db['user_info'].find_one(
        {"Email": mail_id})

    ids = ast.literal_eval(ids)

    if existing_user:
        client = pymongo.MongoClient(mongo_uri)
        db = client["techxport"]

        collection_name = "contact_info"
        for id in ids:
            target_id = ObjectId(id)
            result = db[collection_name].delete_one({"_id": target_id})

        if result.deleted_count == 1:
            return {
                'Status': 'Contact deleted Successfully',
                'StatusCode': 1
            }
        else:
            return {
                'Status': 'Contact Not Found',
                'StatusCode': 0
            }

    else:
        return {
            'Status': 'No Such User Exist',
            'StatusCode': 0
        }
