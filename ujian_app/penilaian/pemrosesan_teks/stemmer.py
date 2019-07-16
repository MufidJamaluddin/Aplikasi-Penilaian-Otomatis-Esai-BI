from functools import lru_cache
from Sastrawi.Dictionary.ArrayDictionary import ArrayDictionary
from Sastrawi.Stemmer.Stemmer import Stemmer as StemmerSastrawi
from Sastrawi.Stemmer.StemmerFactory import StemmerFactory as StemmerFactorySastrawi

# Override dengan menambahkan method stem_word
# untuk stemming dapat dengan token
class Stemmer(StemmerSastrawi):
    """
    Bertugas untuk Mengubah Kata Menjadi Kata Dasar
    """
    def stem_tokens(self, tokens):
        """
        Stem List Tokens
        IS : List Tokens Belum di Stemming
        FS : List Tokens Telah di Stemming
        """
        stemmed_tokens = [self.stem_word(token) for token in tokens]
        return stemmed_tokens

    @lru_cache()
    def stem_word(self, word):
        return super().stem_word(word)


#   StemmerFactory dilakukan override karena :
#       1. menambahkan LRUCache 
#          (cache dengan konsep First In First Out)
#       2. override CachedStemmer dan Stemmer
class StemmerFactory(StemmerFactorySastrawi):

    def create(self):
        """ 
        Membuat Objek Stemmer
        """
        dictionary = self.__get_root_words_dict()

        stemmer = Stemmer(dictionary)
        return stemmer

    @lru_cache()
    def __get_root_words_dict(self):
        """
        Mendapatkan Daftar Kata Dasar
        Default Sastrawi
        """
        words = super().get_words_from_file()
        dictionary = ArrayDictionary(words)
        return dictionary