'''
Authors: Lynn, Roward, Diederik, Silke
Jira-task: 30 - RecordLinkage installeren in Python, 4 - Model aanmaken in python, 116 - Model trainen in Python, 159
176 - Python endpoint execute model
Sprint: 1, 2, 3, 4
Last modified: 05-06-2023
'''

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from .PythonService import PythonService
from fastapi import HTTPException

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
      raise HTTPException(status_code=500, detail='Model could not be trained')


# Create model based on a given filename
@app.post('/create-model', status_code=201)
async def create_model(json: dict):
    try:
      service.create_model(json['modelId'])
      return 'Model created!'
    except Exception:
      raise HTTPException(status_code=400, detail='Model could not be created')


# Delete model based on filename
@app.delete('/delete-model/{model_id}', status_code=200)
async def delete_model(model_id: str):
    try:
      service.delete_model(model_id)
      return 'Model deleted!'
    except Exception:
      raise HTTPException(status_code=404, detail='Model could not be deleted')

# Execute model based on given records
@app.post('/execute-model/{model_id}')
async def execute_model(json: dict, model_id: str):
    try:
      response = service.execute_model(model_id, json)
      return JSONResponse(content=response)
    except Exception:
      raise HTTPException(status_code=500, detail='Model could not be executed')

