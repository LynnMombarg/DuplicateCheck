'''
Authors: Lynn, Roward 
Jira-task: 30 - RecordLinkage installeren in Python
Sprint: 1
Last modified: 19-04-2023
Status: doing
'''
import pandas as pd
import recordlinkage
import os

class RecordLinkageModel:
    # Setup variables for the model
    def __init__(self, filename):
        self.filename = filename
        self.nrOfTrainings = 0
        self.indexer = recordlinkage.Index()
        self.indexer.full()
        self.compare = recordlinkage.Compare()
        self.logreg = recordlinkage.LogisticRegressionClassifier()
    
    # Train the model with the recordsets
    # Extracts dataframes and the golden matches index from the JSON input
    def trainModel(self, json_df):
        df_a, df_b, golden_matches_index = self.getDataFrameStructure(json_df)
        self.setCompareColumn(df_a)
        self.nrOfTrainings = self.nrOfTrainings + 1
        self.logreg.fit(self.getFeatures(df_a, df_b), golden_matches_index)

    # Returns all pairs possible between recordset 1 and recordset 2
    def getPairs(self, df_a, df_b):
        return self.indexer.index(df_a, df_b)
    
    # Get JSON as input and returns it as panda dataframes
    def getDataFrameStructure(self, jsonStructure):
        return pd.json_normalize(jsonStructure, record_path = ['recordset1']), pd.json_normalize(jsonStructure, record_path = ['recordset2']), pd.MultiIndex.from_frame(pd.json_normalize(jsonStructure, record_path = ['golden_matches_index']))

    # Set up compares between columns
    def setCompareColumn(self, dataframe):
        for column in dataframe:
            self.compare.string(column, column, method="jarowinkler", threshold=0.85, label=column)

    # Returns features after the columns are compared
    def getFeatures(self, df_a, df_b):
        return self.compare.compute(self.getPairs(df_a, df_b), df_a, df_b)
    
    def deleteModel(self):
        os.remove(self.filename) 