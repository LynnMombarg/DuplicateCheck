'''
Authors: Lynn, Roward 
Jira-task: 30 - RecordLinkage installeren in Python, 4 - Model aanmaken in python
Sprint: 1, 2
Last modified: 25-04-2023
'''

from fastapi.responses import JSONResponse
from fastapi import FastAPI
from .PythonService import PythonService

app = FastAPI()
service = PythonService()
  

# Post request to send json datasets to train the model
# Expected form of json:
# {"recordset1": [{"columns":}, {"columns":}], "recordset2": [{"columns":}, {"columns":}], "golden_matches_index": [{"index1": , "index2": }]}
@app.post('/train-model/{modelId}')
async def trainModel(json : dict, modelId: str):
    try:
      service.trainModel(modelId, json)
      return 'Model trained!'
    except:
      return 'Model could not be trained'
    
  
# Create model based on a given filename
@app.post('/create-model')
async def createModel(json: dict):
    try:
      service.createModel(json['modelId'])
      return 'Model created!'
    except:
      return 'Model could not be created'
        
      
# Delete model based on filename
@app.post('/delete-model')
async def deleteModel(json: dict):
    try:
      service.deleteModel(json['modelId'])
      return 'Model deleted!'
    except:
      return 'Model could not be deleted'
