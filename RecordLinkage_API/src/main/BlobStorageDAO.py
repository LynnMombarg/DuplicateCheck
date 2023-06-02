'''
Authors: Lynn
Jira-task: 179
Sprint: 4
Last modified: 01-06-2023
'''

import os
from azure.storage.blob import BlobServiceClient
import pickle

class BlobStorageDAO:
    
    def __init__(self):
        connection_string = "DefaultEndpointsProtocol=https;AccountName=csb10032001328ea840;AccountKey=lgPINUg/d9dFI93FUOnUwM4BCRXHvIJN8a5HTUaVQyl7SjgKzww0SbBd8Uxl5gFiMTmsqaH0ZPiz+AStxas+ow==;EndpointSuffix=core.windows.net"
        self.container_name = 'models'
        self.local_file_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'pickles/')
        self.blob_service_client = BlobServiceClient.from_connection_string(connection_string)

    # def list_containers(self):
    #     containers = self.blob_service_client.list_containers()
    #     for container in containers:
    #         print(container.name)
            
    def create_blob(self, model_id):
        try:
            blob_client = self.get_blob_client(model_id)
            with open(self.local_file_path + model_id + '.pkl', "rb") as data:
                blob_client.upload_blob(data)
        except Exception as e:
            print(e)
            
    def download_blob_to_pickle(self, model_id):
        try:
            blob_client = self.get_blob_client(model_id)
            blob_data = blob_client.download_blob().readall()
            with open(self.local_file_path + model_id + '.pkl', "wb") as download_file:
                pickle.dump(blob_data, download_file)
        except Exception as e:
            print(e)
        
    def delete_blob(self, model_id):
        blob_client = self.get_blob_client(model_id)
        blob_client.delete_blob()
            
    def overwrite_blob(self, model_id):
        self.delete_blob(model_id)
        self.create_blob(model_id)
        
    def get_blob_client(self, model_id):
        return self.blob_service_client.get_blob_client(container=self.container_name, blob=model_id)
    
test = BlobStorageDAO()
test.download_blob_to_pickle('978c7c2a-0bbf-4c0b-99e1-574d59eb72fd')