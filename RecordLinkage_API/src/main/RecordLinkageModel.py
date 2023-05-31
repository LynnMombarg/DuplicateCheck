'''
Authors: Lynn, Roward, Diederik
Jira-task: 30 - RecordLinkage installeren in Python, 116 - Model trainen in Python
Sprint: 1, 3
Last modified: 23-05-2023
'''

import pandas as pd
import recordlinkage
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.datasets import load_iris
from sklearn.linear_model import LogisticRegression

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
        self.thresholds = {}
    
    # Train the model with the recordsets
    # Extracts dataframes and the golden matches index from the JSON input
    def train_model(self, json_df):
        df_a, df_b, golden_matches_index, nr_of_records = self.get_data_frame_structure(json_df)
        df_a = df_a.iloc[0:nr_of_records]
        df_b = df_b.iloc[0:nr_of_records]
        self.set_compare_column(df_a)
        self.nr_of_trainings = self.nr_of_trainings + 1
        self.logreg.fit(self.get_features(df_a, df_b), golden_matches_index)

    def execute_model(self, json_df):
        record_a = json_df['record1']
        del record_a['attributes']
        record_b = json_df['record2']
        del record_b['attributes']
        features = self.get_features(pd.json_normalize(record_a), pd.json_normalize(record_b))
        predictions = self.logreg.predict(features)
        is_match = (predictions.empty is False) 
        percentage = self.logreg.prob(features).iloc[0]
        return is_match, percentage

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
        self.compare = recordlinkage.Compare()
        for column in dataframe:
            thresholds = self.thresholds.get(column)
            weighted_average_threshold = 0.85

            if thresholds is not None:
                weighted_average_threshold = np.average([threshold['threshold'] for threshold in thresholds], weights=[threshold['weight'] for threshold in thresholds])

            self.compare.string(column, column, method=self.method, threshold=weighted_average_threshold, label=column)

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
    
    # Train the unsupervised model to determine thresholds for each column
    def train_unsupervised_model(self, json_df):
        df_a, df_b, _, nr_of_records = self.get_data_frame_structure(json_df)
        weight = len(df_a)
        df_a = df_a.iloc[0:nr_of_records]
        df_b = df_b.iloc[0:nr_of_records]
        df = pd.concat([df_a, df_b], axis=0).reset_index(drop=True)
        self.calculate_thresholds(df, (nr_of_records/weight))

    # Calculate thresholds for each column using text classification
    def calculate_thresholds(self, dataframe, weight, starting_threshold=1):
        # preprocess the text data
        dataframe = dataframe.applymap(lambda s: s.lower() if type(s) == str else s)
        dataframe = dataframe.applymap(lambda s: s.strip() if type(s) == str else s)
        dataframe = dataframe.applymap(lambda s: s.replace(' ', '_') if type(s) == str else s)

        # Initialize the TF-IDF vectorizer
        tfidf_vectorizer = TfidfVectorizer()

        thresholds = {}

        # Iterate over each column
        for column in dataframe.columns:
            # Extract the text data from the column
            text_data = dataframe[column].values.astype(str)

            # Calculate TF-IDF matrix for the column
            tfidf_matrix = tfidf_vectorizer.fit_transform(text_data)

            # Calculate pairwise cosine similarity
            similarity_matrix = cosine_similarity(tfidf_matrix, tfidf_matrix)

            # Flatten the similarity matrix to a 1D array
            similarities = similarity_matrix.flatten()

            # Exclude self-similarities (diagonal elements)
            similarities = similarities[similarities != 1.0]

            # Calculate the average similarity
            values = [i for i in np.unique(similarities)]
            total = starting_threshold
            average = 0.5
            if len(values) > 0:
                for value in values:
                    total = total + value
                average = total / (len(values) + 1)
            
            # Set the threshold for the column
            thresholds[column] = round(average, 2)
            
        # Append the thresholds to the thresholds dictionary
        thresholds = {k: {'thresholds': [{'threshold': v, 'weight': weight}]} for k, v in sorted(thresholds.items(), key=lambda item: item[1])}
        for key in thresholds:
            if key in self.thresholds:
                self.thresholds[key].append(thresholds[key]['thresholds'][0])
            else:
                self.thresholds[key] = thresholds[key]['thresholds']