'''
Authors: Lynn, Roward 
Jira-task: 30 - RecordLinkage installeren in Python
Sprint: 1
Last modified: 19-04-2023
Status: doing
'''

import os
import sys
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

import requests
import json
import unittest
from unittest import TestCase
import json
from main.RecordLinkageModel import RecordLinkageModel

# # URL to send request to
# URL = "http://localhost:8000/train-model"

# # Example dataset
# jsonString = '{"recordset1": [{"name": "Piet", "lastname": "Janssen", "age": "18", "country": "NL"}, {"name": "Jan", "lastname": "Pietersen", "age": "19", "country": "BE"}], "recordset2": [{"name": "Henk", "lastname": "van Dijk", "age": "20", "country": "DE"}, {"name": "Piet", "lastname": "Jansen", "age": "18", "country": "NL"}], "golden_matches_index": [{"index1": 0, "index2": 1}]}'
# jsonObject = json.loads(jsonString)

# # Send request
# r = requests.post(url = URL, json = jsonObject)

# # Print response code and text
# print(r)
# print(r.text)

class test_RecordLinkageModel(TestCase):
    
    def setUp(self) -> None:
        self.sut = RecordLinkageModel()
        jsonString = '{"recordset1": [{"name": "Piet", "lastname": "Janssen", "age": "18", "country": "NL"}, {"name": "Jan", "lastname": "Pietersen", "age": "19", "country": "BE"}], "recordset2": [{"name": "Henk", "lastname": "van Dijk", "age": "20", "country": "DE"}, {"name": "Piet", "lastname": "Jansen", "age": "18", "country": "NL"}], "golden_matches_index": [{"index1": 0, "index2": 1}]}'
        self.jsonObject = json.loads(jsonString)
            
unittest.main()