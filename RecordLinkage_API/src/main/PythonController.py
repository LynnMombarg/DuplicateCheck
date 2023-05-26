'''
Authors: Lynn, Roward, Diederik
Jira-task: 30 - RecordLinkage installeren in Python, 4 - Model aanmaken in python, 116 - Model trainen in Python
Sprint: 1, 2, 3
Last modified: 16-05-2023
'''

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from .PythonService import PythonService
from .devData.JsonTestData import get_test_data

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=['localhost:8001'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

service = PythonService()

# Post request to send json datasets to train the model
# Expected form of json:
# {"recordset1": [{"columns":}, {"columns":}], "recordset2": [{"columns":}, {"columns":}], "golden_matches_index": [{"index1": , "index2": }]}
@app.put('/train-model/{model_id}', status_code=200)
async def train_model(json : dict, model_id: str):
    try:
      service.train_model(model_id, json)
      return 'Model trained!'
    except Exception:
      return 'Model could not be trained'


# Create model based on a given filename
@app.post('/create-model', status_code=201)
async def create_model(json: dict):
    try:
      service.create_model(json['modelId'])
      return 'Model created!'
    except Exception:
      return 'Model could not be created'


# Delete model based on filename
@app.delete('/delete-model/{model_id}', status_code=200)
async def delete_model(model_id: str):
    try:
      service.delete_model(model_id)
      return 'Model deleted!'
    except Exception:
      return 'Model could not be deleted'

# Execute model based on a given filename
@app.post('/execute-model/{model_id}')
async def execute_model(json: dict, model_id: str):
    try:
      # matches = service.execute_model(model_id, get_test_data())
      percentage = "10%"
      return JSONResponse(content={"percentage": percentage})
    except Exception:
      return 'Model could not be executed'