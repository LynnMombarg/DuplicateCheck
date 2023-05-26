'''
Authors: Lynn, Roward, Diederik
Jira-task: 30 - RecordLinkage installeren in Python, 116 - Model trainen in Python
Sprint: 1, 3
Last modified: 23-05-2023
'''

import pandas as pd
import numpy as np
import recordlinkage
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

class RecordLinkageModel:
    
    # Setup variables for the model
    def __init__(self):
        # Filename is a unique UUID string (identifier)
        self.nrOfTrainings = 0
        self.indexer = recordlinkage.Index()
        self.indexer.full()
        self.compare = recordlinkage.Compare()
        self.logreg = recordlinkage.LogisticRegressionClassifier()
        self.method = 'cosine'
        self.thresholds = {}
    
    # Train the model with the recordsets
    # Extract dataframes and the golden matches index from the JSON input
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
    
    # Get JSON as input and return it as panda dataframes
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
            if jsonStructure['training']['matches'][i] == True:
                golden_matches_index.append(tuple((i, i)))
        nr_of_records = len(jsonStructure['training']['matches'])
        return pd.json_normalize(datasetA['records']), pd.json_normalize(datasetB['records']), pd.MultiIndex.from_tuples(golden_matches_index), nr_of_records
    
    # Set up compares between columns
    def setCompareColumn(self, dataframe):
        for column in dataframe:
            thresholds = self.thresholds.get(column)
            weighted_average_threshold = 0.85
            if thresholds is not None:
                weighted_average_threshold = np.average([threshold['threshold'] for threshold in thresholds], weights=[threshold['weight'] for threshold in thresholds])
            print(weighted_average_threshold)
            self.compare.string(column, column, method=self.method, threshold=weighted_average_threshold, label=column)

    # Returns features after the columns are compared
    def getFeatures(self, df_a, df_b):
        return self.compare.compute(self.getPairs(df_a, df_b), df_a, df_b)
    
    # Returns matches after filtering out duplicates or matches with itself
    def filterMatches(self, predictions):
        matches = []
        for match in predictions:
            if match[0] != match[1]:
                if (match[1], match[0]) not in matches:
                    matches.append(match)
        return matches

    # Train the unsupervised model to determine thresholds for each column
    def trainUnsupervisedModel(self, json_df):
        df_a, df_b, _, nr_of_records = self.getDataFrameStructure(json_df)
        df_a = df_a.iloc[0:nr_of_records]
        df_b = df_b.iloc[0:nr_of_records]
        df = pd.concat([df_a, df_b], axis=0).reset_index(drop=True)
        self.calculateThresholds(df, nr_of_records)

    # Calculate thresholds for each column using text classification
    def calculateThresholds(self, dataframe, weight, starting_threshold=1):
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
            print(round(average, 2))
            
            # Set the threshold for the column
            thresholds[column] = round(average, 2)
            
        # Append the thresholds to the thresholds dictionary
        thresholds = {k: {'thresholds': [{'threshold': v, 'weight': weight}]} for k, v in sorted(thresholds.items(), key=lambda item: item[1])}
        for key in thresholds:
            if key in self.thresholds:
                self.thresholds[key].append(thresholds[key]['thresholds'][0])
            else:
                self.thresholds[key] = thresholds[key]['thresholds']
        print(self.thresholds)
