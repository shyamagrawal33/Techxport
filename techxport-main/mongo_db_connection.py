import pymongo
from credentials import mongo_uri


client = pymongo.MongoClient(mongo_uri)
db = client["techxport"]

# Define the collection name
collection_name = "user_info"
# Check if the collection exists
if collection_name not in db.list_collection_names():
    # Create the collection and define the schema
    db.create_collection(collection_name)

    # Define the schema validation options
    schema = {
        'User_id': {'bsonType': 'string'},
        'Username': {'bsonType': 'string'},
        'Email': {'bsonType': 'string'},
        'Password': {'bsonType': 'string'},
        'Otp': {'bsonType': 'string'},
        'Email_verified': {'bsonType': 'string'},
        'Created_date': {'bsonType': 'string'},
        'Updated_date': {'bsonType': 'string'}
    }

    # Create the schema validation
    db.command({
        'collMod': collection_name,
        'validator': {
            '$jsonSchema': {
                'bsonType': 'object',
                'required': list(schema.keys()),
                'properties': schema
            }
        }
    })

# Define the collection name
collection_name = "company_info"
# Check if the collection exists
if collection_name not in db.list_collection_names():
    # Create the collection and define the schema
    db.create_collection(collection_name)

    # Define the schema validation options
    schema = {
        'Company_name': {'bsonType': 'string'},
        'Iec_code': {'bsonType': 'string'},
        'Email': {'bsonType': 'string'},
        'Mobile': {'bsonType': 'string'},
        'Address': {'bsonType': 'string'},
        'City': {'bsonType': 'string'},
        'State': {'bsonType': 'string'},
        'Pincode': {'bsonType': 'string'},
        'County': {'bsonType': 'string'},
        'Pancard': {'bsonType': 'string'},
        'Gstno': {'bsonType': 'string'}
    }

    # Create the schema validation
    db.command({
        'collMod': collection_name,
        'validator': {
            '$jsonSchema': {
                'bsonType': 'object',
                'required': list(schema.keys()),
                'properties': schema
            }
        }
    })

# Close the MongoDB connection
client.close()
