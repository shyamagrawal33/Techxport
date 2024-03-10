from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

uri = "mongodb+srv://vsah1396:tfO1AjUt7FOcvVXV@techxport.d9jtc8n.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp"

# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))

# Send a ping to confirm a successful connection
try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)
    
    
 
1. Shipment Information
Shipment Reference

Invoice Number
Buyers Reference

Method of Dispatch
Type of Shipment
Port of Loading
Port of discharge
Final Destination
Country of Origin of Goods
Country of Final Destination
Place of Receipt
Pre-Carrage By
2. Parties
Exporter
Consignee
Buyer if not Consignee
Logistics Provider

Freight Forwarder

Carrier
Notify Party
3. Shipping Details
Date of Departure (ETD)
Est. Time of Arrival (ETA)
Vessel / Aircraft / Vehicle
Voyage / Flight Number
Bill of Lading Number
Export Declaration Number
Document Instructions
Freight Charges
Marine Cover Policy No.
Does this shipment contain Hazardous / Dangerous goods?
Is the shipment on a Letter of Credit?
Letter of Credit No.
Special Instructions (to the Freight Forwarder or Carrier)