'''
Authors: Lynn
Jira-task: 179
Sprint: 4
Last modified: 25-05-2023
'''

import os, uuid
from azure.identity import DefaultAzureCredential
from azure.storage.blob import BlobServiceClient, BlobClient, ContainerClient

class BlobStorageDAO:
    
    def __init__(self):
        account_url = "https://<duplicatecheckml>.blob.core.windows.net"
        default_credential = DefaultAzureCredential()

        # Create the BlobServiceClient object
        self.blob_service_client = BlobServiceClient(account_url, credential=default_credential)
        
    def upload_blob(self, modelId, model):
        blob_client = self.blob_service_client.get_blob_client(container="models", blob=modelId)
        blob_client.upload_blob(model)