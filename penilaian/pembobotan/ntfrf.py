from abc import ABC, abstractclassmethod
from math import log
from .tfdata import TfMaxDataStore, DocNumberTermDataStore, RfMaxDataStore

class NtfRfLabeledWeighter(object):
    """
    Bertugas Melakukan Pembobotan Term
    Data Berlabel (Training)

        max_tf_data : Repository buat ngambil nilai Max TF term tertentu
            dari database (berdasarkan term).

        doc_term_data : Repository buat ngambil dokumen positif dan dokumen
            negatif dari database (berdasarkan skor huruf dan term).
    """
    def __init__(self, max_tf_data: TfMaxDataStore, doc_term_data: DocNumberTermDataStore):
        self.max_tf_data = max_tf_data
        self.doc_term_data = doc_term_data

    def calculate_ntf(self, tf:int, term:str):
        """
        Menghitung Normalized Term Frequency (ntf)
        
            NTF = TF / MAX_TF
        """
        ntf = tf / self.max_tf_data.get_max_tf_or_one(term)
        return ntf

    def calculate_rf(self, tf:int, term:str, alphabet_score:str):
        """
        Menghitung Relevance Frequency (rf)

            RF = log10 ( 2 + ( pos / max(1, neg) ) 
        """
        pos = self.doc_term_data.get_doc_num_pos_class(term, alphabet_score)
        neg = self.doc_term_data.get_doc_num_neg_class(term, alphabet_score)
        
        rf = log(2 + (pos / max(1, neg)), 10)

        return rf

    def calculate(self, tf:int, term:str, alphabet_score:str):
        """
        Menghitung Normalized Term Frequency - Relevance Frequency (ntf.rf)

            NTFRF = NTF x RF
        """
        ntf = self.calculate_ntf(tf, term)
        rf = self.calculate_rf(tf, term, alphabet_score)

        ntf_rf = ntf * rf

        return ntf_rf



class NtfRfUnlabeledWeighter(object):
    """
    Bertugas Melakukan Pembobotan Term NTF.RF
    Pada Dataset yang Tidak Berlabel (Fase Pengujian)

        max_tf_data : Repository buat ngambil nilai Max TF term tertentu
            dari database (berdasarkan term).
        
        max_rf_data : Repository buat ngambil nilai Max RF term tertentu 
            dari database (berdasarkan term)
    """
    def __init__(self, max_tf_data: TfMaxDataStore, max_rf_data: RfMaxDataStore):
        self.max_tf_data = max_tf_data
        self.max_rf_data = max_rf_data
    
    def calculate_ntf(self, tf:int, term:str):
        """
        Menghitung Normalized Term Frequency (ntf)
        Data Tidak Berlabel (Data Uji)

            NTF = TF / Max TF
        """
        ntf = tf / self.max_tf_data.get_max_tf_or_one(term)
        return ntf

    def get_max_rf(self, term:str):
        """
        Menghitung Relevance Frequency (rf)
        Data Tidak Berlabel (Data Uji)
        Rumus Category-Independent

            Ambil nilai maksimal RF dari database (berdasarkan term)
        """
        rf = self.max_rf_data.get_max_rf(term)
        return rf
    
    def calculate(self, tf:int, term:str):
        """
        Menghitung NTF.RF Data Tidak Berlabel

            NTFRF = NTF x RF
        """
        tf = self.calculate_ntf(tf, term)
        rf = self.get_max_rf(term)

        tf_rf = tf * rf

        return tf_rf