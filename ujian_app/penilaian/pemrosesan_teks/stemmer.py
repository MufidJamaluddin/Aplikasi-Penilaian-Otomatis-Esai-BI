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
    @lru_cache
    def stem_word(self, word):
        """Stem Kata"""
        if self.is_plural(word):
            return self.stem_plural_word(word)
        else:
            return self.stem_singular_word(word)

    def stem_tokens(self, tokens):
        """
        Stem List Tokens
        """
        stemmed_tokens = []
        for token in tokens:
            if not token or token.strip() == '':
                continue
            stemmed_tokens.append(self.stem_word(token))
        return stemmed_tokens

#   StemmerFactory dilakukan override karena :
#       1. menambahkan LRUCache pada production
#       2. override CachedStemmer dan Stemmer
class StemmerFactory(StemmerFactorySastrawi):

    def create(self):
        """ 
        Membuat Stemmer
        """
        dictionary = self.get_root_words_dict()

        stemmer = Stemmer(dictionary)
        return stemmer

    @lru_cache
    def get_root_words_dict(self):
        """
        Mendapatkan Kata Dasar
        """
        words = self.get_words_from_file()
        dictionary = ArrayDictionary(words)
        return dictionary