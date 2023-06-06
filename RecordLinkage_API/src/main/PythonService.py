'''
Authors: Lynn, Roward, Diederik
Jira-task: 4 - Model aanmaken in Python, 116 - Model trainen in Python, 159
Sprint: 2, 3, 4
Last modified: 05-06-2023
'''

import os
import sys
import json
import time
import copy

# sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from .RecordLinkageModel import RecordLinkageModel
import pickle
from main.BlobStorageDAO import BlobStorageDAO

file_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'pickles/')

class PythonService:
    
    def __init__(self):
        self.blobStorageDAO = BlobStorageDAO()


    def create_model(self, model_id):
        model = RecordLinkageModel()
        try:
            filehandler = open(file_path + '/' + model_id + '.pkl', 'wb')
            pickle.dump(model, filehandler)
            filehandler.close()
            self.blobStorageDAO.create_blob(model_id)
            self.delete_pickle(model_id)
            print('Created')
        except Exception as e:
            print(e)
            raise FileExistsError('Could not create model')
        # self.delete_pickle(model_id)

    def load_model(self, model_id):
        model: RecordLinkageModel
        try:
            with open(file_path + model_id + '.pkl', 'rb') as file:
                model = pickle.load(file)
            print('Loaded')
            return model
        except Exception as e:
            print(e)
            raise FileNotFoundError('Model not found')

    def save_model(self, model_id, model: RecordLinkageModel):
        try:
            filehandler = open(file_path + '/'  + model_id + '.pkl', 'wb')
            pickle.dump(model, filehandler)
            filehandler.close()
            self.blobStorageDAO.create_blob(model_id)
            print('Saved')
        except Exception as e:
            print(e)

    # Model is downloaded from blobStorageDAO but it is never overwritten in azure blob storage (pickle still exists)
    def train_model(self, model_id, json_dataframe):
        self.blobStorageDAO.download_blob_to_pickle(model_id)
        time.sleep(2)
        model = self.load_model(model_id)
        model.train_unsupervised_model(copy.deepcopy(json_dataframe))  # Train the unsupervised model
        model.train_model(json_dataframe)
        print('Trained')
        self.save_model(model_id, model)
        self.delete_pickle(model_id)

    def delete_model(self, model_id):
        self.blobStorageDAO.delete_blob(model_id)

    def execute_model(self, model_id, json : dict):
        self.blobStorageDAO.download_blob_to_pickle(model_id)
        time.sleep(2)
        model = self.load_model(model_id)
        is_match, percentage = model.execute_model(json)
        self.delete_pickle(model_id)
        return {
            'is_match': is_match,
            'percentage': percentage
        }
        
    def delete_pickle(self, model_id):
        os.remove(file_path + '/' + model_id + '.pkl')


