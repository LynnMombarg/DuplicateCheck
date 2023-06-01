'''
Authors: Lynn
Jira-task: 179
Sprint: 4
Last modified: 25-05-2023
'''

import os, uuid
from azure.identity import DefaultAzureCredential
from azure.storage.blob import BlobServiceClient, BlobClient, ContainerClient

# class BlobStorageDAO:

try:
    account_name = 'csb10032001328ea840'
    account_key = 'lgPINUg/d9dFI93FUOnUwM4BCRXHvIJN8a5HTUaVQyl7SjgKzww0SbBd8Uxl5gFiMTmsqaH0ZPiz+AStxas+ow=='
    container_name = 'models'
    
    connection_string = 'DefaultEndpointsProtocol=https;AccountName=' + account_name + ';AccountKey=' + account_key + ';EndpointSuffix=core.windows'
    blob_client_service = BlobServiceClient.from_connection_string(connection_string)
    
    blob_client_service.create_container(container_name)

except Exception as ex:
    print('Exception:')
    print(ex)