import smtplib
import random
import string

def generate_otp(length=6):
    return ''.join(random.choice(string.digits) for _ in range(length))

# Sender's email and password (use an app-specific password for security)

sender_email = "vipul.shah@aurigait.com"
sender_password = "@@Franks22121998"

# Receiver's email address
receiver_email = "vsah1396@gmail.com"

# Generate a random OTP
otp = generate_otp()

# Email subject and message
subject = "Your OTP Code"
message = f"Your OTP code is: {otp}"

# Connect to the SMTP server
try:
    server = smtplib.SMTP("smtp.gmail.com", 587)
    server.starttls()
    server.login(sender_email, sender_password)

    # Compose the email
    email_text = f"Subject: {subject}\n\n{message}"

    # Send the email
    server.sendmail(sender_email, receiver_email, email_text)

    print("OTP sent successfully!")

except Exception as e:
    print(f"An error occurred: {str(e)}")

finally:
    # Close the SMTP server connection
    server.quit()

