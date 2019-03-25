class TfMaxDataStore(object):
    """
    Menyimpan Nilai TF Maksimum
    """
    def __init__(self):
        self.max_tf_data = {}

    def store_max_tf_feature(self, feature: str, features: dict):
        """
        Menyimpan Nilai TF Maksimum dari Fitur Kombinasi Unigram dan Bigram
        """
        if feature not in self.max_tf_data:
            self.max_tf_data[feature] = features[feature]
        elif self.max_tf_data[feature] < features[feature]:
            self.max_tf_data[feature] = features[feature]

    def get_max_tf_or_one(self, feature: str):
        """
        Mendapatkan Nilai TF Maksimum atau Satu
        Jika Tidak Ada
        """
        return self.max_tf_data.get(feature, 1)

class DocNumberTermDataStore(object):
    """
    Menyimpan Data Jumlah Data Kelas yang Mengandung Term 
    """
    def __init__(self):
        self.doc_num_term_data = {}
        self.doc_num_term_data['A'] = {}
        self.doc_num_term_data['B'] = {}
        self.doc_num_term_data['C'] = {}
        self.doc_num_term_data['D'] = {}
    
    def store_doc_num_term(self, term: str, alphabet_score: str):
        """
        Menghitung Jumlah Dokumen di Kelas Huruf (Skor Alfabet)
        yang Mengandung Term (Parameter Term) Tersebut
        """
        if alphabet_score in self.doc_num_term_data:
            if self.doc_num_term_data[alphabet_score][term] is None:
                self.doc_num_term_data[alphabet_score][term] = 1
            else:
                self.doc_num_term_data[alphabet_score][term] = + 1

    def get_doc_num_pos_class(self, term: str, alphabet_score: str):
        """
        Mendapatkan Jumlah Dokumen Kelas Positif (Kelas Skor Huruf/Alfabet)
        """
        assert (alphabet_score in self.doc_num_term_data), "Skor Huruf (Alphabet Score) Wajib Bernilai A, B, C, atau D."

        doc_num = self.doc_num_term_data[alphabet_score].get(term, 0)
        return doc_num
    
    def get_doc_num_neg_class(self, term: str, alphabet_score: str):
        """
        Mendapatkan Jumlah Dokumen Kelas Negatif (Kelas Skor Huruf/Alfabet)
        """
        assert (alphabet_score in self.doc_num_term_data), "Skor Huruf (Alphabet Score) Wajib Bernilai A, B, C, atau D."

        doc_num = 0
        for temp_score in self.doc_num_term_data:
            if not alphabet_score is temp_score:
                doc_num =+ self.doc_num_term_data[temp_score].get(term, 0)

        return doc_num