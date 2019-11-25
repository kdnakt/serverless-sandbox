import os
import boto3
from email.headerregistry import Address
from email.header import Header
from email.utils import formataddr

SES_REGION = os.environ['SES_REGION']
SES_FROM_ADDR = os.environ['SES_FROM_ADDR']
SES_FROM_NAME = os.environ['SES_FROM_NAME']
_from = formataddr((Header(SES_FROM_NAME, 'ISO-2022-JP').encode(), SES_FROM_ADDR))

CHARSET = 'UTF-8'

ses = boto3.client('ses', region_name=SES_REGION)

MAIL_SUBJECT = "[TEST] Mail from Amazon SES"
MAIL_BODY = """
Hello from Amazon SES!

From: {name}
""".format(name=SES_FROM_NAME)

def send_mail(event, context):
    ses_send_mail(SES_FROM_ADDR, MAIL_SUBJECT, MAIL_BODY)

def ses_send_mail(_to, _subject, _body):
    response = ses.send_email(
        Destination={
            'ToAddresses': [_to],
        },
        Message={
            'Subject': {
                'Charset': CHARSET,
                'Data': _subject,
            },
            'Body': {
                'Text': {
                    'Charset': CHARSET,
                    'Data': _body,
                }
            },
        },
        Source=_from,
        ReplyToAddresses=[
            SES_FROM_ADDR,
        ],
    )
    print(response)
