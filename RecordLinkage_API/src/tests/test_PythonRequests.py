'''
Authors: Lynn, Roward 
Jira-task: 4 - Model aanmaken in python
Sprint: 2
Last modified: 25-04-2023
'''
import os
import sys
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

import unittest
from unittest import TestCase
from unittest.mock import patch
import json
import requests
from main.PythonService import PythonService

class test_PythonRequests(TestCase):
    
    def setUp(self) -> None:
        service = PythonService()
        service.create_model('test')
    
    
    @patch('requests.post')
    def test_trainModel(self, mock_post):
        data = { "record1": { "Name": "Jan" }, "record2": { "Name": "Piet" } }
        response = requests.post('http://localhost:8000/train-model/test', data=json.dumps(data), headers={'Content-type': 'application/json'})
        mock_post.assert_called_with('http://localhost:8000/train-model/test', data=json.dumps(data), headers={'Content-type': 'application/json'})
        
        
    @patch('requests.post')
    def test_createModel(self, mock_post):
        data = {'filename': 'test'}
        response = requests.post('http://localhost:8000/create-model', data=json.dumps(data), headers={'Content-type': 'application/json'})
        mock_post.assert_called_with('http://localhost:8000/create-model', data=json.dumps(data), headers={'Content-type': 'application/json'})
        
    
    @patch('requests.post')
    def test_deleteModel(self, mock_post):
        response = requests.post('http://localhost:8000/delete-model', headers={'Content-type': 'application/json'})
        mock_post.assert_called_with('http://localhost:8000/delete-model', headers={'Content-type': 'application/json'})
        
    
    # def tearDown(self):
    #     os.remove('Python_API/RecordLinkage_API/src/pickles/test.pkl')
        

if __name__ == '__main__':
    unittest.main()