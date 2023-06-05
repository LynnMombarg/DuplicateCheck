'''
Authors: Lynn, Roward, Diederik
Jira-task: 4 - Model aanmaken in python, 159
Sprint: 2, 4
Last modified: 01-06-2023
'''
import os
import sys
sys.path.insert(0, os.path.abspath(
    os.path.join(os.path.dirname(__file__), '..')))

from main.PythonController import app
from main.PythonService import PythonService
import requests
import json
from fastapi.testclient import TestClient
from unittest.mock import MagicMock
from unittest import TestCase
import unittest


class TestPythonController(TestCase):
    def setUp(self):
        self.mock_service_instance = MagicMock(spec=PythonService)
        PythonService.create_model = self.mock_service_instance.create_model
        PythonService.train_model = self.mock_service_instance.train_model
        PythonService.delete_model = self.mock_service_instance.delete_model
        PythonService.execute_model_on_records = self.mock_service_instance.execute_model_on_records
        self.client = TestClient(app)

    def test_create_model_success(self):
        self.mock_service_instance.create_model.return_value = None
        json_data = {'modelId': 'test'}

        response = self.client.post('/create-model', json=json_data)

        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.text, '"Model created!"')
        self.mock_service_instance.create_model.assert_called_once_with('test')

    def test_create_model_failure(self):
        self.mock_service_instance.create_model.side_effect = Exception()
        json_data = {'modelId': 'test'}

        response = self.client.post('/create-model', json=json_data)

        self.assertEqual(response.status_code, 400)
        self.assertEqual(
            response.json()['detail'], 'Model could not be created')
        self.mock_service_instance.create_model.assert_called_once_with('test')

    def test_train_model_success(self):
        self.mock_service_instance.train_model.return_value = None
        data = {
            "recordset1": [{"columns": "value1"}, {"columns": "value2"}],
            "recordset2": [{"columns": "value3"}, {"columns": "value4"}],
            "golden_matches_index": [{"index1": 1, "index2": 2}]
        }

        response = self.client.put('/train-model/test', json=data)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.text, '"Model trained!"')
        self.mock_service_instance.train_model.assert_called_once_with(
            'test', data)
        
    def test_train_model_failure(self):
        self.mock_service_instance.train_model.side_effect = Exception()
        data = {
            "recordset1": [{"columns": "value1"}, {"columns": "value2"}],
            "recordset2": [{"columns": "value3"}, {"columns": "value4"}],
            "golden_matches_index": [{"index1": 1, "index2": 2}]
        }

        response = self.client.put('/train-model/test', json=data)

        self.assertEqual(response.status_code, 500)
        self.assertEqual(
            response.json()['detail'], 'Model could not be trained')
        self.mock_service_instance.train_model.assert_called_once_with(
            'test', data)

    def test_delete_model_success(self):
        self.mock_service_instance.delete_model.return_value = None
        response = self.client.delete('/delete-model/test')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.text, '"Model deleted!"')
        self.mock_service_instance.delete_model.assert_called_once_with('test')

    def test_delete_model_failure(self):
        self.mock_service_instance.delete_model.side_effect = Exception()

        response = self.client.delete('/delete-model/test')

        self.assertEqual(response.status_code, 404)
        self.assertEqual(
            response.json()['detail'], 'Model could not be deleted')
        self.mock_service_instance.delete_model.assert_called_once_with('test')

    def test_execute_model_on_records_success(self):
        self.mock_service_instance.execute_model_on_records.return_value = None
        data = {
            "recordset1": [{"columns": "value1"}, {"columns": "value2"}],
            "recordset2": [{"columns": "value3"}, {"columns": "value4"}]
        }

        response = self.client.post('/execute-model-on-records/test', json=data)

        self.assertEqual(response.status_code, 200)
        self.mock_service_instance.execute_model_on_records.assert_called_once_with(
            'test', data)
        
    def test_execute_model_on_records_failure(self):
        self.mock_service_instance.execute_model_on_records.side_effect = Exception()
        data = {
            "recordset1": [{"columns": "value1"}, {"columns": "value2"}],
            "recordset2": [{"columns": "value3"}, {"columns": "value4"}]
        }

        response = self.client.post('/execute-model-on-records/test', json=data)

        self.assertEqual(response.status_code, 500)
        self.assertEqual(
            response.json()['detail'], 'Model could not be executed')
        self.mock_service_instance.execute_model_on_records.assert_called_once_with(
            'test', data)


if __name__ == '__main__':
    unittest.main()
