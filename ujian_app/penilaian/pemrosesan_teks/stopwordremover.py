import os
from functools import lru_cache

class StopwordRemover(object):
    """
    Bertugas Menghilangkan Stopword dari Token
    """
    def __init__(self, stoplist: dict):
        self.stoplist = stoplist

    def filter(self, tokens:list):
        """
        Menghilangkan Stopword dari List Tokens
        """
        clean_tokens = [token for token in tokens if token in self.stoplist]
        return clean_tokens

class StopwordRemoverFactory(object):
    """
    Membuat StopwordRemover
    """
    def create(self):
        stoplist = self.get_stop_word_dictionary()
        stopword_remover = StopwordRemover(stoplist)
        return stopword_remover

    @lru_cache()
    def get_stop_word_dictionary(self):
        """
        Mendapatkan Stop Word dalam tipe dictionary python
        """
        current_dir = os.path.dirname(os.path.realpath(__file__))
        file_dir = current_dir + '/data/stopword_tala_2003.txt'

        stopWords = self.get_stop_words_from_file(file_dir)
        stopwordsDict = dict(zip(stopWords, stopWords))

        return stopwordsDict

    def get_stop_words_from_file(self, file_dir):
        """
        Mendapatkan List Stop Word dari File
        """
        if not os.path.isfile(file_dir):
            raise RuntimeError('Stopword file belum ada')

        text = ''
        with open(file_dir, 'r') as f:
            text = f.read()

        return text.split('\n')