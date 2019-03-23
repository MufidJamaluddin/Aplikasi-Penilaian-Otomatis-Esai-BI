class TfMaxDictionary(object):
    """
    Menyimpan Nilai TF Maksimum
    """
    def __init__(self):
        self.dictionary = {}

    def store_max_tf_features(self, features: dict):
        """
        Menyimpan Nilai TF Maksimum dari Fitur Kombinasi Unigram dan Bigram
        """
        for feature in features:
            if feature not in self.dictionary:
                self.dictionary[feature] = features[feature]
            elif self.dictionary[feature] < features[feature]:
                self.dictionary[feature] = features[feature]

    def get_max_tf_or_one(self, feature: str):
        """
        Mendapatkan Nilai TF Maksimum atau Satu
        Jika Tidak Ada
        """
        return self.dictionary.get(feature, 1)