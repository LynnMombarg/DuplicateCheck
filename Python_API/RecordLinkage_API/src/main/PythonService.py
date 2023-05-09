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
    
    def createModel(self, filename):
        model = RecordLinkageModel()
        filehandler = open('Python_API/RecordLinkage_API/src/main/pickles/' + filename + '.pkl', 'wb')
        pickle.dump(model, filehandler)
        
    def loadModel(self, filename):
        model: RecordLinkageModel
        with open('Python_API/RecordLinkage_API/src/main/pickles/' + filename + '.pkl', 'rb') as file:
            model = pickle.load(file)
            if not model:
                raise FileNotFoundError('Model not found')
            else :
                return model
        
    def trainModel(self, filename, json_dataframe):
        model = self.loadModel(filename)
        model.trainModel(json_dataframe)
        
    def deleteModel(self, filename):
        os.remove('Python_API/RecordLinkage_API/src/main/pickles/' + filename + '.pkl')
        