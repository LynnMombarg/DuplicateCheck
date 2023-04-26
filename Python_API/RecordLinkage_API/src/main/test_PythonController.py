'''
Authors: Lynn, Roward 
Jira-task: 4 - Model aanmaken in python
Sprint: 2
Last modified: 25-04-2023
'''

import unittest
from unittest import TestCase
from unittest.mock import patch
import json
import requests
from PythonService import PythonService
from PythonController import PythonController

# Methods will most likely change so tests need to be adapted in the future
# PythonController cannot be imported because it's in a sibling folder
class test_PythonController(TestCase):
    
    def setUp(self) -> None:
        self.sut = PythonController()
    
    @patch('requests.post')
    def test_trainModel(self, mock_post):
        data = { "record1": { "Name": "Jan" }, "record2": { "Name": "Piet" } }
        response = requests.post('http://localhost:8000/train-model/1', data=json.dumps(data), headers={'Content-type': 'application/json'})
        mock_post.assert_called_with('http://localhost:8000/train-model/1', data=json.dumps(data), headers={'Content-type': 'application/json'})
        
    @patch('requests.post')
    def test_createModel(self, mock_post):
        data = {'filename': '1.pkl'}
        response = requests.post('http://localhost:8000/create-model', data=json.dumps(data), headers={'Content-type': 'application/json'})
        mock_post.assert_called_with('http://localhost:8000/create-model', data=json.dumps(data), headers={'Content-type': 'application/json'})
        
    @patch('requests.delete')
    def test_deleteModel(self, mock_delete):
        # Arrange
        # Act
            
        # Assert

unittest.main()