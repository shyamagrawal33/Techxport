import smtplib
import credentials
import random
import string
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText


def sent_email_for_otp(otp, mail_id):

    # https://medium.com/@Tanweer_Ali/send-emails-for-free-using-gmails-api-in-python-5b56c38d9a36
    # https://support.google.com/accounts/answer/185833?hl=en    ---->>>>  Add Your Username and Password using this

    message = MIMEMultipart()
    message["To"] = mail_id
    message["From"] = 'vipul.shah@aurigait.com'
    message["Subject"] = 'Otp Verification'

    title = '<b> testing done successfully 1234 </b>'
    html_text = f"""<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
      <div style="margin:50px auto;width:70%;padding:20px 0">
        <div style="border-bottom:1px solid #eee">
          <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Techxport</a>
        </div>
        <p style="font-size:1.1em">Hi,</p>
        <p>Thank you for choosing Techxport. Use the following OTP to complete your Sign Up procedures. </p>
        <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">{otp}</h2>
        <p style="font-size:0.9em;">Regards,<br />Techxport</p>
        <hr style="border:none;border-top:1px solid #eee" />
      </div>
    </div>
    """
    messageText = MIMEText(html_text, 'html')
    message.attach(messageText)

    email = credentials.mail_credentials.mail_username
    password = credentials.mail_credentials.mail_password
    print(email, password)

    server = smtplib.SMTP('smtp.gmail.com:587')
    server.ehlo('Gmail')
    server.starttls()
    server.login(email, password)
    fromaddr = 'vipul.shah@aurigait.com'
    toaddrs = mail_id
    server.sendmail(fromaddr, toaddrs, message.as_string())

    server.quit()
    return True
