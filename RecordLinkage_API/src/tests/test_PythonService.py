'''
Authors: Lynn, Diederik
Jira-task: 4 - Model aanmaken in python, 159
Sprint: 2, 4
Last modified: 01-06-2023
'''

import os
import sys
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

import unittest
from unittest import TestCase
import json
from main.PythonService import PythonService
from main.RecordLinkageModel import RecordLinkageModel
from unittest.mock import patch
import pickle


class test_PythonService(TestCase):
    
    def setUp(self):
        self.model_id = 'test'
        self.sut = PythonService()
        self.service = PythonService()
        model = RecordLinkageModel()
        filehandler = open('main/pickles/' + self.model_id + '.pkl', 'wb')
        pickle.dump(model, filehandler)
    
    def test_create_model(self):
        try:
            self.sut.create_model('test1')
        except:
            self.fail()

    def test_load_model(self):
        try:
            self.sut.load_model('test')
        except Exception as e:
            print(e)
            self.fail()

    def test_load_not_existing_model(self):
        with self.assertRaises(FileNotFoundError):
            self.sut.load_model('notExisting')
    
    def test_delete_model(self):
        try:
            self.sut.delete_model('test')
        except:
            self.fail()
            

    def test_train_model(self):
        try:
            jsonString = '{"recordset1": [{"name": "Piet", "lastname": "Janssen", "age": "18", "country": "NL"}, {"name": "Jan", "lastname": "Pietersen", "age": "19", "country": "BE"}], "recordset2": [{"name": "Henk", "lastname": "van Dijk", "age": "20", "country": "DE"}, {"name": "Piet", "lastname": "Jansen", "age": "18", "country": "NL"}], "golden_matches_index": [{"index1": 0, "index2": 1}]}'
            jsonObject = json.loads(jsonString)
            self.sut.train_model('test', jsonObject)
        except:
            self.fail()
        
        
    # def tearDown(self):
        # os.remove('RecordLinkage_API/src/pickles/test.pkl')
        
            
if __name__ == '__main__':
    unittest.main()