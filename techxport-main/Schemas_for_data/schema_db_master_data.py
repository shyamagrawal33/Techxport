from pydantic import BaseModel


class MasterForm(BaseModel):
    master_file: list


class FilesToBeProcessed(BaseModel):
    list_of_of_files: list
