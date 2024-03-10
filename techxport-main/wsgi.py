from app_data import app
import uvicorn
from Schemas_for_data.schema_db_crud_apis import Signin, Update_password
from API.DB_CRUD_APIs.user_registration_apis import user_registration_apis_obj
from API.DIFFERENT_APIs.company_info_apis import company_info_related_apis_obj, dropdown_specific_apis_obj
from API.DIFFERENT_APIs.contact_info_apis import contact_info_related_apis_obj
from API.DIFFERENT_APIs.product_info_apis import product_info_related_apis_obj
from API.DIFFERENT_APIs.sync_data_apis import sync_data_apis_obj
from API.DIFFERENT_APIs.master_data_apis import master_data_info_related_apis_obj


app.include_router(user_registration_apis_obj)


app.include_router(company_info_related_apis_obj)


app.include_router(dropdown_specific_apis_obj)


app.include_router(contact_info_related_apis_obj)


app.include_router(product_info_related_apis_obj)


app.include_router(sync_data_apis_obj)


app.include_router(master_data_info_related_apis_obj)


@app.get("/")
async def main():
    return {"message": "Hello World"}

if (__name__ == "__main__"):
    uvicorn.run("wsgi:app", host="localhost", port=5000, reload=True)
