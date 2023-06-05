'''
Authors: Lynn, Roward, Diedeirk
Jira-task: 30 - RecordLinkage installeren in Python, 159
Sprint: 1, 4
Last modified: 01-06-2023
'''
import os
import sys
sys.path.insert(0, os.path.abspath(
    os.path.join(os.path.dirname(__file__), '..')))

from main.RecordLinkageModel import RecordLinkageModel
from unittest import TestCase
import unittest
import json
import traceback
from unittest.mock import MagicMock


class test_RecordLinkageModel(TestCase):

    def setUp(self):
        self.sut = RecordLinkageModel()
        jsonString = '{"training": {"datasetA": {"records": [{"data":[{"attributes":{}, "Name": "name1"}]},{"data":[{"attributes":{}, "Name": "name2"}]}]}, "datasetB": {"records": [{"data":[{"attributes":{}, "Name": "nema1"}]},{"data":[{"attributes":{}, "Name": "nema2"}]}]}, "matches": [true, true]}}'
        self.jsonObject = json.loads(jsonString)

    def test_trainModel(self):
        self.sut.get_data_frame_structure = MagicMock(wraps=self.sut.get_data_frame_structure)
        self.sut.set_compare_column = MagicMock(wraps=self.sut.set_compare_column)
        self.sut.get_features = MagicMock(wraps=self.sut.get_features)
        self.sut.get_pairs = MagicMock(wraps=self.sut.get_pairs)

        try:
            self.sut.train_model(self.jsonObject)
        except:
            self.fail('trainModel failed')
        
        self.assertEqual(self.sut.get_data_frame_structure.call_count, 1)
        self.assertEqual(self.sut.set_compare_column.call_count, 1)
        self.assertEqual(self.sut.get_features.call_count, 1)
        self.assertEqual(self.sut.get_pairs.call_count, 1)

if __name__ == '__main__':
    unittest.main()
