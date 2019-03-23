from functools import lru_cache
from Sastrawi.Dictionary.ArrayDictionary import ArrayDictionary
from Sastrawi.Stemmer.Cache.ArrayCache import ArrayCache
from Sastrawi.Stemmer.Stemmer import Stemmer as StemmerSastrawi
from Sastrawi.Stemmer.StemmerFactory import StemmerFactory as StemmerFactorySastrawi
from Sastrawi.Stemmer.CachedStemmer import CachedStemmer as CachedStemmerSastrawi

# Override dengan menambahkan method stem_word
# untuk stemming hanya satu kata
class Stemmer(StemmerSastrawi):
    
    def stem_word(self, word):
        """Stem Kata"""
        if self.is_plural(word):
            return self.stem_plural_word(word)
        else:
            return self.stem_singular_word(word)

# Override CachedStemmer dengan menambahkan method stem_word
# dan method stem_tokens untuk stemming pada list tokens
class CachedStemmer(CachedStemmerSastrawi):

    def stem_word(self, word):
        """
        Stem Satu Kata
        """
        if self.cache.has(word):
            return self.cache.get(word)
        else:
            stem = self.delegatedStemmer.stem_word(word)
            self.cache.set(word, stem)
            return stem

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

    def create_stemmer(self, isDev=False):
        """ Returns Stemmer instance """
        if isDev:
            words = self.get_words_from_file()
            dictionary = ArrayDictionary(words)
        else:
            dictionary = self.get_prod_words_dictionary()

        stemmer = Stemmer(dictionary)

        resultCache = ArrayCache()
        cachedStemmer = CachedStemmer(resultCache, stemmer)

        return cachedStemmer

    @lru_cache()
    def get_prod_words_dictionary(self):
        words = self.get_words_from_file()
        dictionary = ArrayDictionary(words)
        return dictionary