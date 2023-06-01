'''
Authors: Lynn, Diederik
Jira-task: 4 - Model aanmaken in python, 159
Sprint: 2, 4
Last modified: 01-06-2023
'''
import os
import sys
sys.path.insert(0, os.path.abspath(
    os.path.join(os.path.dirname(__file__), '..')))

import traceback
import pickle
from unittest.mock import MagicMock
from main.RecordLinkageModel import RecordLinkageModel
from main.PythonService import PythonService
import json
from unittest import TestCase
import unittest


file_path = os.path.join(os.path.dirname(__file__), '..', 'main', 'pickles')


class test_PythonService(TestCase):

    def setUp(self):
        self.model_id = 'test'
        self.service = PythonService()
        self.service.create_model = MagicMock()
        self.service.load_model = MagicMock()
        self.service.save_model = MagicMock()
        self.service.delete_model = MagicMock()
        self.service.train_model = MagicMock()
        self.service.execute_model = MagicMock()
        self.service.execute_model_on_records = MagicMock()

    def test_create_model(self):
        try:
            self.service.create_model('test')
        except:
            self.fail()
        self.service.create_model.assert_called_once_with('test')
    
    def test_create_model_create_file(self):
        self.service.create_model('test1')

    def test_load_model(self):
        try:
            self.service.load_model('test')
        except:
            self.fail()
        self.service.load_model.assert_called_once_with('test')

    def test_delete_model(self):
        try:
            self.service.delete_model('test')
        except:
            self.fail()
        self.service.delete_model.assert_called_once_with('test')

    def test_train_model(self):
        try:
            jsonString = '{"recordset1": [{"name": "Piet", "lastname": "Janssen", "age": "18", "country": "NL"}, {"name": "Jan", "lastname": "Pietersen", "age": "19", "country": "BE"}], "recordset2": [{"name": "Henk", "lastname": "van Dijk", "age": "20", "country": "DE"}, {"name": "Piet", "lastname": "Jansen", "age": "18", "country": "NL"}], "golden_matches_index": [{"index1": 0, "index2": 1}]}'
            jsonObject = json.loads(jsonString)
            self.service.train_model('test', jsonObject)
        except:
            self.fail()
        self.service.train_model.assert_called_once_with('test', jsonObject)

    # def tearDown(self):
        # os.remove('RecordLinkage_API/src/pickles/test.pkl')


if __name__ == '__main__':
    unittest.main()
