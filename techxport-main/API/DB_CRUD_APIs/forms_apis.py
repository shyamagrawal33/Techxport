# Import Modules
import pymongo
from fastapi import APIRouter, Header
from credentials import mongo_uri
import utilities

forms_apis_obj = APIRouter()

@forms_apis_obj.get('/forms')
def getForms(token: str = Header("token")):
    token_data = utilities.decode_jwt(token)
    if token_data['StatusCode'] == 0:
        return token_data
    
    mail_id = token_data["user_mail_id"]
    client = pymongo.MongoClient(mongo_uri)
    db = client["techxport"]
    existing_user = db['user_info'].find_one(
        {"Email": mail_id})
    
    if existing_user:
        forms_data = db['forms_data'].find(
            {"mail_id": mail_id})

        final_forms_list = []
        for j in forms_data:
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
            final_forms_list.append(product_detail)
        return {
            'forms_details': final_forms_list,
            'StatusCode': 1
        }
    else:
        return {
            'Status': 'No Such User Exist',
            'StatusCode': 0
        }