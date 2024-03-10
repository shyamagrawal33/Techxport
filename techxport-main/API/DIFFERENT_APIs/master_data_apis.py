from fastapi import APIRouter, Header, Form, File, UploadFile
from typing import List
import json
import jwt
import os
import utilities
import pymongo
import dropbox_code
from credentials import mongo_uri
import ast
from Schemas_for_data.schema_db_master_data import MasterForm, FilesToBeProcessed
import uuid
from pprint import pprint
from bson import ObjectId

master_data_info_related_apis_obj = APIRouter()

master_data_preview_path = '/preview/data'
master_data_info_route_path = '/save/master/data'
update_export_data_info_route_path = '/update/export/data'


@master_data_info_related_apis_obj.post(master_data_preview_path)
def get_master_data_info_api(jsonData: FilesToBeProcessed, token: str = Header("token")):
    try:
        token_data = utilities.decode_jwt(token)
        if token_data['StatusCode'] == 0:
            return token_data

        mail_id = token_data["user_mail_id"]

        list_of_files = jsonData.dict()['list_of_of_files']
        # ['Master File', 'Tax Invoice', 'Sales Contract', 'Packing List']

        final_data_dict = {}
        for file_name in list_of_files:

            if file_name.lower().replace(" ", "_") == "master_file":
                json_data = [
                    {
                        "type": "Shipment Information",
                        "value":
                        [
                            {
                                "label": "Shipment Reference",
                                "type": "text",
                                "value": ""
                            },
                            {
                                "label": "Invoice Number",
                                "type": "text",
                                "value": ""
                            },
                            {
                                "label": "Buyers Reference",
                                "type": "text",
                                "value": ""
                            },
                            {
                                "label": "Incoterm© 2020",
                                "type": "select",
                                "value": "",
                                "options":
                                [
                                    {
                                        "value": "dummy1",
                                        "label": "dummy1"
                                    },
                                    {
                                        "value": "dummy2",
                                        "label": "dummy2"
                                    }
                                ]
                            },
                            {
                                "label": "Place",
                                "type": "text",
                                "value": ""
                            },
                            {
                                "label": "Method of Dispatch",
                                "type": "select",
                                "value": "",
                                "options":
                                [
                                    {
                                        "value": "dummy1",
                                        "label": "dummy1"
                                    },
                                    {
                                        "value": "dummy2",
                                        "label": "dummy2"
                                    }
                                ]
                            },
                            {
                                "label": "Type of Shipment",
                                "type": "select",
                                "value": "",
                                "options":
                                [
                                    {
                                        "value": "dummy1",
                                        "label": "dummy1"
                                    },
                                    {
                                        "value": "dummy2",
                                        "label": "dummy2"
                                    }
                                ]
                            },
                            {
                                "label": "Port of Loading",
                                "type": "select",
                                "value": "",
                                "options":
                                [
                                    {
                                        "value": "dummy1",
                                        "label": "dummy1"
                                    },
                                    {
                                        "value": "dummy2",
                                        "label": "dummy2"
                                    }
                                ]
                            },
                            {
                                "label": "Port of discharge",
                                "type": "select",
                                "value": "",
                                "options":
                                [
                                    {
                                        "value": "dummy1",
                                        "label": "dummy1"
                                    },
                                    {
                                        "value": "dummy2",
                                        "label": "dummy2"
                                    }
                                ]
                            },
                            {
                                "label": "Final Destination",
                                "type": "select",
                                "value": "",
                                "options":
                                [
                                    {
                                        "value": "dummy1",
                                        "label": "dummy1"
                                    },
                                    {
                                        "value": "dummy2",
                                        "label": "dummy2"
                                    }
                                ]
                            },
                            {
                                "label": "Country of Origin of Goods",
                                "type": "select",
                                "value": "",
                                "options":
                                [
                                    {
                                        "value": "dummy1",
                                        "label": "dummy1"
                                    },
                                    {
                                        "value": "dummy2",
                                        "label": "dummy2"
                                    }
                                ]
                            },
                            {
                                "label": "Country of Final Destination",
                                "type": "select",
                                "value": "",
                                "options":
                                [
                                    {
                                        "value": "dummy1",
                                        "label": "dummy1"
                                    },
                                    {
                                        "value": "dummy2",
                                        "label": "dummy2"
                                    }
                                ]
                            },
                            {
                                "label": "Place of Receipt",
                                "type": "select",
                                "value": "",
                                "options":
                                [
                                    {
                                        "value": "dummy1",
                                        "label": "dummy1"
                                    },
                                    {
                                        "value": "dummy2",
                                        "label": "dummy2"
                                    }
                                ]
                            },
                            {
                                "label": "Pre-Carrage By",
                                "type": "select",
                                "value": "",
                                "options":
                                [
                                    {
                                        "value": "dummy1",
                                        "label": "dummy1"
                                    },
                                    {
                                        "value": "dummy1",
                                        "label": "dummy2"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "type": "Parties",
                        "value":
                        [
                            {
                                "label": "Exporter",
                                "type": "select",
                                "value": "contactAPI",
                                "placeholder": "Find or add a contact",
                                "options": []
                            },
                            {
                                "label": "Consignee",
                                "type": "select",
                                "value": "contactAPI",
                                "placeholder": "Find or add a contact",
                                "options": []
                            },
                            {
                                "label": "Buyer if not Consignee",
                                "type": "select",
                                "value": "contactAPI",
                                "placeholder": "Find or add a contact",
                                "options": []
                            },
                            {
                                "label": "Logistics Provider",
                                "needRadio": True,
                                "radioOption":
                                [
                                    {
                                        "value": "Freight Forwarder"
                                    },
                                    {
                                        "value": "Carrier"
                                    }
                                ],
                                "type": "select",
                                "value": "contactAPI",
                                "placeholder": "Find or add a contact",
                                "options": []
                            },
                            {
                                "label": "Notify Party",
                                "type": "select",
                                "value": "contactAPI",
                                "placeholder": "Find or add a contact",
                                "options": []
                            }
                        ]
                    },
                    {
                        "type": "Shipping Details",
                        "value":
                        [
                            {
                                "label": "Date of Departure (ETD)",
                                "type": "date"
                            },
                            {
                                "label": "Est. Time of Arrival (ETA)",
                                "type": "date"
                            },
                            {
                                "label": "Vessel / Aircraft / Vehicle",
                                "type": "text",
                                "value": ""
                            },
                            {
                                "label": "Voyage / Flight Number",
                                "type": "text",
                                "value": ""
                            },
                            {
                                "label": "Bill of Lading Number",
                                "type": "text",
                                "value": ""
                            },
                            {
                                "label": "Export Declaration Number",
                                "type": "text",
                                "value": ""
                            },
                            {
                                "label": "Document Instructions",
                                "type": "select",
                                "value": "test1",
                                "options":
                                [
                                    {
                                        "value": "Originals",
                                        "label": "Originals"
                                    },
                                    {
                                        "value": "Express Release/Waybill",
                                        "label": "Express Release/Waybill"
                                    },
                                    {
                                        "value": "Telex Release",
                                        "label": "Telex Release"
                                    }
                                ]
                            },
                            {
                                "label": "Freight Charges",
                                "type": "select",
                                "value": "",
                                "options":
                                [
                                    {
                                        "value": "Prepaid",
                                        "label": "Prepaid"
                                    },
                                    {
                                        "value": "Collect",
                                        "label": "Collect"
                                    }
                                ]
                            },
                            {
                                "label": "Marine Cover Policy No.",
                                "type": "text",
                                "value": ""
                            },
                            {
                                "label": "Does this shipment contain Hazardous / Dangerous goods?",
                                "type": "select",
                                "value": "",
                                "options":
                                [
                                    {
                                        "value": "Yes",
                                        "label": "Yes"
                                    },
                                    {
                                        "value": "No",
                                        "label": "No"
                                    }
                                ]
                            },
                            {
                                "label": "Is the shipment on a Letter of Credit?",
                                "type": "select",
                                "value": "",
                                "options":
                                [
                                    {
                                        "value": "Yes",
                                        "label": "Yes"
                                    },
                                    {
                                        "value": "No",
                                        "label": "No"
                                    }
                                ]
                            },
                            {
                                "label": "Letter of Credit No.",
                                "type": "text",
                                "value": "",
                                "isDisabled": True
                            },
                            {
                                "label": "Special Instructions (to the Freight Forwarder or Carrier)",
                                "type": "text",
                                "value": ""
                            }
                        ]
                    }
                ]

                final_data_dict["master_file"] = json_data

            elif file_name.lower().replace(" ", "_") == 'sales_contract':
                json_data = [
                    {
                        "type": "SALES CONTRACT",
                        "value":
                        [
                            {
                                "label": "Seller",
                                "type": "text",
                                "value": "",
                                "placeholder": "Find or add a contact",
                                "options": [],
                                "optionfrom": "contactAPI"
                            },
                            {
                                "label": "Pages",
                                "type": "Pages",
                                "value": ""
                            },
                            {
                                "label": "Invoice Number",
                                "type": "text",
                                "value": ""
                            },
                            {
                                "label": "Date",
                                "type": "Date",
                                "value": ""
                            },
                            {
                                "label": "Buyer",
                                "type": "select",
                                "value": "",
                                "placeholder": "Find or add a contact",
                                "options": [],
                                "optionfrom": "contactAPI"
                            },
                            {
                                "label": "Delivery Date",
                                "type": "Date",
                                "value": ""
                            },
                            {
                                "label": "Method Of Dispatch",
                                "type": "select",
                                "value": "",
                                "options":
                                [
                                    {
                                        "id": 2,
                                        "value": "dummy1",
                                        "label": "dummy1"
                                    },
                                    {
                                        "id": 3,
                                        "value": "dummy2",
                                        "label": "dummy2"
                                    },
                                    {
                                        "id": 4,
                                        "value": "dummy3",
                                        "label": "dummy3"
                                    }
                                ]
                            },
                            {
                                "label": "Type of Shipment",
                                "type": "text",
                                "value": ""
                            },
                            {
                                "label": "Port of Loading",
                                "type": "select",
                                "value": "",
                                "options": []
                            },
                            {
                                "label": "Port of Discharge",
                                "type": "select",
                                "value": "",
                                "options": []
                            },
                            {
                                "label": "Terms / Method of payment",
                                "type": "textarea",
                                "value": ""
                            },
                            {
                                "header":
                                [
                                    "Product Code",
                                    "Description of Goods",
                                    "Unit Quantity",
                                    "Unit Type",
                                    "Price",
                                    "Amount"
                                ],
                                "value":
                                [
                                    [
                                        {
                                            "type": "text",
                                            "value": "",
                                            "placeholder": "Add product",
                                            "options": [],
                                            "optionfrom": "productAPI"
                                        },
                                        {
                                            "type": "text",
                                            "value": ""
                                        },
                                        {
                                            "type": "number",
                                            "value": "0"
                                        },
                                        {
                                            "type": "text",
                                            "value": ""
                                        },
                                        {
                                            "type": "text",
                                            "value": "0.00"
                                        },
                                        {
                                            "type": "text",
                                            "value": "",
                                            "disabled": True
                                        }
                                    ]
                                ]
                            },
                            {
                                "label": "Conditions",
                                "type": "textarea",
                                "value": ""
                            },
                            {
                                "label": "Bank Details",
                                "type": "textarea",
                                "value": ""
                            },
                            {
                                "label": "Incoterm"
                            },
                            {
                                "type": "select",
                                "value": "",
                                "options": []
                            },
                            {
                                "type": "text",
                                "value": ""
                            },
                            {
                                "label": "Currency",
                                "type": "select",
                                "value": "INR",
                                "options": []
                            },
                            {
                                "label": "Signatory Company",
                                "type": "text",
                                "value": ""
                            },
                            {
                                "label": "Name of Authorized Signatory"
                            },
                            {
                                "placeholder": "First Name",
                                "type": "text",
                                "value": ""
                            },
                            {
                                "placeholder": "Last Name",
                                "type": "text",
                                "value": ""
                            },
                            {
                                "label": "Signature"
                            },
                            {
                                "placeholder": "",
                                "type": "file",
                                "value": ""
                            },
                            {
                                "label": "Add Charge or discount",
                                "value":
                                [
                                    [
                                        {
                                            "placeholder": "",
                                            "value": ""
                                        },
                                        {
                                            "placeholder": "",
                                            "value": 0
                                        }
                                    ]
                                ]
                            }
                        ]
                    }
                ]
                final_data_dict["sales_contract"] = json_data

            elif file_name.lower().replace(" ", "_") == 'packing_list':
                json_data = [
                    {
                        "type": "PACKING LIST",
                        "value":
                        [
                            {
                                "label": "Exporter",
                                "type": "text",
                                "value": "",
                                "placeholder": "Find or add a contact",
                                "options": [],
                                "optionfrom": "contactAPI"
                            },
                            {
                                "label": "Pages",
                                "type": "Pages",
                                "value": ""
                            },
                            {
                                "label": "Invoice Number ",
                                "type": "text",
                                "value": ""
                            },
                            {
                                "label": "Date",
                                "type": "Date",
                                "value": ""
                            },
                            {
                                "label": "Bill of Lading Number",
                                "type": "text",
                                "value": ""
                            },
                            {
                                "label": "Reference",
                                "type": "text",
                                "value": ""
                            },
                            {
                                "label": "Buyer Reference",
                                "type": "text",
                                "value": ""
                            },
                            {
                                "label": "Consignee",
                                "type": "select",
                                "value": "",
                                "placeholder": "Find or add a contact",
                                "options": [],
                                "optionfrom": "contactAPI"
                            },
                            {
                                "label": "Buyer (If not Consignee)",
                                "type": "select",
                                "value": "",
                                "placeholder": "Find or add a contact",
                                "options": [],
                                "optionfrom": "contactAPI"
                            },
                            {
                                "label": "Method Of Dispatch",
                                "type": "select",
                                "value": "",
                                "options":
                                [
                                    {
                                        "id": 2,
                                        "value": "Text Invoice",
                                        "label": "Text Invoice"
                                    },
                                    {
                                        "id": 3,
                                        "value": "Sales Contract",
                                        "label": "Sales Contract"
                                    },
                                    {
                                        "id": 4,
                                        "value": "Packing List",
                                        "label": "Packing List"
                                    }
                                ]
                            },
                            {
                                "label": "Type of Shipment",
                                "type": "text",
                                "value": ""
                            },
                            {
                                "label": "Country Of Origin of Goods",
                                "type": "select",
                                "value": "",
                                "options":
                                [
                                    {
                                        "id": 2,
                                        "value": "Text Invoice",
                                        "label": "Text Invoice"
                                    },
                                    {
                                        "id": 3,
                                        "value": "Sales Contract",
                                        "label": "Sales Contract"
                                    },
                                    {
                                        "id": 4,
                                        "value": "Packing List",
                                        "label": "Packing List"
                                    }
                                ]
                            },
                            {
                                "label": "Country of Final Destination",
                                "type": "select",
                                "value": "",
                                "options":
                                [
                                    {
                                        "id": 2,
                                        "value": "Text Invoice",
                                        "label": "Text Invoice"
                                    },
                                    {
                                        "id": 3,
                                        "value": "Sales Contract",
                                        "label": "Sales Contract"
                                    },
                                    {
                                        "id": 4,
                                        "value": "Packing List",
                                        "label": "Packing List"
                                    }
                                ]
                            },
                            {
                                "label": "Vessel / Aircraft",
                                "type": "text",
                                "value": ""
                            },
                            {
                                "label": "Voyage No",
                                "type": "text",
                                "value": ""
                            },
                            {
                                "label": "Port of Loading",
                                "type": "select",
                                "value": "",
                                "options": []
                            },
                            {
                                "label": "Date of Departure",
                                "type": "date",
                                "value": ""
                            },
                            {
                                "label": "Port of Discharge",
                                "type": "select",
                                "value": "",
                                "options": []
                            },
                            {
                                "label": "Final Destination",
                                "type": "select",
                                "value": "",
                                "options": []
                            },
                            {
                                "label": "Packing Information",
                                "type": "text",
                                "value": ""
                            },
                            {
                                "header":
                                [
                                    "Product Code",
                                    "Description of Goods",
                                    "Unit Quantity",
                                    "Kind & No of Packages",
                                    "Net Weight  (Kg)",
                                    "Gross Weight  (Kg)",
                                    "Measurements  (m³)"
                                ],
                                "value":
                                [
                                    [
                                        {
                                            "type": "text",
                                            "value": "",
                                            "placeholder": "Add product",
                                            "options": [],
                                            "optionfrom": "productAPI"
                                        },
                                        {
                                            "type": "text",
                                            "value": ""
                                        },
                                        {
                                            "type": "number",
                                            "value": "0"
                                        },
                                        {
                                            "type": "text",
                                            "value": ""
                                        },
                                        {
                                            "type": "text",
                                            "value": "0.00"
                                        },
                                        {
                                            "type": "text",
                                            "value": ""
                                        },
                                        {
                                            "type": "text",
                                            "value": ""
                                        }
                                    ]
                                ]
                            },
                            {
                                "label": "Consignment Total",
                                "value":
                                [
                                    0,
                                    0,
                                    0,
                                    0,
                                    0
                                ]
                            },
                            {
                                "label": "Additional Info",
                                "type": "textarea",
                                "value": ""
                            },
                            {
                                "label": "Signatory Company",
                                "type": "text",
                                "value": ""
                            },
                            {
                                "label": "Name of Authorized Signatory",
                                "value":
                                [
                                    {
                                        "placeholder": "First Name",
                                        "type": "text"
                                    },
                                    {
                                        "placeholder": "Last Name",
                                        "type": "text"
                                    }
                                ]
                            },
                            {
                                "label": "Signature",
                                "type": "file",
                                "value": ""
                            }
                        ]
                    }
                ]
                final_data_dict["packing_list"] = json_data

            elif file_name.lower().replace(" ", "_") == 'tax_invoice':
                json_data = [
                    {
                        "type": "PACKING LIST",
                        "value":
                        [
                            {
                                "label": "Exporter",
                                "type": "text",
                                "value": "",
                                "placeholder": "Find or add a contact",
                                "options": [],
                                "optionfrom": "contactAPI"
                            },
                            {
                                "label": "Pages",
                                "type": "Pages",
                                "value": ""
                            },
                            {
                                "label": "Invoice Number ",
                                "type": "text",
                                "value": ""
                            },
                            {
                                "label": "Date",
                                "type": "Date",
                                "value": ""
                            },
                            {
                                "label": "Bill of Lading Number",
                                "type": "text",
                                "value": ""
                            },
                            {
                                "label": "Reference",
                                "type": "text",
                                "value": ""
                            },
                            {
                                "label": "Buyer Reference",
                                "type": "text",
                                "value": ""
                            },
                            {
                                "label": "Consignee",
                                "type": "select",
                                "value": "",
                                "placeholder": "Find or add a contact",
                                "options": [],
                                "optionfrom": "contactAPI"
                            },
                            {
                                "label": "Buyer (If not Consignee)",
                                "type": "select",
                                "value": "",
                                "placeholder": "Find or add a contact",
                                "options": [],
                                "optionfrom": "contactAPI"
                            },
                            {
                                "label": "Method Of Dispatch",
                                "type": "select",
                                "value": "",
                                "options":
                                [
                                    {
                                        "id": 2,
                                        "value": "Text Invoice",
                                        "label": "Text Invoice"
                                    },
                                    {
                                        "id": 3,
                                        "value": "Sales Contract",
                                        "label": "Sales Contract"
                                    },
                                    {
                                        "id": 4,
                                        "value": "Packing List",
                                        "label": "Packing List"
                                    }
                                ]
                            },
                            {
                                "label": "Type of Shipment",
                                "type": "text",
                                "value": ""
                            },
                            {
                                "label": "Country Of Origin of Goods",
                                "type": "select",
                                "value": "",
                                "options":
                                [
                                    {
                                        "id": 2,
                                        "value": "Text Invoice",
                                        "label": "Text Invoice"
                                    },
                                    {
                                        "id": 3,
                                        "value": "Sales Contract",
                                        "label": "Sales Contract"
                                    },
                                    {
                                        "id": 4,
                                        "value": "Packing List",
                                        "label": "Packing List"
                                    }
                                ]
                            },
                            {
                                "label": "Country of Final Destination",
                                "type": "select",
                                "value": "",
                                "options":
                                [
                                    {
                                        "id": 2,
                                        "value": "Text Invoice",
                                        "label": "Text Invoice"
                                    },
                                    {
                                        "id": 3,
                                        "value": "Sales Contract",
                                        "label": "Sales Contract"
                                    },
                                    {
                                        "id": 4,
                                        "value": "Packing List",
                                        "label": "Packing List"
                                    }
                                ]
                            },
                            {
                                "label": "Vessel / Aircraft",
                                "type": "text",
                                "value": ""
                            },
                            {
                                "label": "Voyage No",
                                "type": "text",
                                "value": ""
                            },
                            {
                                "label": "Port of Loading",
                                "type": "select",
                                "value": "",
                                "options": []
                            },
                            {
                                "label": "Date of Departure",
                                "type": "date",
                                "value": ""
                            },
                            {
                                "label": "Port of Discharge",
                                "type": "select",
                                "value": "",
                                "options": []
                            },
                            {
                                "label": "Final Destination",
                                "type": "select",
                                "value": "",
                                "options": []
                            },
                            {
                                "label": "Packing Information",
                                "type": "text",
                                "value": ""
                            },
                            {
                                "header":
                                [
                                    "Product Code",
                                    "Description of Goods",
                                    "Unit Quantity",
                                    "Kind & No of Packages",
                                    "Net Weight  (Kg)",
                                    "Gross Weight  (Kg)",
                                    "Measurements  (m³)"
                                ],
                                "value":
                                [
                                    [
                                        {
                                            "type": "text",
                                            "value": "",
                                            "placeholder": "Add product",
                                            "options": [],
                                            "optionfrom": "productAPI"
                                        },
                                        {
                                            "type": "text",
                                            "value": ""
                                        },
                                        {
                                            "type": "number",
                                            "value": "0"
                                        },
                                        {
                                            "type": "text",
                                            "value": ""
                                        },
                                        {
                                            "type": "text",
                                            "value": "0.00"
                                        },
                                        {
                                            "type": "text",
                                            "value": ""
                                        },
                                        {
                                            "type": "text",
                                            "value": ""
                                        }
                                    ]
                                ]
                            },
                            {
                                "label": "Consignment Total",
                                "value":
                                [
                                    0,
                                    0,
                                    0,
                                    0,
                                    0
                                ]
                            },
                            {
                                "label": "Additional Info",
                                "type": "textarea",
                                "value": ""
                            },
                            {
                                "label": "Signatory Company",
                                "type": "text",
                                "value": ""
                            },
                            {
                                "label": "Name of Authorized Signatory",
                                "value":
                                [
                                    {
                                        "placeholder": "First Name",
                                        "type": "text"
                                    },
                                    {
                                        "placeholder": "Last Name",
                                        "type": "text"
                                    }
                                ]
                            },
                            {
                                "label": "Signature",
                                "type": "file",
                                "value": ""
                            }
                        ]
                    }
                ]
                final_data_dict["tax_invoice"] = json_data

        # final_data_dict = {"a" : "b"}
        if len(final_data_dict) > 0:
            final_data_dict["Email"] = mail_id
            client = pymongo.MongoClient(mongo_uri)
            db = client["techxport"]
            t = db['master_data'].insert_one(final_data_dict)
            if str(final_data_dict.get('_id')):

                final_data_dict['_id'] = str(final_data_dict['_id'])

                return {
                    "_id": final_data_dict['_id'],
                    "StatusCode": 1
                }
        else:
            return {
                "StatusCode": 0
            }
    except Exception as e:
        # handle e
        pass


@master_data_info_related_apis_obj.post(master_data_preview_path)
def get_unique_field_info_api(jsonData: FilesToBeProcessed, token: str = Header("token")):
    try:
        token_data = utilities.decode_jwt(token)
        if token_data['StatusCode'] == 0:
            return token_data

        mail_id = token_data["user_mail_id"]

        list_of_files = jsonData.dict()['list_of_of_files']
        # ['Master File', 'Tax Invoice', 'Sales Contract', 'Packing List']

        final_data_dict = {}
        for file_name in list_of_files:

            if file_name.lower().replace(" ", "_") == "master_file":
                json_data = [
                    {
                        "type": "Shipment Information",
                        "value":
                        [
                            {
                                "label": "Shipment Reference",
                                "type": "text",
                                "value": ""
                            },
                            {
                                "label": "Invoice Number",
                                "type": "text",
                                "value": ""
                            },
                            {
                                "label": "Buyers Reference",
                                "type": "text",
                                "value": ""
                            },
                            {
                                "label": "Incoterm© 2020",
                                "type": "select",
                                "value": "",
                                "options":
                                [
                                    {
                                        "value": "dummy1",
                                        "label": "dummy1"
                                    },
                                    {
                                        "value": "dummy2",
                                        "label": "dummy2"
                                    }
                                ]
                            },
                            {
                                "label": "Place",
                                "type": "text",
                                "value": ""
                            },
                            {
                                "label": "Method of Dispatch",
                                "type": "select",
                                "value": "",
                                "options":
                                [
                                    {
                                        "value": "dummy1",
                                        "label": "dummy1"
                                    },
                                    {
                                        "value": "dummy2",
                                        "label": "dummy2"
                                    }
                                ]
                            },
                            {
                                "label": "Type of Shipment",
                                "type": "select",
                                "value": "",
                                "options":
                                [
                                    {
                                        "value": "dummy1",
                                        "label": "dummy1"
                                    },
                                    {
                                        "value": "dummy2",
                                        "label": "dummy2"
                                    }
                                ]
                            },
                            {
                                "label": "Port of Loading",
                                "type": "select",
                                "value": "",
                                "options":
                                [
                                    {
                                        "value": "dummy1",
                                        "label": "dummy1"
                                    },
                                    {
                                        "value": "dummy2",
                                        "label": "dummy2"
                                    }
                                ]
                            },
                            {
                                "label": "Port of discharge",
                                "type": "select",
                                "value": "",
                                "options":
                                [
                                    {
                                        "value": "dummy1",
                                        "label": "dummy1"
                                    },
                                    {
                                        "value": "dummy2",
                                        "label": "dummy2"
                                    }
                                ]
                            },
                            {
                                "label": "Final Destination",
                                "type": "select",
                                "value": "",
                                "options":
                                [
                                    {
                                        "value": "dummy1",
                                        "label": "dummy1"
                                    },
                                    {
                                        "value": "dummy2",
                                        "label": "dummy2"
                                    }
                                ]
                            },
                            {
                                "label": "Country of Origin of Goods",
                                "type": "select",
                                "value": "",
                                "options":
                                [
                                    {
                                        "value": "dummy1",
                                        "label": "dummy1"
                                    },
                                    {
                                        "value": "dummy2",
                                        "label": "dummy2"
                                    }
                                ]
                            },
                            {
                                "label": "Country of Final Destination",
                                "type": "select",
                                "value": "",
                                "options":
                                [
                                    {
                                        "value": "dummy1",
                                        "label": "dummy1"
                                    },
                                    {
                                        "value": "dummy2",
                                        "label": "dummy2"
                                    }
                                ]
                            },
                            {
                                "label": "Place of Receipt",
                                "type": "select",
                                "value": "",
                                "options":
                                [
                                    {
                                        "value": "dummy1",
                                        "label": "dummy1"
                                    },
                                    {
                                        "value": "dummy2",
                                        "label": "dummy2"
                                    }
                                ]
                            },
                            {
                                "label": "Pre-Carrage By",
                                "type": "select",
                                "value": "",
                                "options":
                                [
                                    {
                                        "value": "dummy1",
                                        "label": "dummy1"
                                    },
                                    {
                                        "value": "dummy1",
                                        "label": "dummy2"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "type": "Parties",
                        "value":
                        [
                            {
                                "label": "Exporter",
                                "type": "select",
                                "value": "contactAPI",
                                "placeholder": "Find or add a contact",
                                "options": []
                            },
                            {
                                "label": "Consignee",
                                "type": "select",
                                "value": "contactAPI",
                                "placeholder": "Find or add a contact",
                                "options": []
                            },
                            {
                                "label": "Buyer if not Consignee",
                                "type": "select",
                                "value": "contactAPI",
                                "placeholder": "Find or add a contact",
                                "options": []
                            },
                            {
                                "label": "Logistics Provider",
                                "needRadio": True,
                                "radioOption":
                                [
                                    {
                                        "value": "Freight Forwarder"
                                    },
                                    {
                                        "value": "Carrier"
                                    }
                                ],
                                "type": "select",
                                "value": "contactAPI",
                                "placeholder": "Find or add a contact",
                                "options": []
                            },
                            {
                                "label": "Notify Party",
                                "type": "select",
                                "value": "contactAPI",
                                "placeholder": "Find or add a contact",
                                "options": []
                            }
                        ]
                    },
                    {
                        "type": "Shipping Details",
                        "value":
                        [
                            {
                                "label": "Date of Departure (ETD)",
                                "type": "date"
                            },
                            {
                                "label": "Est. Time of Arrival (ETA)",
                                "type": "date"
                            },
                            {
                                "label": "Vessel / Aircraft / Vehicle",
                                "type": "text",
                                "value": ""
                            },
                            {
                                "label": "Voyage / Flight Number",
                                "type": "text",
                                "value": ""
                            },
                            {
                                "label": "Bill of Lading Number",
                                "type": "text",
                                "value": ""
                            },
                            {
                                "label": "Export Declaration Number",
                                "type": "text",
                                "value": ""
                            },
                            {
                                "label": "Document Instructions",
                                "type": "select",
                                "value": "test1",
                                "options":
                                [
                                    {
                                        "value": "Originals",
                                        "label": "Originals"
                                    },
                                    {
                                        "value": "Express Release/Waybill",
                                        "label": "Express Release/Waybill"
                                    },
                                    {
                                        "value": "Telex Release",
                                        "label": "Telex Release"
                                    }
                                ]
                            },
                            {
                                "label": "Freight Charges",
                                "type": "select",
                                "value": "",
                                "options":
                                [
                                    {
                                        "value": "Prepaid",
                                        "label": "Prepaid"
                                    },
                                    {
                                        "value": "Collect",
                                        "label": "Collect"
                                    }
                                ]
                            },
                            {
                                "label": "Marine Cover Policy No.",
                                "type": "text",
                                "value": ""
                            },
                            {
                                "label": "Does this shipment contain Hazardous / Dangerous goods?",
                                "type": "select",
                                "value": "",
                                "options":
                                [
                                    {
                                        "value": "Yes",
                                        "label": "Yes"
                                    },
                                    {
                                        "value": "No",
                                        "label": "No"
                                    }
                                ]
                            },
                            {
                                "label": "Is the shipment on a Letter of Credit?",
                                "type": "select",
                                "value": "",
                                "options":
                                [
                                    {
                                        "value": "Yes",
                                        "label": "Yes"
                                    },
                                    {
                                        "value": "No",
                                        "label": "No"
                                    }
                                ]
                            },
                            {
                                "label": "Letter of Credit No.",
                                "type": "text",
                                "value": "",
                                "isDisabled": True
                            },
                            {
                                "label": "Special Instructions (to the Freight Forwarder or Carrier)",
                                "type": "text",
                                "value": ""
                            }
                        ]
                    }
                ]

                final_data_dict["master_file"] = json_data

            elif file_name.lower().replace(" ", "_") == 'sales_contract':
                json_data = [
                    {
                        "type": "SALES CONTRACT",
                        "value":
                        [
                            {
                                "label": "Seller",
                                "type": "text",
                                "value": "",
                                "placeholder": "Find or add a contact",
                                "options": [],
                                "optionfrom": "contactAPI"
                            },
                            {
                                "label": "Pages",
                                "type": "Pages",
                                "value": ""
                            },
                            {
                                "label": "Invoice Number",
                                "type": "text",
                                "value": ""
                            },
                            {
                                "label": "Date",
                                "type": "Date",
                                "value": ""
                            },
                            {
                                "label": "Buyer",
                                "type": "select",
                                "value": "",
                                "placeholder": "Find or add a contact",
                                "options": [],
                                "optionfrom": "contactAPI"
                            },
                            {
                                "label": "Delivery Date",
                                "type": "Date",
                                "value": ""
                            },
                            {
                                "label": "Method Of Dispatch",
                                "type": "select",
                                "value": "",
                                "options":
                                [
                                    {
                                        "id": 2,
                                        "value": "dummy1",
                                        "label": "dummy1"
                                    },
                                    {
                                        "id": 3,
                                        "value": "dummy2",
                                        "label": "dummy2"
                                    },
                                    {
                                        "id": 4,
                                        "value": "dummy3",
                                        "label": "dummy3"
                                    }
                                ]
                            },
                            {
                                "label": "Type of Shipment",
                                "type": "text",
                                "value": ""
                            },
                            {
                                "label": "Port of Loading",
                                "type": "select",
                                "value": "",
                                "options": []
                            },
                            {
                                "label": "Port of Discharge",
                                "type": "select",
                                "value": "",
                                "options": []
                            },
                            {
                                "label": "Terms / Method of payment",
                                "type": "textarea",
                                "value": ""
                            },
                            {
                                "header":
                                [
                                    "Product Code",
                                    "Description of Goods",
                                    "Unit Quantity",
                                    "Unit Type",
                                    "Price",
                                    "Amount"
                                ],
                                "value":
                                [
                                    [
                                        {
                                            "type": "text",
                                            "value": "",
                                            "placeholder": "Add product",
                                            "options": [],
                                            "optionfrom": "productAPI"
                                        },
                                        {
                                            "type": "text",
                                            "value": ""
                                        },
                                        {
                                            "type": "number",
                                            "value": "0"
                                        },
                                        {
                                            "type": "text",
                                            "value": ""
                                        },
                                        {
                                            "type": "text",
                                            "value": "0.00"
                                        },
                                        {
                                            "type": "text",
                                            "value": "",
                                            "disabled": True
                                        }
                                    ]
                                ]
                            },
                            {
                                "label": "Conditions",
                                "type": "textarea",
                                "value": ""
                            },
                            {
                                "label": "Bank Details",
                                "type": "textarea",
                                "value": ""
                            },
                            {
                                "label": "Incoterm"
                            },
                            {
                                "type": "select",
                                "value": "",
                                "options": []
                            },
                            {
                                "type": "text",
                                "value": ""
                            },
                            {
                                "label": "Currency",
                                "type": "select",
                                "value": "INR",
                                "options": []
                            },
                            {
                                "label": "Signatory Company",
                                "type": "text",
                                "value": ""
                            },
                            {
                                "label": "Name of Authorized Signatory"
                            },
                            {
                                "placeholder": "First Name",
                                "type": "text",
                                "value": ""
                            },
                            {
                                "placeholder": "Last Name",
                                "type": "text",
                                "value": ""
                            },
                            {
                                "label": "Signature"
                            },
                            {
                                "placeholder": "",
                                "type": "file",
                                "value": ""
                            },
                            {
                                "label": "Add Charge or discount",
                                "value":
                                [
                                    [
                                        {
                                            "placeholder": "",
                                            "value": ""
                                        },
                                        {
                                            "placeholder": "",
                                            "value": 0
                                        }
                                    ]
                                ]
                            }
                        ]
                    }
                ]
                final_data_dict["sales_contract"] = json_data

            elif file_name.lower().replace(" ", "_") == 'packing_list':
                json_data = [
                    {
                        "type": "PACKING LIST",
                        "value":
                        [
                            {
                                "label": "Exporter",
                                "type": "text",
                                "value": "",
                                "placeholder": "Find or add a contact",
                                "options": [],
                                "optionfrom": "contactAPI"
                            },
                            {
                                "label": "Pages",
                                "type": "Pages",
                                "value": ""
                            },
                            {
                                "label": "Invoice Number ",
                                "type": "text",
                                "value": ""
                            },
                            {
                                "label": "Date",
                                "type": "Date",
                                "value": ""
                            },
                            {
                                "label": "Bill of Lading Number",
                                "type": "text",
                                "value": ""
                            },
                            {
                                "label": "Reference",
                                "type": "text",
                                "value": ""
                            },
                            {
                                "label": "Buyer Reference",
                                "type": "text",
                                "value": ""
                            },
                            {
                                "label": "Consignee",
                                "type": "select",
                                "value": "",
                                "placeholder": "Find or add a contact",
                                "options": [],
                                "optionfrom": "contactAPI"
                            },
                            {
                                "label": "Buyer (If not Consignee)",
                                "type": "select",
                                "value": "",
                                "placeholder": "Find or add a contact",
                                "options": [],
                                "optionfrom": "contactAPI"
                            },
                            {
                                "label": "Method Of Dispatch",
                                "type": "select",
                                "value": "",
                                "options":
                                [
                                    {
                                        "id": 2,
                                        "value": "Text Invoice",
                                        "label": "Text Invoice"
                                    },
                                    {
                                        "id": 3,
                                        "value": "Sales Contract",
                                        "label": "Sales Contract"
                                    },
                                    {
                                        "id": 4,
                                        "value": "Packing List",
                                        "label": "Packing List"
                                    }
                                ]
                            },
                            {
                                "label": "Type of Shipment",
                                "type": "text",
                                "value": ""
                            },
                            {
                                "label": "Country Of Origin of Goods",
                                "type": "select",
                                "value": "",
                                "options":
                                [
                                    {
                                        "id": 2,
                                        "value": "Text Invoice",
                                        "label": "Text Invoice"
                                    },
                                    {
                                        "id": 3,
                                        "value": "Sales Contract",
                                        "label": "Sales Contract"
                                    },
                                    {
                                        "id": 4,
                                        "value": "Packing List",
                                        "label": "Packing List"
                                    }
                                ]
                            },
                            {
                                "label": "Country of Final Destination",
                                "type": "select",
                                "value": "",
                                "options":
                                [
                                    {
                                        "id": 2,
                                        "value": "Text Invoice",
                                        "label": "Text Invoice"
                                    },
                                    {
                                        "id": 3,
                                        "value": "Sales Contract",
                                        "label": "Sales Contract"
                                    },
                                    {
                                        "id": 4,
                                        "value": "Packing List",
                                        "label": "Packing List"
                                    }
                                ]
                            },
                            {
                                "label": "Vessel / Aircraft",
                                "type": "text",
                                "value": ""
                            },
                            {
                                "label": "Voyage No",
                                "type": "text",
                                "value": ""
                            },
                            {
                                "label": "Port of Loading",
                                "type": "select",
                                "value": "",
                                "options": []
                            },
                            {
                                "label": "Date of Departure",
                                "type": "date",
                                "value": ""
                            },
                            {
                                "label": "Port of Discharge",
                                "type": "select",
                                "value": "",
                                "options": []
                            },
                            {
                                "label": "Final Destination",
                                "type": "select",
                                "value": "",
                                "options": []
                            },
                            {
                                "label": "Packing Information",
                                "type": "text",
                                "value": ""
                            },
                            {
                                "header":
                                [
                                    "Product Code",
                                    "Description of Goods",
                                    "Unit Quantity",
                                    "Kind & No of Packages",
                                    "Net Weight  (Kg)",
                                    "Gross Weight  (Kg)",
                                    "Measurements  (m³)"
                                ],
                                "value":
                                [
                                    [
                                        {
                                            "type": "text",
                                            "value": "",
                                            "placeholder": "Add product",
                                            "options": [],
                                            "optionfrom": "productAPI"
                                        },
                                        {
                                            "type": "text",
                                            "value": ""
                                        },
                                        {
                                            "type": "number",
                                            "value": "0"
                                        },
                                        {
                                            "type": "text",
                                            "value": ""
                                        },
                                        {
                                            "type": "text",
                                            "value": "0.00"
                                        },
                                        {
                                            "type": "text",
                                            "value": ""
                                        },
                                        {
                                            "type": "text",
                                            "value": ""
                                        }
                                    ]
                                ]
                            },
                            {
                                "label": "Consignment Total",
                                "value":
                                [
                                    0,
                                    0,
                                    0,
                                    0,
                                    0
                                ]
                            },
                            {
                                "label": "Additional Info",
                                "type": "textarea",
                                "value": ""
                            },
                            {
                                "label": "Signatory Company",
                                "type": "text",
                                "value": ""
                            },
                            {
                                "label": "Name of Authorized Signatory",
                                "value":
                                [
                                    {
                                        "placeholder": "First Name",
                                        "type": "text"
                                    },
                                    {
                                        "placeholder": "Last Name",
                                        "type": "text"
                                    }
                                ]
                            },
                            {
                                "label": "Signature",
                                "type": "file",
                                "value": ""
                            }
                        ]
                    }
                ]
                final_data_dict["packing_list"] = json_data

            elif file_name.lower().replace(" ", "_") == 'tax_invoice':
                json_data = [
                    {
                        "type": "PACKING LIST",
                        "value":
                        [
                            {
                                "label": "Exporter",
                                "type": "text",
                                "value": "",
                                "placeholder": "Find or add a contact",
                                "options": [],
                                "optionfrom": "contactAPI"
                            },
                            {
                                "label": "Pages",
                                "type": "Pages",
                                "value": ""
                            },
                            {
                                "label": "Invoice Number ",
                                "type": "text",
                                "value": ""
                            },
                            {
                                "label": "Date",
                                "type": "Date",
                                "value": ""
                            },
                            {
                                "label": "Bill of Lading Number",
                                "type": "text",
                                "value": ""
                            },
                            {
                                "label": "Reference",
                                "type": "text",
                                "value": ""
                            },
                            {
                                "label": "Buyer Reference",
                                "type": "text",
                                "value": ""
                            },
                            {
                                "label": "Consignee",
                                "type": "select",
                                "value": "",
                                "placeholder": "Find or add a contact",
                                "options": [],
                                "optionfrom": "contactAPI"
                            },
                            {
                                "label": "Buyer (If not Consignee)",
                                "type": "select",
                                "value": "",
                                "placeholder": "Find or add a contact",
                                "options": [],
                                "optionfrom": "contactAPI"
                            },
                            {
                                "label": "Method Of Dispatch",
                                "type": "select",
                                "value": "",
                                "options":
                                [
                                    {
                                        "id": 2,
                                        "value": "Text Invoice",
                                        "label": "Text Invoice"
                                    },
                                    {
                                        "id": 3,
                                        "value": "Sales Contract",
                                        "label": "Sales Contract"
                                    },
                                    {
                                        "id": 4,
                                        "value": "Packing List",
                                        "label": "Packing List"
                                    }
                                ]
                            },
                            {
                                "label": "Type of Shipment",
                                "type": "text",
                                "value": ""
                            },
                            {
                                "label": "Country Of Origin of Goods",
                                "type": "select",
                                "value": "",
                                "options":
                                [
                                    {
                                        "id": 2,
                                        "value": "Text Invoice",
                                        "label": "Text Invoice"
                                    },
                                    {
                                        "id": 3,
                                        "value": "Sales Contract",
                                        "label": "Sales Contract"
                                    },
                                    {
                                        "id": 4,
                                        "value": "Packing List",
                                        "label": "Packing List"
                                    }
                                ]
                            },
                            {
                                "label": "Country of Final Destination",
                                "type": "select",
                                "value": "",
                                "options":
                                [
                                    {
                                        "id": 2,
                                        "value": "Text Invoice",
                                        "label": "Text Invoice"
                                    },
                                    {
                                        "id": 3,
                                        "value": "Sales Contract",
                                        "label": "Sales Contract"
                                    },
                                    {
                                        "id": 4,
                                        "value": "Packing List",
                                        "label": "Packing List"
                                    }
                                ]
                            },
                            {
                                "label": "Vessel / Aircraft",
                                "type": "text",
                                "value": ""
                            },
                            {
                                "label": "Voyage No",
                                "type": "text",
                                "value": ""
                            },
                            {
                                "label": "Port of Loading",
                                "type": "select",
                                "value": "",
                                "options": []
                            },
                            {
                                "label": "Date of Departure",
                                "type": "date",
                                "value": ""
                            },
                            {
                                "label": "Port of Discharge",
                                "type": "select",
                                "value": "",
                                "options": []
                            },
                            {
                                "label": "Final Destination",
                                "type": "select",
                                "value": "",
                                "options": []
                            },
                            {
                                "label": "Packing Information",
                                "type": "text",
                                "value": ""
                            },
                            {
                                "header":
                                [
                                    "Product Code",
                                    "Description of Goods",
                                    "Unit Quantity",
                                    "Kind & No of Packages",
                                    "Net Weight  (Kg)",
                                    "Gross Weight  (Kg)",
                                    "Measurements  (m³)"
                                ],
                                "value":
                                [
                                    [
                                        {
                                            "type": "text",
                                            "value": "",
                                            "placeholder": "Add product",
                                            "options": [],
                                            "optionfrom": "productAPI"
                                        },
                                        {
                                            "type": "text",
                                            "value": ""
                                        },
                                        {
                                            "type": "number",
                                            "value": "0"
                                        },
                                        {
                                            "type": "text",
                                            "value": ""
                                        },
                                        {
                                            "type": "text",
                                            "value": "0.00"
                                        },
                                        {
                                            "type": "text",
                                            "value": ""
                                        },
                                        {
                                            "type": "text",
                                            "value": ""
                                        }
                                    ]
                                ]
                            },
                            {
                                "label": "Consignment Total",
                                "value":
                                [
                                    0,
                                    0,
                                    0,
                                    0,
                                    0
                                ]
                            },
                            {
                                "label": "Additional Info",
                                "type": "textarea",
                                "value": ""
                            },
                            {
                                "label": "Signatory Company",
                                "type": "text",
                                "value": ""
                            },
                            {
                                "label": "Name of Authorized Signatory",
                                "value":
                                [
                                    {
                                        "placeholder": "First Name",
                                        "type": "text"
                                    },
                                    {
                                        "placeholder": "Last Name",
                                        "type": "text"
                                    }
                                ]
                            },
                            {
                                "label": "Signature",
                                "type": "file",
                                "value": ""
                            }
                        ]
                    }
                ]
                final_data_dict["tax_invoice"] = json_data

        # final_data_dict = {"a" : "b"}
        if len(final_data_dict) > 0:
            final_data_dict["mail_id"] = mail_id
            client = pymongo.MongoClient(mongo_uri)
            db = client["techxport"]
            t = db['master_data'].insert_one(final_data_dict)
            if str(final_data_dict.get('_id')):

                final_data_dict['_id'] = str(final_data_dict['_id'])

                return {
                    "_id": final_data_dict['_id'],
                    "StatusCode": 1
                }
        else:
            return {
                "StatusCode": 0
            }
    except Exception as e:
        # handle e
        pass


@master_data_info_related_apis_obj.put(update_export_data_info_route_path)
def update_master_info_api(id: str = Form(...), file_name: str = Form(...), data: str = Form(...), token: str = Header("token")):

    token_data = utilities.decode_jwt(token)
    if token_data['StatusCode'] == 0:
        return token_data

    client = pymongo.MongoClient(mongo_uri)
    db = client["techxport"]

    collection_name = "master_data"
    target_id = ObjectId(id)

    document = db[collection_name].find_one({"_id": target_id})

    file_name = file_name.replace(" ", "_").lower()

    data_to_be_processed = json.loads(data)

    try:
        if document:
            if file_name in document:
                document[file_name] = data_to_be_processed
                db[collection_name].update_one(
                    {"_id": target_id}, {"$set": document})
        else:
            print("No document found with the given _id.")
    except:
        pass

    return {
        'Status': 'Export Data Updated Successfully',
        'StatusCode': 1
    }
