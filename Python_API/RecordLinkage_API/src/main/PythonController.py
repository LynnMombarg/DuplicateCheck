from fastapi.responses import JSONResponse
from fastapi import FastAPI, status
from PythonService import PythonService
from RecordLinkageModel import RecordLinkageModel

class PythonController:
  global app
  global service
  app = FastAPI()
  service = PythonService()

  # Easily made endpoint to test simple get requests
  @app.get('/get-candidates')
  async def duplicateCandidates():
      return JSONResponse('{ "record1": { "Name": "Jan" }, "record2": { "Name": "Piet" } }')

  # Post request to send json datasets to train the model
  # Expected form of json:
  # {"recordset1": [{"columns":}, {"columns":}], "recordset2": [{"columns":}, {"columns":}], "golden_matches_index": [{"index1": , "index2": }]}
  @app.post('/train-model', status_code=status.HTTP_201_CREATED)
  async def trainModel(modelId: int, json_dataframe : dict):
      try:
        service.trainModel(modelId, json_dataframe)
        return 'Model trained!'
      except:
          return 'Model could not be trained'
    
  
  # Create model based on a given filename
  @app.post('/create-model', status_code=status.HTTP_201_CREATED)
  async def createModel(filename):
      try:
          service.createModel(filename)
          return 'Model created!'
      except:
          return 'Model could not be created'