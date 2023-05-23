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
from unittest.mock import patch, MagicMock
from fastapi.testclient import TestClient
import json
import requests
from main.PythonService import PythonService
from main.PythonController import app

# Methods will most likely change so tests need to be adapted in the future
# PythonController cannot be imported because it's in a sibling folder
class test_PythonController(TestCase):
    
    @patch('main.PythonService.PythonService')
    def setUp(self, mock_python_service):
        self.mock_service_instance = mock_python_service.return_value
        self.client = TestClient(app)

    def test_create_model(self):
        # Mock the create_model method of the PythonService
        self.mock_service_instance.create_model.return_value = None

        # Send the request to the API endpoint
        response = self.client.post('/create-model/test')

        # Assert the response status code and content
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.text, 'Model created!')

        # Assert that the create_model method was called with the correct arguments
        self.mock_service_instance.create_model.assert_called_with('test')
    

    def test_train_model(self):
        # Mock the train_model method of the PythonService
        self.mock_service_instance.train_model.return_value = None

        # Prepare the request payload
        data = {
            "recordset1": [{"columns": "value1"}, {"columns": "value2"}],
            "recordset2": [{"columns": "value3"}, {"columns": "value4"}],
            "golden_matches_index": [{"index1": 1, "index2": 2}]
        }

        # Send the request to the API endpoint
        response = self.client.put('/train-model/test', json=data)

        # Assert the response status code and content
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.text, 'Model trained!')

        # Assert that the train_model method was called with the correct arguments
        self.mock_service_instance.train_model.assert_called_with('test', data)
    
    def test_delete_model(self):
        # Mock the delete_model method of the PythonService
        self.mock_service_instance.delete_model.return_value = None

        # Send the request to the API endpoint
        response = self.client.delete('/delete-model/test')

        # Assert the response status code and content
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.text, 'Model deleted!')

        # Assert that the delete_model method was called with the correct arguments
        self.mock_service_instance.delete_model.assert_called_with('test')

if __name__ == '__main__':
    unittest.main()