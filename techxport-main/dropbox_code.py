import dropbox
import credentials
from dropbox.exceptions import AuthError


def upload_to_dropbox(local_file_path):
    # Define your access token
    access_token = credentials.dropbox_access_token

    # Initialize Dropbox client
    # https://www.dropbox.com/developers/apps
    dbx = dropbox.Dropbox(access_token)

    file_name_list = local_file_path.split('/')

    file_name = file_name_list[len(file_name_list) - 1]

    remote_dropbox_path = f'/techxport/{file_name}'

    # Upload the image to Dropbox
    try:
        with open(local_file_path, 'rb') as f:
            dbx.files_upload(f.read(), remote_dropbox_path,
                             mode=dropbox.files.WriteMode.overwrite)

        print(f"Image uploaded to Dropbox: {remote_dropbox_path}")
        # Generate a shared link for the uploaded file
        shared_link = dbx.sharing_create_shared_link(remote_dropbox_path)

        # Extract the direct download link
        download_link = shared_link.url.replace("dl=0", "dl=1")
        print(f"Downloadable link: {download_link}")
        return download_link

    except AuthError as e:
        print(f"Authentication failed: {e}")
    except Exception as e:
        print(f"An error occurred: {e}")
