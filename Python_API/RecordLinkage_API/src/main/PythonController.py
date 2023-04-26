'''
Authors: Lynn, Roward 
Jira-task: 30 - RecordLinkage installeren in Python, 4 - Model aanmaken in python
Sprint: 1, 2
Last modified: 25-04-2023
'''

from fastapi.responses import JSONResponse
from fastapi import FastAPI, status
from PythonService import PythonService

class PythonController:
  global app
  global service
  app = FastAPI()
  service = PythonService()

  # Post request to send json datasets to train the model
  # Expected form of json:
  # {"recordset1": [{"columns":}, {"columns":}], "recordset2": [{"columns":}, {"columns":}], "golden_matches_index": [{"index1": , "index2": }]}
  @app.post('/train-model/{filename}', status_code=status.HTTP_201_CREATED)
  async def trainModel(filename, json_dataframe : dict):
      try:
        service.trainModel(filename, json_dataframe)
        return 'Model trained!'
      except:
          return 'Model could not be trained'
    
  
  # Create model based on a given filename
  @app.post('/create-model')
  async def createModel(filename):
      try:
          service.createModel(filename)
          return 'Model created!'
      except:
          return 'Model could not be created'
      
  @app.delete('/delete-model')
  async def deleteModel(filename):
     try:
        service.deleteModel(filename)
        return 'Model deleted!'
     except:
        return 'Model could not be deeted'