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
    client = pymongo.MongoClient(mongo_uri)
    db = client["techxport"]
    forms_data = db['forms_data'].find_one({},{"_id":0})

    if forms_data:
        return {
            'Status': 'Success',
            'StatusCode': 1,
            'forms_data': forms_data
        }
    else:
        return {
            'Status': 'No Such User Exist',
            'StatusCode': 0
        }