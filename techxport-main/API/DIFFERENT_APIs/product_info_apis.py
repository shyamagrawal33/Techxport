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


product_info_related_apis_obj = APIRouter()

product_info_route_path = '/product/info'


@product_info_related_apis_obj.get(product_info_route_path)
def get_product_info_api(token: str = Header("token")):

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
        product_info_details = db['product_info'].find(
            {"mail_id": mail_id})

        final_product_list = []
        for j in product_info_details:
            product_detail = {
                'id': str(j["_id"]),
                "hc_code": j['product_data']["hc_code"],
                "description": j['product_data']["description"],
                "unit_of_measurement": j['product_data']["unit_of_measurement"],
                "net_weight": j['product_data']["net_weight"],
                "gross_weight": j['product_data']["gross_weight"],
                "number_of_packages": j['product_data']["number_of_packages"],
                "optionalField": j['product_data']["optionalField"]
            }
            final_product_list.append(product_detail)
        return {
            'all_product_details': final_product_list,
            'StatusCode': 1
        }
    else:
        return {
            'Status': 'No Such User Exist',
            'StatusCode': 0
        }


@product_info_related_apis_obj.post(product_info_route_path)
async def create_product_info_api(hc_code: str = Form(...), description: str = Form(...), unit_of_measurement: str = Form(...), net_weight: str = Form(...), gross_weight: str = Form(...), number_of_packages: int = Form(...), optionalField: str = Form(...), token: str = Header("token")):

    token_data = utilities.decode_jwt(token)
    if token_data['StatusCode'] == 0:
        return token_data

    mail_id = token_data["user_mail_id"]
    # print(optionalField)

    client = pymongo.MongoClient(mongo_uri)
    db = client["techxport"]

    existing_user = db['user_info'].find_one(
        {"Email": mail_id})

    if existing_user:
        client = pymongo.MongoClient(mongo_uri)
        db = client["techxport"]

        collection_name = "product_info"

        # Dynamic JSON data to be saved (without an explicit _id field)
        dynamic_json_data = {
            "mail_id": mail_id,
            "product_data":
                {
                    "hc_code": hc_code,
                    "description": description,
                    "unit_of_measurement": unit_of_measurement,
                    "net_weight": net_weight,
                    "gross_weight": gross_weight,
                    "number_of_packages": number_of_packages,
                    "optionalField": optionalField
                }
        }

        # Insert the dynamic JSON data into MongoDB, let MongoDB generate the _id
        db[collection_name].insert_one(dynamic_json_data)
        return {
            'Status': 'Product info added Successfully',
            'StatusCode': 1
        }
    else:
        return {
            'Status': 'No Such User Exist',
            'StatusCode': 0
        }


@product_info_related_apis_obj.put(product_info_route_path)
async def update_product_info_api(id: str = Form(...), hc_code: str = Form(...), description: str = Form(...), unit_of_measurement: str = Form(...), net_weight: str = Form(...), gross_weight: str = Form(...), number_of_packages: int = Form(...), optionalField: str = Form(...), token: str = Header("token")):

    token_data = utilities.decode_jwt(token)
    if token_data['StatusCode'] == 0:
        return token_data

    mail_id = token_data["user_mail_id"]

    client = pymongo.MongoClient(mongo_uri)
    db = client["techxport"]

    existing_user = db['user_info'].find_one(
        {"Email": mail_id})

    if existing_user:
        client = pymongo.MongoClient(mongo_uri)
        db = client["techxport"]

        collection_name = "product_info"
        target_id = ObjectId(id)

        # Dynamic JSON data to be saved (without an explicit _id field)
        only_product_data = {
            "hc_code": hc_code,
            "description": description,
            "unit_of_measurement": unit_of_measurement,
            "net_weight": net_weight,
            "gross_weight": gross_weight,
            "number_of_packages": number_of_packages,
            "optionalField": optionalField
        }

        dynamic_json_data = {
            "mail_id": mail_id,
            "product_data": only_product_data
        }

        db[collection_name].update_one(
            {"_id": target_id}, {"$set": dynamic_json_data})
        return {
            'Status': 'Product info updated Successfully',
            'StatusCode': 1
        }
    else:
        return {
            'Status': 'No Such User Exist',
            'StatusCode': 0
        }


@product_info_related_apis_obj.delete(product_info_route_path)
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

        collection_name = "product_info"
        for id in ids:
            target_id = ObjectId(id)

            result = db[collection_name].delete_one({"_id": target_id})

        if result.deleted_count == 1:
            return {
                'Status': 'Product deleted Successfully',
                'StatusCode': 1
            }
        else:
            return {
                'Status': 'Product Not Found',
                'StatusCode': 0
            }

    else:
        return {
            'Status': 'No Such User Exist',
            'StatusCode': 0
        }
