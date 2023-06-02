'''
Authors: Lynn
Jira-task: 179
Sprint: 4
Last modified: 01-06-2023
'''

import os
from azure.storage.blob import BlobServiceClient

class BlobStorageDAO:
    
    def __init__(self):
        connection_string = "DefaultEndpointsProtocol=https;AccountName=csb10032001328ea840;AccountKey=lgPINUg/d9dFI93FUOnUwM4BCRXHvIJN8a5HTUaVQyl7SjgKzww0SbBd8Uxl5gFiMTmsqaH0ZPiz+AStxas+ow==;EndpointSuffix=core.windows.net"
        self.container_name = 'models'
        self.local_file_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'pickles\\')
        self.blob_service_client = BlobServiceClient.from_connection_string(connection_string)

    def list_containers(self):
        containers = self.blob_service_client.list_containers()
        for container in containers:
            print(container.name)
            
    def upload_blob(self, modelId):
        blob_client = self.blob_service_client.get_blob_client(container=self.container_name, blob=modelId)
        with open(self.local_file_path + modelId + '.pkl', "rb") as data:
            blob_client.upload_blob(data)
            
    def download_blob(self, modelId):
        blob_client = self.blob_service_client.get_blob_client(container=self.container_name, blob=modelId)
        with open(self.local_file_path + modelId + '.pkl', "wb") as download_file:
            download_file.write(blob_client.download_blob().readall())