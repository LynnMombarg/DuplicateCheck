'''
Authors: Lynn 
Jira-task: 4 - Model aanmaken in python, 111 - Model pickle file verwijderen Python
Sprint: 2
Last modified: 9-5-2023
'''

import os
import sys
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

import unittest
from unittest import TestCase
import json
from main.PythonService import PythonService
from unittest.mock import patch


class test_PythonService(TestCase):
    
    def setUp(self) -> None:
        self.sut = PythonService()
        self.service = PythonService()
        self.service.createModel('test')
    
    def test_createModel(self):
        try:
            self.sut.createModel('test')
        except:
            self.fail()
        
        
    def test_trainModelWithoutExistingModel(self):
        jsonString = '{"recordset1": [{"name": "Piet", "lastname": "Janssen", "age": "18", "country": "NL"}, {"name": "Jan", "lastname": "Pietersen", "age": "19", "country": "BE"}], "recordset2": [{"name": "Henk", "lastname": "van Dijk", "age": "20", "country": "DE"}, {"name": "Piet", "lastname": "Jansen", "age": "18", "country": "NL"}], "golden_matches_index": [{"index1": 0, "index2": 1}]}'
        jsonObject = json.loads(jsonString)
        
        with self.assertRaises(FileNotFoundError):
            self.sut.trainModel('notExisting', jsonObject)
            

    def test_trainExistingModel(self):
        try:
            self.sut.createModel('test')
            jsonString = '{"recordset1": [{"name": "Piet", "lastname": "Janssen", "age": "18", "country": "NL"}, {"name": "Jan", "lastname": "Pietersen", "age": "19", "country": "BE"}], "recordset2": [{"name": "Henk", "lastname": "van Dijk", "age": "20", "country": "DE"}, {"name": "Piet", "lastname": "Jansen", "age": "18", "country": "NL"}], "golden_matches_index": [{"index1": 0, "index2": 1}]}'
            jsonObject = json.loads(jsonString)
            self.sut.trainModel('test', jsonObject)
        except:
            self.fail()
        
        
    def tearDown(self):
        os.remove('Python_API/RecordLinkage_API/src/main/pickles/test.pkl')
        
            
unittest.main()