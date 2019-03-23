from ujian_app.penilaian.pembobotan.tfmaxdictionary import TfMaxDictionary

class NtfRf(object):
    """
    Bertugas Melakukan Pembobotan Term
    """
    def __init__(self, tf_max_dict: TfMaxDictionary):
        self.tf_max_dict = tf_max_dict

    def calculate_ntf(self, tf:int, feature:str):
        """
        Menghitung Normalized Term Frequency (ntf)
        """
        ntf = tf / self.tf_max_dict.get_max_tf_or_one(feature)
        return ntf

    def calculate_rf(self, tf:int, feature:str):
        """
        Menghitung Relevance Frequency (rf)
        """
        pass

    def calculate(self, features_dict:dict):
        """
        Menghitung Normalized Term Frequency - Relevance Frequency (ntf.rf)
        """
        pass