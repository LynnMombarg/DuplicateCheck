from fastapi.responses import JSONResponse
from fastapi import FastAPI
app = FastAPI()

@app.get('/get-candidates')
async def duplicateCandidates():
    return JSONResponse('{ "record1": { "Name": "Jan" }, "record2": { "Name": "Piet" } }')

