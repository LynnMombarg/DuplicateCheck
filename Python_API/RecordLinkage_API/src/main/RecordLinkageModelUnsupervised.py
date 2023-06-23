import pandas as pd
from sklearn.cluster import KMeans
from sklearn.metrics import silhouette_score

def predict_clusters(features):
    # Calculate silhouette scores for different numbers of clusters
    silhouette_scores = []
    for k in range(2, 10):
        kmeans = KMeans(n_clusters=k)
        kmeans.fit(features)
        labels = kmeans.labels_
        silhouette_scores.append(silhouette_score(features, labels))

    # Find the index of the maximum silhouette score
    optimal_num_clusters = silhouette_scores.index(max(silhouette_scores)) + 2
    return optimal_num_clusters


def predict_thresholds(dataset, features):
    # Preprocess and extract features from the selected columns
    # Apply appropriate preprocessing and feature extraction techniques

    # Initialize and fit the K-means clustering model
    kmeans = KMeans(n_clusters=3)  # Specify the desired number of clusters
    kmeans.fit(features)

    # Predict the cluster labels for each record
    cluster_labels = kmeans.predict(features)

    # Calculate thresholds for each column within each cluster
    thresholds = {}
    for column in features:
        column_thresholds = {}
        for cluster_id in range(kmeans.n_clusters):
            cluster_records = dataset[cluster_labels == cluster_id]
            column_values = cluster_records[column]
            column_thresholds[cluster_id] = {
                'mean': column_values.mean(),
                'median': column_values.median(),
                'std': column_values.std()
            }
        thresholds[column] = column_thresholds


dataset = pd.read_csv('main/devData/Leads50k.csv')
features = []
for column in dataset.columns:
    features.append(column)
print(features)
amount_of_clusters = predict_clusters(features)
