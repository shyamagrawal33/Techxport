import boto3
import botocore
import os
from credentials import aws_credentials

# path = "/gst_folder/vsah1396/Actual-format.png"


def upload_to_aws(path):
    try:
        bucket_name = 'techxport'
        s3 = boto3.client('s3', aws_access_key_id=aws_credentials.aws_access_key_id,
                          aws_secret_access_key=aws_credentials.aws_secret_access_key, region_name=aws_credentials.aws_region)

        folder_type = path.split('/')[1]
        username = path.split('/')[2]
        file_name = path.split('/')[3]
        user_folder = f'{folder_type}/{username}/{file_name}'
        file_to_upload = os.getcwd() + '/' + user_folder

        print(user_folder)
        print(file_to_upload)

        s3.upload_file(file_to_upload, bucket_name, user_folder)

        return {
            'Status': "Success",
            'StatusCode': 1,
            'user_mail_id': "File uploaded successfully"
        }
    except:
        return {
            'StatusCode': 0,
            'user_mail_id': "AWS Issue"
        }

# print(upload_to_aws(path))


def download_from_s3(path):
    try:
        bucket_name = 'techxport'
        s3 = boto3.client('s3', aws_access_key_id=aws_credentials.aws_access_key_id,
                          aws_secret_access_key=aws_credentials.aws_secret_access_key, region_name=aws_credentials.aws_region)

        folder_type = path.split('/')[1]
        username = path.split('/')[2]
        file_name = path.split('/')[3]
        user_folder = f'{folder_type}/{username}/{file_name}'

        local_file_path = os.getcwd() + '/' + user_folder

        # Create the full S3 key (object key) including the folders
        s3_key = f'{folder_type}/{username}/{file_name}'

        try:
            s3.download_file(bucket_name, s3_key, local_file_path)
            print(f'File downloaded successfully to {local_file_path}')

            return {
                'Status': "Success",
                'StatusCode': 1,
                'user_mail_id': "File downloaded successfully"
            }
        except botocore.exceptions.NoCredentialsError:
            print('AWS credentials not found. Please configure your AWS credentials.')
        except botocore.exceptions.ClientError as e:
            if e.response['Error']['Code'] == "404":
                print(
                    f'The file with key {s3_key} does not exist in the S3 bucket.')
            else:
                print(f'Error: {str(e)}')
        except Exception as e:
            print(f'Error: {str(e)}')
    except:
        return {
            'StatusCode': 0,
            'user_mail_id': "AWS Issue"
        }
