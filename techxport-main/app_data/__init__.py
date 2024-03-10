from fastapi.staticfiles import StaticFiles
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

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


app.mount("../TempImage", StaticFiles(directory="TempImage"), name="TempImage")
# app.mount("/pan_folder", StaticFiles(directory="pan_folder"), name="pan_folder")
# app.mount("/gst_folder", StaticFiles(directory="gst_folder"), name="gst_folder")

