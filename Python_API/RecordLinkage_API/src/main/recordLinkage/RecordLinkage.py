import pandas
import recordlinkage
from recordlinkage import datasets

class RecordLinkage:

    def __init__(self):
        self.df_a, self.df_b = datasets.load_febrl4() #Testdata (should be replaced by given data)
        self.indexer = recordlinkage.Index()
        self.compare = recordlinkage.Compare()

    def setIndices(self, indices):
        for index in indices:
            self.indexer.block(index)

    def getCandidateLinks(self):
        return self.indexer.index(self.df_a, self.df_b)

    def setCompareColumn(self, column_df_a: str, column_df_b: str):
        self.compare.exact(column_df_a, column_df_b, label=column_df_a)

    def getFeatures(self):
        return self.compare.compute(self.getCandidateLinks(), self.df_a, self.df_b)

    def getMatchingRecords(self, amountOfMatchingColumns: int):
        return self.getFeatures()[self.getFeatures().sum(axis=1) > amountOfMatchingColumns]