'''
Authors: Lynn
Jira-task: 179
Sprint: 4
Last modified: 25-05-2023
'''

import os, uuid
from azure.identity import DefaultAzureCredential
from azure.storage.blob import BlobServiceClient
from azure.keyvault.secrets import SecretClient
from azure.storage.queue import QueueClient

# class BlobStorageDAO:
    
#     def __init__(self):
#         self.connection_string = 'DefaultEndpointsProtocol=https;AccountName=duplicatecheckml;AccountKey=80z6L1pJvxw4JvB5uiHmuEfhwPSDVMG0ke1SHhxh9u0XPgI83QmpSgQYXD2Pmv0x6fQ9hxzmH2nx+AStp8s59w==;EndpointSuffix=core.windows.net'
#         self.blob_service_client = BlobServiceClient.from_connection_string(self.connection_string)
            
#     def upload_blob_test(self):
#         try:
#             container_name = "models"
#             self.blob_service_client.create_container(container_name)
#         except Exception as ex:
#             print(ex)
            
            
connection_string = 'DefaultEndpointsProtocol=https;AccountName=duplicatecheckml;AccountKey=80z6L1pJvxw4JvB5uiHmuEfhwPSDVMG0ke1SHhxh9u0XPgI83QmpSgQYXD2Pmv0x6fQ9hxzmH2nx+AStp8s59w==;EndpointSuffix=core.windows.net'
blob_service_client = BlobServiceClient.from_connection_string(connection_string)