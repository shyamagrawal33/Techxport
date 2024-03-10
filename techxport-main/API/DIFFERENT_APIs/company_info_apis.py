from fastapi import APIRouter, Header, Form, File, UploadFile
from typing import List
import json
import jwt
import os
import utilities
import pymongo
import pycountry
# import dropbox_code
from credentials import mongo_uri
from awsHelper import upload_to_aws, download_from_s3


company_info_related_apis_obj = APIRouter()
dropdown_specific_apis_obj = APIRouter()


company_info_route_path = '/company/info'
company_download_info_route_path = '/download/company/info'


@company_info_related_apis_obj.get(company_info_route_path)
def get_company_info_api(token: str = Header("token")):
    # print(token)
    token_data = utilities.decode_jwt(token)
    if token_data['StatusCode'] == 0:
        return token_data

    mail_id = token_data["user_mail_id"]
    client = pymongo.MongoClient(mongo_uri)
    db = client["techxport"]

    # Check if the user already exists by User_id
    existing_user = db['company_info'].find_one(
        {"Email": mail_id})

    # print(existing_user)
    if existing_user:
        # Sample company detail information
        company_detail = {
            'company_name': existing_user['Company_name'],
            'iec_code': existing_user['Iec_code'],
            'email': mail_id,
            'mobile': existing_user['Mobile'],
            'address': existing_user['Address'],
            'city': existing_user['City'],
            'state': existing_user['State'],
            'pincode': existing_user['Pincode'],
            'county': existing_user['County'],
            'pancard': existing_user['Pancard'],
            'gstno': existing_user['Gstno']
        }
        return {
            'company_detail': company_detail,
            'StatusCode': 1
        }
    else:
        return {
            'Status': 'No Such User Exist',
            'StatusCode': 0
        }


@company_info_related_apis_obj.post(company_info_route_path)
def company_info_api(company_name: str = Form(...), iec_code: str = Form(...), mobile: str = Form(...), address: str = Form(...), city: str = Form(...), state: str = Form(...), county: str = Form(...), pincode: str = Form(...), pancard: UploadFile = File(...), gstno: UploadFile = File(...), token: str = Header("token")):

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

    if 'pan_folder' in all_files_folder_lst:
        if os.path.isdir(os.getcwd()+f"/pan_folder/{username}"):
            pass
        else:
            os.mkdir(os.getcwd() + f"/pan_folder/{username}")
    else:
        os.mkdir(os.getcwd()+f"/pan_folder")
        os.mkdir(os.getcwd()+f"/pan_folder/{username}")

    if 'gst_folder' in all_files_folder_lst:
        if os.path.isdir(os.getcwd()+f"/gst_folder/{username}"):
            pass
        else:
            os.mkdir(os.getcwd() + f"/gst_folder/{username}")
    else:
        os.mkdir(os.getcwd()+f"/gst_folder")
        os.mkdir(os.getcwd()+f"/gst_folder/{username}")

    # Check if the user already exists by User_id
    existing_user = db['company_info'].find_one(
        {"Email": mail_id})

    try:
        aws_gst_doc_path = f"/gst_folder/{username}/{gstno.filename}"
        with open(os.getcwd() + aws_gst_doc_path, "wb") as f:
            f.write(gstno.file.read())

        # print(os.getcwd() + aws_gst_doc_path)
        res = upload_to_aws(aws_gst_doc_path)
        if res['StatusCode'] == 1:
            os.remove(os.getcwd() + aws_gst_doc_path)
    except:
        pass

    try:
        aws_pan_doc_path = f"/pan_folder/{username}/{pancard.filename}"
        with open(os.getcwd() + aws_pan_doc_path, "wb") as f:
            f.write(pancard.file.read())

        # print(os.getcwd() + aws_pan_doc_path)
        res = upload_to_aws(aws_pan_doc_path)
        if res['StatusCode'] == 1:
            os.remove(os.getcwd() + aws_pan_doc_path)
    except:
        pass

    if existing_user:
        client = pymongo.MongoClient(mongo_uri)
        db = client["techxport"]

        collection_name = "company_info"

        filter_condition = {"Email": mail_id}
        update_operation = {
            "$set": {
                'Company_name': company_name,
                'Iec_code': iec_code,
                'Mobile': mobile,
                'Address': address,
                'City': city,
                'State': state,
                'Pincode': pincode,
                'County': county,
                'Pancard': aws_pan_doc_path,
                'Gstno': aws_gst_doc_path
            }
        }

        result = db[collection_name].update_many(
            filter_condition, update_operation)
        return {
            'Status': 'Company info updated Successfully',
            'StatusCode': 1
        }
    else:

        # Sample company detail information
        company_detail = {
            'Company_name': company_name,
            'Iec_code': iec_code,
            'Email': mail_id,
            'Mobile': mobile,
            'Address': address,
            'City': city,
            'State': state,
            'Pincode': pincode,
            'County': county,
            'Pancard': aws_pan_doc_path,
            'Gstno': aws_gst_doc_path
        }

        db['company_info'].insert_one(company_detail)
        return {
            'Status': 'Company info added Successfully',
            'StatusCode': 1
        }


