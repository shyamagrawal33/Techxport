from pydantic import BaseModel


class Signup(BaseModel):
    mail_id: str
    password: str


class Signin(BaseModel):
    mail_id: str
    password: str


class OtpBasedAuthentication(BaseModel):
    mail_id: str
    otp: str


class Update_password(BaseModel):
    mail_id: str
    otp: str
    new_password: str
