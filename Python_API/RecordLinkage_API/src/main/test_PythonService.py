'''
Authors: Lynn 
Jira-task: 4 - Model aanmaken in python
Sprint: 2
Last modified: 26-04-2023
'''

import unittest
from unittest import TestCase
import json
from PythonService import PythonService
from RecordLinkageModel import RecordLinkageModel
import pandas as pd

class test_PythonService(TestCase):
    
    def setUp(self) -> None:
        self.sut = PythonService()
    
    
    def test_createModel(self):
        expected = 1
        
        self.sut.createModel('test.pkl')
        actual = len(self.sut.getModels())
        
        self.assertEqual(expected, actual)
        
        
    def test_trainModelWithoutExistingModel(self):
        jsonString = '{"recordset1": [{"name": "Piet", "lastname": "Janssen", "age": "18", "country": "NL"}, {"name": "Jan", "lastname": "Pietersen", "age": "19", "country": "BE"}], "recordset2": [{"name": "Henk", "lastname": "van Dijk", "age": "20", "country": "DE"}, {"name": "Piet", "lastname": "Jansen", "age": "18", "country": "NL"}], "golden_matches_index": [{"index1": 0, "index2": 1}]}'
        jsonObject = json.loads(jsonString)
        
        with self.assertRaises(FileNotFoundError):
            self.sut.trainModel('test.pkl', jsonObject)
            

    def test_trainExistingModel(self):
        try:
            self.sut.createModel('test.pkl')
            jsonString = '{"recordset1": [{"name": "Piet", "lastname": "Janssen", "age": "18", "country": "NL"}, {"name": "Jan", "lastname": "Pietersen", "age": "19", "country": "BE"}], "recordset2": [{"name": "Henk", "lastname": "van Dijk", "age": "20", "country": "DE"}, {"name": "Piet", "lastname": "Jansen", "age": "18", "country": "NL"}], "golden_matches_index": [{"index1": 0, "index2": 1}]}'
            jsonObject = json.loads(jsonString)
            self.sut.trainModel('test.pkl', jsonObject)
        except:
            self.fail()
            
unittest.main()