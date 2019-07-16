import os
from functools import lru_cache

class StopwordRemover(object):
    """
    Bertugas Menghilangkan Stopword dari Token
    """
    def __init__(self, stoplist: set):
        self.__stoplist = stoplist

    def __del__(self):
        del self.__stoplist

    def filter(self, tokens:list):
        """
        Menghilangkan Stopword dari List Tokens
        """
        clean_tokens = [token for token in tokens \
                            if not token in self.__stoplist]
        
        return clean_tokens

class StopwordRemoverFactory(object):
    """
    Membuat StopwordRemover
    """
    def __init__(self):
        current_dir = os.path.dirname(os.path.realpath(__file__))
        self.__file_dir = current_dir + '/data/stopword_tala_2003.txt'

    def create(self):
        stop_words = self.__get_stop_words_from_file()
        stopword_remover = StopwordRemover(stop_words)
        return stopword_remover

    @lru_cache()
    def __get_stop_words_from_file(self):
        """
        Mendapatkan List Stop Word dari File
        """
        if not os.path.isfile(self.__file_dir):
            raise RuntimeError('Stopword file belum ada')

        text = ''
        with open(self.__file_dir, 'r') as f:
            text = f.read()

        stop_words = set(text.split('\n'))
        return stop_words