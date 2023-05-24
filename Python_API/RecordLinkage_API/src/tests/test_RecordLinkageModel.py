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

class test_RecordLinkageModel(TestCase):
    
    def setUp(self) -> None:
        self.sut = RecordLinkageModel()
        jsonString = '{ "trainingId": "12hdbs", "userId": "shge723", "datasetA": [{ "records": [{ 1: [{"name": "Piet", "lastname": "Janssen", "age": 18, "country": "NL"}], 2: [{"name": "Jan", "lastname": "Pietersen", "age": 19, "country": "BE"}] }] }], "datasetB": [{ "records": [{ 1: [{"name": "Henk", "lastname": "van Dijk", "age": 20, "country": "DE"}], 2: [{"name": "Piet", "lastname": "Jansen", "age": 18, "country": "NL"}] }] }], "matches": [{"index1": 0, "index2": 1 }] }'
        self.jsonObject = json.loads(jsonString)
            
    def test_trainModel(self):
        try:
            self.sut.trainModel(self.jsonObject)
        except:
            self.fail()
            
    # def test_executeModel(self):
    #     try:
    #         self.sut.executeModel(self.jsonObject)
    #     except:
    #         self.fail()
                
if __name__ == '__main__':
    unittest.main()