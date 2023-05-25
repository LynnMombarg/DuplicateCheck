'''
Authors: Lynn, Roward, Diederik
Jira-task: 30 - RecordLinkage installeren in Python, 116 - Model trainen in Python
Sprint: 1, 3
Last modified: 23-05-2023
'''

import pandas as pd
import recordlinkage

class RecordLinkageModel:
    
    # Setup variables for the model
    def __init__(self):
        #Filename is an unique UUID string (identifier)
        self.nrOfTrainings = 0
        self.indexer = recordlinkage.Index()
        self.indexer.full()
        self.compare = recordlinkage.Compare()
        self.logreg = recordlinkage.LogisticRegressionClassifier()
        self.method = 'jarowinkler'
        self.threshold = 0.85
    
    # Train the model with the recordsets
    # Extracts dataframes and the golden matches index from the JSON input
    def trainModel(self, json_df):
        df_a, df_b, golden_matches_index, nr_of_records = self.getDataFrameStructure(json_df)
        df_a = df_a.iloc[0:nr_of_records]
        df_b = df_b.iloc[0:nr_of_records]
        self.setCompareColumn(df_a)
        print(df_a)
        print(df_b)
        self.nrOfTrainings = self.nrOfTrainings + 1
        self.logreg.fit(self.getFeatures(df_a, df_b), golden_matches_index)
        print('Trained')

    def executeModel(self, json_df):
        records = pd.read_csv('main/devData/Leads50k2.csv')
        df = pd.DataFrame(records)
        df = df.astype(str)

        df_a = df.iloc[0:200]
        df_b = df.iloc[0:200]
        features = self.getFeatures(df_a, df_b)
        predictions = self.logreg.predict(features)
        return self.filterMatches(predictions)

    # Returns all pairs possible between recordset 1 and recordset 2
    def getPairs(self, df_a, df_b):
        return self.indexer.index(df_a, df_b)
    
    # Get JSON as input and returns it as panda dataframes
    def getDataFrameStructure(self, jsonStructure):
        datasetA = {'records': []}
        datasetB = {'records': []}
        golden_matches_index = []

        for record in jsonStructure['training']['datasetA']['records']:
            del record['data'][0]['attributes']
            datasetA['records'].append(record['data'][0])

        for record in jsonStructure['training']['datasetB']['records']:
            del record['data'][0]['attributes']
            datasetB['records'].append(record['data'][0])

        for i in range(len(jsonStructure['training']['matches'])):
            if(jsonStructure['training']['matches'][i] == True):
                golden_matches_index.append(tuple((i, i)))
        nr_of_records = len(jsonStructure['training']['matches'])
        return pd.json_normalize(datasetA['records']), pd.json_normalize(datasetB['records']), pd.MultiIndex.from_tuples(golden_matches_index), nr_of_records
    
    # Set up compares between columns
    def setCompareColumn(self, dataframe):
        for column in dataframe:
            self.compare.string(column, column, method=self.method, threshold=self.threshold, label=column)

    # Returns features after the columns are compared
    def getFeatures(self, df_a, df_b):
        return self.compare.compute(self.getPairs(df_a, df_b), df_a, df_b)
    
    # Returns matches after filtering out the duplicates or matches with itself
    def filterMatches(self, predictions):
        matches = []
        for match in predictions:
            if match[0] != match[1]:
                if (match[1], match[0]) not in matches:
                    matches.append(match)
        return matches