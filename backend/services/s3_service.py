import boto3
import os
from botocore.exceptions import NoCredentialsError

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

def upload_file_to_s3(file, user_id: int, file_name: str):
    try:
        s3_key = f"user_{user_id}/{file_name}"
        s3_client.upload_fileobj(file, S3_BUCKET_NAME, s3_key)
        return s3_key
    except NoCredentialsError:
        return None
