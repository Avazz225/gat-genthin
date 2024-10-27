import os
import boto3
import json
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from botocore.exceptions import ClientError

def send_activation_email(confirmation_code:str, email:str, first_name: str):
    base_url=os.environ.get("CONFIRMATIONBASE")
    confirmation_url=f"{base_url}?code={confirmation_code}"

    send_email(email, confirmation_url, first_name)


def send_email(recipient:str, confirmation_url:str, first_name:str):
    SENDER = "Genthiner Amateurtheater<noreply.gat-genthin@jne-solutions.de>"
    RECIPIENT = recipient
    AWS_REGION = "eu-central-1"        
    CHARSET = "UTF-8"

    SUBJECT = "Bestätige deine Teilnahme am gat-Adventskalender Gewinnspiel"

    BODY_TEXT, BODY_HTML = getRegText(first_name, confirmation_url) 

    client = boto3.client('ses',region_name=AWS_REGION)
    msg = MIMEMultipart('mixed')
    msg['Subject'] = SUBJECT 
    msg['From'] = SENDER 
    msg['To'] = RECIPIENT

    msg_body = MIMEMultipart('alternative')
    textpart = MIMEText(BODY_TEXT.encode(CHARSET), 'plain', CHARSET)
    htmlpart = MIMEText(BODY_HTML.encode(CHARSET), 'html', CHARSET)
    msg_body.attach(textpart)
    msg_body.attach(htmlpart)

    msg.attach(msg_body)
    try:
        client.send_raw_email(
            Source=SENDER,
            Destinations=[
                RECIPIENT
            ],
            RawMessage={
                'Data':msg.as_string(),
            }
        )
    # Display an error if something goes wrong.	
    except ClientError as e:
        print(f"Could not send email to {RECIPIENT}")
        print(e.response['Error']['Message'])

    return


def getRegText(first_name:str, activation_url:str):
    try:
        basepath = os.path.dirname(os.path.abspath(__file__))
        path= os.path.join(basepath,"mail", "de.json")
        f = open(path)
        data = json.load(f)
        html, text = "", ""

        for element in data["html"]:
            if element == "activation_link":
                element = activation_url
            elif element == "first_name":
                element = first_name
            html += element

        for element in data["text"]:
            if element == "activation_link":
                element = activation_url
            elif element == "first_name":
                element = first_name
            text += element

        return text, html
    except Exception as e:
        print("Error during read of mail content: ",e)
