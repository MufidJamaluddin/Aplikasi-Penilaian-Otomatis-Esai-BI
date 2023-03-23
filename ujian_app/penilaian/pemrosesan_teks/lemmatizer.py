from nltk.stem import WordNetLemmatizer


# Override dengan menambahkan method stem_word
# untuk stemming dapat dengan token
class Lemmatizer(WordNetLemmatizer):
    """
    Bertugas untuk Mengubah Kata Menjadi Kata Dasar
    """

    def lemmatization_of_tokens(self, tokens):
        """
        Stem List Tokens
        IS : List Tokens Belum di Stemming
        FS : List Tokens Telah di Stemming
        """
        stemmed_tokens = [self.lemmatize(token) for token in tokens]
        return stemmed_tokens


class LemmatizerFactory:

    def create(self):
        """ 
        Membuat Objek Lemmatizer
        """
        return Lemmatizer()
