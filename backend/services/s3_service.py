import boto3
import os
from botocore.exceptions import NoCredentialsError
from io import BytesIO

AWS_ACCESS_KEY_ID = os.environ.get("AWS_ACCESS_KEY_ID")
AWS_SECRET_ACCESS_KEY = os.environ.get("AWS_SECRET_ACCESS_KEY")
S3_BUCKET_NAME = os.environ.get("S3_BUCKET_NAME")
AWS_REGION = os.environ.get("AWS_REGION")

s3_client = boto3.client(
    's3',
    aws_access_key_id=AWS_ACCESS_KEY_ID,
    aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
    region_name=AWS_REGION
)

def upload_file_to_s3(file, user_id: int, username: str, file_name: str):
    try:
        s3_key = f"{username}/{file_name}"
        s3_client.upload_fileobj(file, S3_BUCKET_NAME, s3_key)
        return s3_key
    except NoCredentialsError:
        return None

def download_file_from_s3(s3_key: str) -> BytesIO:
    try:
        file_obj = BytesIO()
        s3_client.download_fileobj(S3_BUCKET_NAME, s3_key, file_obj)
        file_obj.seek(0)
        return file_obj
    except NoCredentialsError:
        return None
