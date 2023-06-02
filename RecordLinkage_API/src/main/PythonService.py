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

file_path = os.path.join(os.path.dirname(__file__), 'pickles')

class PythonService:


    def create_model(self, model_id):
        model = RecordLinkageModel()
        try:
            filehandler = open(file_path + '/' + model_id + '.pkl', 'wb')
            pickle.dump(model, filehandler)
            filehandler.close()
            print('Created')
        except Exception:
            raise FileExistsError('Could not create model')

    def load_model(self, model_id):
        model: RecordLinkageModel
        try:
            with open(file_path + '/' + model_id + '.pkl', 'rb') as file:
                model = pickle.load(file)
                print('Loaded')
                return model
        except Exception:
            raise FileNotFoundError('Model not found')

    def save_model(self, model_id, model):
        filehandler = open(file_path + '/'  + model_id + '.pkl', 'wb')
        pickle.dump(model, filehandler)
        print('Saved')

    def train_model(self, model_id, json_dataframe):
        model = self.load_model(model_id)
        model.train_unsupervised_model(copy.deepcopy(json_dataframe))  # Train the unsupervised model
        model.train_model(json_dataframe)
        print('Trained')
        self.save_model(model_id, model)

    def delete_model(self, model_id):
        os.remove(file_path + '/' + model_id + '.pkl')

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


