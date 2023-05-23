'''
Authors: Diederik
Jira-task: 116 - Model trainen in Python
Sprint: 3
Last modified: 16-05-2023
'''

import csv

headers = []

trainDataCSV = './traindata.csv'

with open(trainDataCSV, newline='') as csvfile:
    reader = csv.reader(csvfile)
    headers = next(reader)

def get_train_recordset1():
    recordset1 = []
    with open(trainDataCSV, newline='') as csvfile:
        reader = csv.reader(csvfile)
        next(reader)
        for row in reader:
            if len(recordset1) < 10:
                recordset1.append(dict(zip(headers, row)))
    return recordset1

def get_train_recordset2():
    recordset2 = []
    with open(trainDataCSV, newline='') as csvfile:
        reader = csv.reader(csvfile)
        for i in range(11):
            next(reader)
        for row in reader:
            if len(recordset2) < 10:
                recordset2.append(dict(zip(headers, row)))
    return recordset2

def get_test_recordset():
    recordset = []
    with open(trainDataCSV, newline='') as csvfile:
        reader = csv.reader(csvfile)
        next(reader)
        for row in reader:
            recordset.append(dict(zip(headers, row)))
    return recordset

def get_train_data():
    recordset1 = get_train_recordset1()
    recordset2 = get_train_recordset2()
    json = {
        "recordset1": recordset1
        ,
        "recordset2": recordset2
        ,
        "golden_matches_index": [
            {"index1": 0, "index2": 0},
            {"index1": 1, "index2": 1},
            {"index1": 3, "index2": 3},
            {"index1": 4, "index2": 4},
            {"index1": 5, "index2": 5},
            {"index1": 6, "index2": 6},
            {"index1": 7, "index2": 7},
            {"index1": 8, "index2": 8}
        ]
    }
    return json

def get_test_data():
    recordset = get_test_recordset()
    json = {
        "recordset": recordset
    }
    return json