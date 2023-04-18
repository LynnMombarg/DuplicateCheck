from fastapi.responses import JSONResponse
from fastapi import FastAPI
app = FastAPI()

@app.get('/get-candidates')
async def duplicateCandidates():
    return JSONResponse('{ "duplicates": { "Name": "Jan" }, { "Name": "Piet" } }')

