'''
Authors: Lynn, Roward 
Jira-task: 4 - Model aanmaken in python
Sprint: 2
Last modified: 25-04-2023
'''

from RecordLinkageModel import RecordLinkageModel

class PythonService:
    
    def __init__(self):
        self.models = []
    
    def createModel(self, filename):
        self.models.append(RecordLinkageModel(filename))
        
    def trainModel(self, filename, json_dataframe):
        modelFound = False
        for model in self.models:
            if(model.getFilename() == filename):
                modelFound = True
                model.trainModel(json_dataframe)
                break
        if(modelFound == False):
            raise FileNotFoundError ('No model with given filename')
                
    def getModels(self):
        return self.models