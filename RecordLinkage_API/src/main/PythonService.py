'''
Authors: Lynn, Roward, Diederik
Jira-task: 4 - Model aanmaken in Python, 116 - Model trainen in Python, 159
Sprint: 2, 3, 4
Last modified: 01-06-2023
'''

import os
import sys
import json
import copy

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from .RecordLinkageModel import RecordLinkageModel
import pickle
from main.BlobStorageDAO import BlobStorageDAO

file_path = os.path.join(os.path.dirname(__file__), 'pickles')

class PythonService:
    
    # def __init__(self):
    #     self.blobStorageDAO: BlobStorageDAO


    def create_model(self, model_id):
        model = RecordLinkageModel()
        blobStorageDAO = BlobStorageDAO()
        try:
            filehandler = open(file_path + '/' + model_id + '.pkl', 'wb')
            pickle.dump(model, filehandler)
            filehandler.close()
            blobStorageDAO.create_blob(model_id)
            print('Created')
        except Exception as e:
            print(e)
            raise FileExistsError('Could not create model')

    def load_model(self, model_id):
        model: RecordLinkageModel
        blobStorageDAO = BlobStorageDAO()
        try:
            with open(file_path + '/' + model_id + '.pkl', 'rb') as file:
                model = pickle.load(file)
                print('Loaded')
                return model
        except Exception as e:
            print(e)
            raise FileNotFoundError('Model not found')

    def save_model(self, model_id, model):
        blobStorageDAO = BlobStorageDAO()
        try:
            filehandler = open(file_path + '/'  + model_id + '.pkl', 'wb')
            pickle.dump(model, filehandler)
            blobStorageDAO.overwrite_blob(model_id)
            print('Saved')
        except Exception as e:
            print(e)

    def train_model(self, model_id, json_dataframe):
        model = self.load_model(model_id)
        model.train_unsupervised_model(copy.deepcopy(json_dataframe))  # Train the unsupervised model
        model.train_model(json_dataframe)
        print('Trained')
        self.save_model(model_id, model)

    def delete_model(self, model_id):
        blobStorageDAO = BlobStorageDAO()
        os.remove(file_path + '/' + model_id + '.pkl')
        blobStorageDAO.delete_blob(model_id)

    def execute_model(self, model_id, json_dataframe):
        model = self.load_model(model_id)
        matches = model.execute_model(json_dataframe)
        print('Executed')
        return {
            'matches': [{'index1': match[0], 'index2': match[1]} for match in matches],
        }

    def execute_model_on_records(self, model_id, json : dict):
        model = self.load_model(model_id)
        is_match, percentage = model.execute_model(json)
        return {
            'is_match': is_match,
            'percentage': percentage
        }


