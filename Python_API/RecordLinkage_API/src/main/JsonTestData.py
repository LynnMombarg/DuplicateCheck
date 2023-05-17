'''
Authors: Diederik
Jira-task: 116 - Model trainen in Python
Sprint: 3
Last modified: 16-05-2023
'''

import csv

headers = []

with open('main/devData/traindata.csv', newline='') as csvfile:
    reader = csv.reader(csvfile)
    headers = next(reader)

def getTrainRecordset1():
    recordset1 = []
    with open('main/devData/traindata.csv', newline='') as csvfile:
        reader = csv.reader(csvfile)
        next(reader)
        for row in reader:
            if len(recordset1) < 10:
                recordset1.append(dict(zip(headers, row)))
    return recordset1

def getTrainRecordset2():
    recordset2 = []
    with open('main/devData/traindata.csv', newline='') as csvfile:
        reader = csv.reader(csvfile)
        for i in range(11):
            next(reader)
        for row in reader:
            if len(recordset2) < 10:
                recordset2.append(dict(zip(headers, row)))
    return recordset2

def getTestRecordset():
    recordset = []
    with open('main/devData/testdata.csv', newline='') as csvfile:
        reader = csv.reader(csvfile)
        next(reader)
        for row in reader:
            recordset.append(dict(zip(headers, row)))
    return recordset

def getTrainData():
    recordset1 = getTrainRecordset1()
    recordset2 = getTrainRecordset2()
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

def getTestData():
    recordset = getTestRecordset()
    json = {
        "recordset": recordset
    }
    return json