'''
Authors: Lynn, Roward, Diederik
Jira-task: 30 - RecordLinkage installeren in Python, 116 - Model trainen in Python
Sprint: 1, 3
Last modified: 16-05-2023
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
        df_a, df_b, golden_matches_index = self.getDataFrameStructure(json_df)
        self.setCompareColumn(df_a)
        self.nrOfTrainings = self.nrOfTrainings + 1
        self.logreg.fit(self.getFeatures(df_a, df_b), golden_matches_index)

    def executeModel(self, json_df):
        df_a, df_b, golden_matches_index = self.getDataFrameStructure(json_df)
        features = self.getFeatures(df_a, df_b)
        predictions = self.logreg.predict(features)
        return self.filterMatches(predictions)

    # Returns all pairs possible between recordset 1 and recordset 2
    def getPairs(self, df_a, df_b):
        return self.indexer.index(df_a, df_b)
    
    # Get JSON as input and returns it as panda dataframes
    def getDataFrameStructure(self, jsonStructure):
        if 'golden_matches_index' not in jsonStructure:
            return pd.json_normalize(jsonStructure, record_path = ['recordset']), pd.json_normalize(jsonStructure, record_path = ['recordset']), None
        else:
            return pd.json_normalize(jsonStructure, record_path = ['recordset1']), pd.json_normalize(jsonStructure, record_path = ['recordset2']), pd.MultiIndex.from_frame(pd.json_normalize(jsonStructure, record_path = ['golden_matches_index']))

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