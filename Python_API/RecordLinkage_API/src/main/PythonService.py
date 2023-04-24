from RecordLinkageModel import RecordLinkageModel

class PythonService:
    
    def __init__(self):
        self.models = []
    
    def createModel(self, filename):
        self.models.append(RecordLinkageModel(filename))
        
    def trainModel(self, modelId: int, json_dataframe):
        for model in self.models:
            if(model.getModelId() == modelId):
                model.trainModel(json_dataframe)