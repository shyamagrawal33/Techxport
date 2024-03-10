from fastapi import APIRouter, Header, Form, File, UploadFile
from typing import List
import json
import jwt
import os
import utilities
import pymongo
import dropbox_code
from credentials import mongo_uri, file_along_with_fields
from bson import ObjectId
import ast


# my_dictionary = {
#     "a": {"h" : 5 , "i" : 6 , "j" : 7 , "k" : 8},
#     "b": {"f" : 3 , "g" : 4},
#     "c": {"d" : 1, "e" : 2}
# }


# sync_parameter = "a"
# new_json = {"k" : "kite"}

# for i in my_dictionary:
#     if i == sync_parameter:
#         my_dictionary[i] = new_json


sync_data_apis_obj = APIRouter()

list_all_type_of_files = '/name/filelists'

list_all_export_files = '/export/indexpage'

list_all_documents_per_export_entry = '/document/listing'

view_corresponding_document = '/document/view'

update_corresponding_document = '/document/edit'


@sync_data_apis_obj.get(list_all_type_of_files)
def list_all_type_of_files(token: str = Header("token")):

    token_data = utilities.decode_jwt(token)
    if token_data['StatusCode'] == 0:
        return token_data

    final_file_list = {}
    for i in file_along_with_fields:
        if i not in final_file_list:
            final_file_list[i] = file_along_with_fields[i]['type']

    return {
        'list_of_all_type_of_files': final_file_list,
        'StatusCode': 1
    }


@sync_data_apis_obj.get(list_all_export_files)
def list_all_export_files(token: str = Header("token")):

    token_data = utilities.decode_jwt(token)
    if token_data['StatusCode'] == 0:
        return token_data

    mail_id = token_data["user_mail_id"]
    client = pymongo.MongoClient(mongo_uri)
    db = client["techxport"]

    # Check if the user already exists by User_id
    existing_user = db['user_info'].find_one(
        {"Email": mail_id})

    if existing_user:
        master_data_details = db['master_data'].find({"Email": mail_id})
        master_index_list = []
        for j in master_data_details:
            master_detail = {
                'id': str(j["_id"]),
                "shipment_number": "shipment 1",
                "product": "product 1",
                "buyer_name": "buyer 1"
            }
            master_index_list.append(master_detail)

        return {
            'index_list': master_index_list,
            'StatusCode': 1
        }
    else:
        return {
            'Status': 'No Such User Exist',
            'StatusCode': 0
        }


@sync_data_apis_obj.get(list_all_documents_per_export_entry)
def list_all_documents_per_export_entry(id: str = Form(...), token: str = Header("token")):

    token_data = utilities.decode_jwt(token)
    if token_data['StatusCode'] == 0:
        return token_data

    mail_id = token_data["user_mail_id"]
    client = pymongo.MongoClient(mongo_uri)
    db = client["techxport"]

    # Check if the user already exists by User_id
    existing_user = db['user_info'].find_one(
        {"Email": mail_id})

    document_id = ObjectId(id)

    if existing_user:
        master_data_details = db['master_data'].find(
            {"Email": mail_id, "_id": document_id})
        document_list_per_export_record = []
        remove_data_from_list = ["_id", "Email"]
        for j in master_data_details:
            document_list_per_export_record = j.keys()

        final_document_list_per_export_entry = list(
            set(document_list_per_export_record) - set(remove_data_from_list))
        final_document_list_per_export_entry = [
            j.replace("_", " ").title() for j in final_document_list_per_export_entry]
        return {
            'document_list_per_export_record': final_document_list_per_export_entry,
            'StatusCode': 1
        }
    else:
        return {
            'Status': 'No Such User Exist',
            'StatusCode': 0
        }


@sync_data_apis_obj.post(view_corresponding_document)
def view_corresponding_document(id: str = Form(...), file_name: str = Form(...), token: str = Header("token")):

    token_data = utilities.decode_jwt(token)
    if token_data['StatusCode'] == 0:
        return token_data

    mail_id = token_data["user_mail_id"]
    client = pymongo.MongoClient(mongo_uri)
    db = client["techxport"]

    # Check if the user already exists by User_id
    existing_user = db['user_info'].find_one(
        {"Email": mail_id})

    document_id = ObjectId(id)
    file_name = file_name.replace(" ", "_").lower()

    if existing_user:
        master_data_details = db['master_data'].find(
            {"Email": mail_id, "_id": document_id})

        for j in master_data_details:
            document_data = j[file_name]

        return {
            'document_data': document_data,
            'StatusCode': 1
        }
    else:
        return {
            'Status': 'No Such User Exist',
            'StatusCode': 0
        }


@sync_data_apis_obj.put(update_corresponding_document)
def update_corresponding_document(id: str = Form(...), file_name: str = Form(...), data: str = Form(...), token: str = Header("token")):

    token_data = utilities.decode_jwt(token)
    if token_data['StatusCode'] == 0:
        return token_data

    mail_id = token_data["user_mail_id"]
    client = pymongo.MongoClient(mongo_uri)
    db = client["techxport"]

    # Check if the user already exists by User_id
    existing_user = db['user_info'].find_one(
        {"Email": mail_id})

    document_id = ObjectId(id)
    file_name = file_name.replace(" ", "_").lower()

    data = json.loads(data)
    # print(type(data))

    if existing_user:
        master_data_details = db['master_data'].find(
            {"Email": mail_id, "_id": document_id})

        for j in master_data_details:
            j[file_name] = data

            #  Update the 'file_name' field with new data
            db['master_data'].update_one(
                {"_id": j['_id']},
                {"$set": {file_name: data}}
            )

        return {
            'Status': "data updated successfully",
            'StatusCode': 1
        }
    else:
        return {
            'Status': 'No Such User Exist',
            'StatusCode': 0
        }
