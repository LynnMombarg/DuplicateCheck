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
from .BlobStorageDAO import BlobStorageDAO

class PythonService:
    
    def __init__(self):
        self.blobStorageDAO = BlobStorageDAO()
    
    def createModel(self, modelId):
        model = RecordLinkageModel()
        filehandler = open(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..' , 'pickles', modelId + '.pkl'), 'wb')
        pickle.dump(model, filehandler)
        BlobStorageDAO.upload_blob(modelId + '.pkl', filehandler.read())
        
    def loadModel(self, modelId):
        model: RecordLinkageModel
        with open(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..' , 'pickles', modelId + '.pkl'), 'rb') as file:
            model = pickle.load(file)
            if not model:
                raise FileNotFoundError('Model not found')
            else :
                return model
    
    def saveModel(self, modelId, model):
        filehandler = open(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..' , 'pickles', modelId + '.pkl'), 'wb')
        pickle.dump(model, filehandler)
        
    def trainModel(self, modelId, json_dataframe):
        model = self.loadModel(modelId)
        model.trainModel(json_dataframe)
        self.saveModel(modelId, model)
        
    def deleteModel(self, modelId):
        os.remove(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..' , 'pickles', modelId + '.pkl'))
    
    def executeModel(self, modelId, json_dataframe):
        model = self.loadModel(modelId)
        matches = model.executeModel(json_dataframe)
        return {
            'matches': [{'index1': match[0], 'index2': match[1]} for match in matches],
        }
