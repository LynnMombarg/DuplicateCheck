'''
Authors: Lynn
Jira-task: 179
Sprint: 4
Last modified: 02-06-2023
'''

import os
import sys
sys.path.insert(0, os.path.abspath(
    os.path.join(os.path.dirname(__file__), '..')))

from main.BlobStorageDAO import BlobStorageDAO
from unittest import TestCase
import unittest
from unittest.mock import MagicMock


class test_BlobStorageDAO(TestCase):
    
    def setUp(self):
        self.sut = BlobStorageDAO()
        self.model_id = 'test_model_id'
        # self.sut.list_containers = MagicMock()
        self.sut.create_blob = MagicMock()
        self.sut.download_blob_to_pickle = MagicMock()
        self.sut.delete_blob = MagicMock()
        self.sut.overwrite_blob = MagicMock()
        
    # def test_list_containers(self):
    #     try:
    #         self.sut.list_containers()
    #     except:
    #         self.fail()
    #     self.sut.list_containers.assert_called_once_with()
        
    def test_upload_blob(self):
        try:
            self.sut.create_blob(self.model_id)
        except:
            self.fail()
        self.sut.create_blob.assert_called_once_with('test_model_id')
        
    def test_download_blob_to_pickle(self):
        try:
            self.sut.download_blob_to_pickle(self.model_id)
        except:
            self.fail()
        self.sut.download_blob_to_pickle.assert_called_once_with('test_model_id')
        
    def test_delete_blob(self):
        try:
            self.sut.delete_blob(self.model_id)
        except:
            self.fail()
        self.sut.delete_blob.assert_called_once_with('test_model_id')
        
    def test_overwrite_blob(self):
        try:
            self.sut.overwrite_blob(self.model_id)
        except:
            self.fail()
        self.sut.overwrite_blob.assert_called_once_with('test_model_id')
        
        
if __name__ == '__main__':
    unittest.main()
            
