FROM tiangolo/uvicorn-gunicorn-fastapi:python3.9

WORKDIR /app

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

#COPY src/main .

EXPOSE 8000

CMD ["uvicorn", "main.PythonController:app", "--host", "0.0.0.0", "--port", "8000"]


