'''
Authors: Lynn, Roward 
Jira-task: 4 - Model aanmaken in python, 111 - Model pickle file verwijderen Python
Sprint: 2
Last modified: 9-5-2023
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

# Methods will most likely change so tests need to be adapted in the future
# PythonController cannot be imported because it's in a sibling folder
class test_PythonController(TestCase):
    
    def setUp(self) -> None:
        service = PythonService()
        service.createModel('test')
    
    
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
        
    
    def tearDown(self):
        os.remove('Python_API/RecordLinkage_API/src/main/pickles/test.pkl')
        

unittest.main()