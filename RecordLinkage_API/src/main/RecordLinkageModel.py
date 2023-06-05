'''
Authors: Lynn, Roward, Diederik
Jira-task: 30 - RecordLinkage installeren in Python, 116 - Model trainen in Python
Sprint: 1, 3
Last modified: 05-06-2023
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
        try:
            df_a, df_b, golden_matches_index, nr_of_records = self.get_data_frame_structure(json_df)
            df_a = df_a.iloc[0:nr_of_records]
            df_b = df_b.iloc[0:nr_of_records]
            self.set_compare_column(df_a)
            self.nr_of_trainings = self.nr_of_trainings + 1
            self.logreg.fit(self.get_features(df_a, df_b), golden_matches_index)
        except Exception as e:
            print(e)
        print('Trained')

    def execute_model(self, json_df):
        records = pd.read_csv('main/devData/Leads50k2.csv')
        df = pd.DataFrame(records)
        df = df.astype(str)

        df_a = df.iloc[0:200]
        df_b = df.iloc[0:200]
        features = self.get_features(df_a, df_b)
        predictions = self.logreg.predict(features)
        return self.filter_matches(predictions)

    # Returns all pairs possible between recordset 1 and recordset 2
    def get_pairs(self, df_a, df_b):
        return self.indexer.index(df_a, df_b)
    
    # Get JSON as input and returns it as panda dataframes
    def get_data_frame_structure(self, json_structure):
        dataset_a = {'records': []}
        dataset_b = {'records': []}
        golden_matches_index = []

        for record in json_structure['training']['datasetA']['records']:
            del record['data'][0]['attributes']
            dataset_a['records'].append(record['data'][0])

        for record in json_structure['training']['datasetB']['records']:
            del record['data'][0]['attributes']
            dataset_b['records'].append(record['data'][0])

        for i in range(len(json_structure['training']['matches'])):
            if(json_structure['training']['matches'][i] == True):
                golden_matches_index.append(tuple((i, i)))
        nr_of_records = len(json_structure['training']['matches'])
        return pd.json_normalize(dataset_a['records']), pd.json_normalize(dataset_b['records']), pd.MultiIndex.from_tuples(golden_matches_index), nr_of_records
    
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