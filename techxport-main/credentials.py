
secret_key = 'techxport_sceret_key'

# Credentials for  Mail Server


class mail_credentials:
    mail_username = 'vipul.shah@aurigait.com'   # <Your mail id>
    mail_password = 'xysn jyfo ahql zmmp'   # <Your mail password>
    mail_server = 'smtp.gmail.com'   # <Your mail server name>
    mail_port = 587  # <Your mail server port number>
    mail_use_tls = False  # Currently not in use
    mail_use_ssl = True  # Currently not in use


# Create object for class 'mysql_credentials':
mail_credential_obj = mail_credentials

dropbox_access_token = 'sl.BmL9vFKGwtiP6jx_FjdM7kNubAoJvM2Fr-7aiqNduxmNNLzsfham2USTszlHTUf3xq8PfHc4Uh31HanmGmXuLvW8gYxofzV9KlwZBAmLZgQy7z8Ae8DrcVz4Amlr9o1VpuPGzXe7pDaoKgA'

mongo_uri = "mongodb://localhost:27017/"

# mongo_uri = "mongodb+srv://vsah1396:tfO1AjUt7FOcvVXV@techxport.d9jtc8n.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp"


# AWS credentials and region configuration
class aws_credentials:
    aws_access_key_id = 'AKIAUAUV2QNCQGUC7KGU'
    aws_secret_access_key = '2P7uatrUfQDl+B6tERQb91U4ZKHnnjH/BNpvSLld'
    aws_region = 'us-east-2'   # Change to your desired AWS region


fixed_file = 'Master File'

file_along_with_fields = {"Master File": {'type': 'permanent', 'fields': []},
                          "Tax Invoice": {'type': 'changeable', 'fields': []},
                          "Sales Contract": {'type': 'changeable', 'fields': []},
                          "Packing List": {'type': 'changeable', 'fields': []}}

