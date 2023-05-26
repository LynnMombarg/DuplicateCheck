'''
Authors: Lynn, Roward, Diederik
Jira-task: 4 - Model aanmaken in Python, 116 - Model trainen in Python
Sprint: 2, 3
Last modified: 16-05-2023
'''

import os
import sys
import json

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from .RecordLinkageModel import RecordLinkageModel
import pickle


class PythonService:

    def create_model(self, model_id):
        model = RecordLinkageModel()
        filehandler = open('main/pickles/' + model_id + '.pkl', 'wb')
        pickle.dump(model, filehandler)
        print('Created')

    def load_model(self, model_id):
        model: RecordLinkageModel
        with open('main/pickles/' + model_id + '.pkl', 'rb') as file:
            model = pickle.load(file)
            if not model:
                raise FileNotFoundError('Model not found')
            else:
                print('Loaded')
                return model

    def save_model(self, model_id, model):
        filehandler = open('main/pickles/' + model_id + '.pkl', 'wb')
        pickle.dump(model, filehandler)
        print('Saved')

    def train_model(self, model_id, json_dataframe):
        model = self.load_model(model_id)
        model.train_model(json_dataframe)
        self.save_model(model_id, model)

    def delete_model(self, model_id):
        os.remove(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'pickles', model_id + '.pkl'))

    def execute_model(self, model_id, json_dataframe):
        model = self.load_model(model_id)
        matches = model.execute_model(json_dataframe)
        return {
            'matches': [{'index1': match[0], 'index2': match[1]} for match in matches],
        }

    def execute_model_on_records(self, model_id, json : dict):
        print('test')
        model = self.load_model(model_id)
        print('test2')
        percentage = model.execute_model(json)
        return {
            percentage
        }


