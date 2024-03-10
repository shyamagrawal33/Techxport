from fastapi.staticfiles import StaticFiles
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os

app = FastAPI()

# Set Origins for fastAPI CORS
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

# Get the absolute path of the directory
directory = os.path.join(os.getcwd(), "TempImage")

# Mount the directory
app.mount("/TempImage", StaticFiles(directory=directory), name="TempImage")
# app.mount("/pan_folder", StaticFiles(directory="pan_folder"), name="pan_folder")
# app.mount("/gst_folder", StaticFiles(directory="gst_folder"), name="gst_folder")