@company_info_related_apis_obj.post(company_download_info_route_path)
def download_company_info_api(filename: str = Form(...), token: str = Header("token")):
    token_data = utilities.decode_jwt(token)
    if token_data['StatusCode'] == 0:
        return token_data

    mail_id = token_data["user_mail_id"]
    client = pymongo.MongoClient(mongo_uri)
    db = client["techxport"]

    # Check if the user already exists by User_id
    existing_user = db['company_info'].find_one(
        {"Email": mail_id})

    folder_type = filename.split('/')[1]
    username = filename.split('/')[2]
    file_name = filename.split('/')[3]

    # all folder append into a list:
    all_files_folder_lst = [var for var in os.listdir(
        os.getcwd()) if os.path.isdir(os.getcwd() + '/' + var)]
    # print(all_files_folder_lst)

    if folder_type in all_files_folder_lst:
        if os.path.isdir(os.getcwd()+f"/{folder_type}/{username}"):
            pass
        else:
            os.mkdir(os.getcwd() + f"/{folder_type}/{username}")
    else:
        os.mkdir(os.getcwd()+f"/{folder_type}")
        os.mkdir(os.getcwd()+f"/{folder_type}/{username}")

    # print(filename)
    download_from_s3(filename)

    if existing_user:
        return {
            'file_path': os.getcwd() + filename,
            'StatusCode': 1
        }
    else:
        return {
            'Status': 'No Such User Exist',
            'StatusCode': 0
        }


@dropdown_specific_apis_obj.get('/countries')
def get_all_countries_api(token: str = Header("token")):
    # print(token)
    token_data = utilities.decode_jwt(token)
    if token_data['StatusCode'] == 0:
        return token_data

    all_countries = list(pycountry.countries)

    country_names = [country.name for country in all_countries]

    return {
        'country_names': country_names,
        'StatusCode': 1
    }



@dropdown_specific_apis_obj.get('/country/states')
def get_specific_group_of_states_api(country_name: str, token: str = Header("token")):
    # print(token)
    token_data = utilities.decode_jwt(token)
    if token_data['StatusCode'] == 0:
        return token_data

    country = pycountry.countries.get(name=country_name)

    if country:
        # Access the subdivisions (states) of the country
        subdivisions = pycountry.subdivisions.get(
            country_code=country.alpha_2)

        if subdivisions:
            # Extract and print the names of the subdivisions
            state_names = [
                subdivision.name for subdivision in subdivisions]

            print(len(state_names))
            return {
                'company_detail': state_names.sort(),
                'StatusCode': 1
            }
        else:
            print("No subdivisions found for this country.")
            return {
                'Status': 'No subdivisions found for this country.',
                'StatusCode': 0
            }
    else:
        print("Country not found.")
        return {
            'Status': 'No Country was provided in input.',
            'StatusCode': 0
        }