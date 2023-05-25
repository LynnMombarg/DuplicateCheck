import pandas as pd
import numpy as np
from sklearn.cluster import KMeans
from sklearn.metrics import silhouette_score
from sklearn.feature_extraction.text import TfidfVectorizer



def predict_clusters(features):
    # Calculate silhouette scores for different numbers of clusters
    silhouette_scores = []
    for k in range(2, 7):
        kmeans = KMeans(n_clusters=k)
        kmeans.fit(features)
        labels = kmeans.labels_
        silhouette_scores.append(silhouette_score(features, labels))

    # Find the index of the maximum silhouette score
    optimal_num_clusters = silhouette_scores.index(max(silhouette_scores)) + 2
    return optimal_num_clusters


def predict_thresholds(dataset, features, num_clusters):
    # Initialize and fit the K-means clustering model
    kmeans = KMeans(n_clusters=num_clusters)
    kmeans.fit(features)

    # Predict the cluster labels for each record
    cluster_labels = kmeans.predict(features)

    # Calculate thresholds and column importance for each column within each cluster
    thresholds = {}
    column_importance = {}

    for column in dataset.columns:
        if column in columns_to_cluster:
            column_thresholds = {}
            column_values = dataset[column]

            if pd.api.types.is_numeric_dtype(column_values):  # Check if the column is numeric
                for cluster_id in range(num_clusters):
                    cluster_records = column_values[cluster_labels == cluster_id]
                    column_thresholds[cluster_id] = {
                        'mean': cluster_records.mean(),
                        'median': cluster_records.median(),
                        'std': cluster_records.std()
                    }

                column_importance[column] = np.var(column_values)
            else:
                column_thresholds = None  # Non-numeric columns will have None as threshold
                column_importance[column] = 0  # Non-numeric columns are considered less important

            thresholds[column] = column_thresholds

    return thresholds, column_importance


dataset = pd.read_csv('main/devData/Leads50k.csv')
print(dataset.columns)

columns_to_cluster = dataset.columns[:-1]

# Check the contents of the selected columns
print('Columns to cluster:')
print(dataset[columns_to_cluster])

tfidf_vectorizer = TfidfVectorizer()
features = tfidf_vectorizer.fit_transform(dataset[columns_to_cluster])


num_clusters = predict_clusters(features)
thresholds = predict_thresholds(dataset, features, num_clusters)

print(num_clusters)
print(thresholds)
