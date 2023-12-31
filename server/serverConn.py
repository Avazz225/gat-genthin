import boto3
import os

s3 = boto3.client('s3', aws_access_key_id=os.getenv('ACCESS_KEY'), aws_secret_access_key=os.getenv('SECRET_ACCESS_KEY'))
bucket_name = os.getenv('TARGET_BUCKET')


def save_to_s3(file_name:str, file_content:str):
    s3.put_object(Body=file_content.encode('UTF-8'), Bucket=bucket_name, CacheControl='private', Key=file_name+'.dat')


def get_from_s3(file_name:str):
    response = s3.get_object(Bucket=bucket_name, Key=file_name+'.dat')
    return response['Body'].read().decode('utf-8')
    

def list_s3_objects(bucket_name=bucket_name, prefix='', length = 1):
    try:
        response = s3.list_objects_v2(Bucket=bucket_name, Prefix=prefix)
        objects = response.get('Contents', [])
        directories = []
        files = []
        
        for obj in objects:
            key = obj['Key']

            key = key.split('/')
            
            if len(key) > length:
                directories.append('/'.join(key[0:length])+'/')
            else:
                files.append('/'.join(key))
        
        return list(dict.fromkeys(directories)), files
    except Exception as e:
        print(f'Fehler beim Auflisten von Objekten: {str(e)}')
        return [], []


def listdir_r(prefix = '', clear=False, length=1):

    liste = list()
    if (clear):liste.clear()

    directories, files = list_s3_objects(bucket_name, prefix, length)

    for dir in directories:
        liste.append(listdir_r(dir, False, length+1))

    for file in files:
            liste.append(file)
    
    return liste
