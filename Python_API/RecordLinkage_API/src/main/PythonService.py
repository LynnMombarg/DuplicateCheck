'''
Authors: Lynn, Roward 
Jira-task: 4 - Model aanmaken in python
Sprint: 2
Last modified: 25-04-2023
'''

import os
import sys
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from .RecordLinkageModel import RecordLinkageModel
import pickle

class PythonService:
    
    def createModel(self, modelId):
        model = RecordLinkageModel()
        filehandler = open('pickles/' + modelId + '.pkl', 'wb')
        pickle.dump(model, filehandler)
        
    def loadModel(self, modelId):
        model: RecordLinkageModel
        with open('pickles/' + modelId + '.pkl', 'rb') as file:
            model = pickle.load(file)
            if not model:
                raise FileNotFoundError('Model not found')
            else :
                return model
        
    def trainModel(self, modelId, json_dataframe):
        model = self.loadModel(modelId)
        model.trainModel(json_dataframe)
        
    def deleteModel(self, modelId):
        os.remove('pickles/' + modelId + '.pkl')
        