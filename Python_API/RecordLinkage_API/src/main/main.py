from fastapi.responses import JSONResponse
from fastapi import FastAPI, status
from Python_API.RecordLinkage_API.src.main.recordLinkage.RecordLinkage import RecordLinkageModel

class main:
  global app
  global model
  app = FastAPI()
  model = RecordLinkageModel()

  # Easily made endpoint to test simple get requests
  @app.get('/get-candidates')
  async def duplicateCandidates():
      return JSONResponse('{ "record1": { "Name": "Jan" }, "record2": { "Name": "Piet" } }')

  # Post request to send json datasets to train the model
  # Expected form of json:
  # {"recordset1": [{"columns":}, {"columns":}], "recordset2": [{"columns":}, {"columns":}], "golden_matches_index": [{"index1": , "index2": }]}
  @app.post('/train-model', status_code=status.HTTP_201_CREATED)
  async def duplicateCandidates(json_dataframe : dict):
      model.trainModel(json_dataframe)
      return model.nrOfTrainings
