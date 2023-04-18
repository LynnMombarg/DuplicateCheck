import recordlinkage.datasets
from fastapi.responses import JSONResponse
from fastapi import FastAPI

from src.main.recordLinkage.RecordLinkage import RecordLinkage

app = FastAPI()

@app.get('/get-candidates')
async def duplicateCandidates():
    return JSONResponse('{ "duplicates": { "Name": "Jan" }, { "Name": "Piet" } }')

