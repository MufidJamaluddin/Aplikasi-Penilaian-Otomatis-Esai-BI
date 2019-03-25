from .tfdata import TfMaxDataStore, DocNumberTermDataStore
from math import log

class NtfRfWeighter(object):
    """
    Bertugas Melakukan Pembobotan Term
    """

    def __init__(self, max_tf_data: TfMaxDataStore, doc_term_data: DocNumberTermDataStore):
        self.max_tf_data = max_tf_data
        self.doc_term_data = doc_term_data

    def calculate_ntf(self, tf:int, term:str):
        """
        Menghitung Normalized Term Frequency (ntf)
        """
        ntf = tf / self.max_tf_data.get_max_tf_or_one(term)
        return ntf

    def calculate_rf(self, tf:int, term:str, alphabet_score:str):
        """
        Menghitung Relevance Frequency (rf)
        """
        pos = self.doc_term_data.get_doc_num_pos_class(term, alphabet_score)
        neg = self.doc_term_data.get_doc_num_neg_class(term, alphabet_score)
        
        rf = log(2 + (pos / max(1, neg)), 10)

        return rf

    def calculate(self, tf:int, term:str, alphabet_score:str):
        """
        Menghitung Normalized Term Frequency - Relevance Frequency (ntf.rf)
        """
        ntf = self.calculate_ntf(tf, term)
        rf = self.calculate_rf(tf, term, alphabet_score)

        ntf_rf = ntf * rf

        return ntf_rf