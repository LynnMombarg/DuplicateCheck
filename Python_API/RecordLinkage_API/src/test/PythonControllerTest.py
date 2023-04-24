import unittest
from main.PythonController import PythonController

class PythonControllerTest(unittest.TestCase):
    
    # No success
    def trainModelTest(self):
        sut = PythonController()
        expected = 'Model trained!'
        
        actual = sut.trainModel(1, '{ "record1": { "Name": "Jan" }, "record2": { "Name": "Piet" } }')
        
        self.assertEqual(actual, expected)
        