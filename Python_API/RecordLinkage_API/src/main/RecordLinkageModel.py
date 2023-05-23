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
        self.nr_of_trainings = 0
        self.indexer = recordlinkage.Index()
        self.indexer.full()
        self.compare = recordlinkage.Compare()
        self.logreg = recordlinkage.LogisticRegressionClassifier()
        self.method = 'jarowinkler'
        self.threshold = 0.85
    
    # Train the model with the recordsets
    # Extracts dataframes and the golden matches index from the JSON input
    def train_model(self, json_df):
        df_a, df_b, golden_matches_index = self.get_dataframe_structure(json_df)
        self.set_compare_column(df_a)
        self.nr_of_trainings = self.nr_of_trainings + 1
        self.logreg.fit(self.get_features(df_a, df_b), golden_matches_index)

    def execute_model(self, json_df):
        df_a, df_b, golden_matches_index = self.get_dataframe_structure(json_df)
        features = self.get_features(df_a, df_b)
        predictions = self.logreg.predict(features)
        return self.filter_matches(predictions)

    # Returns all pairs possible between recordset 1 and recordset 2
    def get_pairs(self, df_a, df_b):
        return self.indexer.index(df_a, df_b)
    
    # Get JSON as input and returns it as panda dataframes
    def get_dataframe_structure(self, json_structure):
        if 'golden_matches_index' not in json_structure:
            return pd.json_normalize(json_structure, record_path = ['recordset']), pd.json_normalize(json_structure, record_path = ['recordset']), None
        else:
            return pd.json_normalize(json_structure, record_path = ['recordset1']), pd.json_normalize(json_structure, record_path = ['recordset2']), pd.MultiIndex.from_frame(pd.json_normalize(json_structure, record_path = ['golden_matches_index']))

    # Set up compares between columns
    def set_compare_column(self, dataframe):
        for column in dataframe:
            self.compare.string(column, column, method=self.method, threshold=self.threshold, label=column)

    # Returns features after the columns are compared
    def get_features(self, df_a, df_b):
        return self.compare.compute(self.get_pairs(df_a, df_b), df_a, df_b)
    
    # Returns matches after filtering out the duplicates or matches with itself
    def filter_matches(self, predictions):
        matches = []
        for match in predictions:
            if match[0] != match[1] and (match[1], match[0]) not in matches:
                matches.append(match)
        return matches