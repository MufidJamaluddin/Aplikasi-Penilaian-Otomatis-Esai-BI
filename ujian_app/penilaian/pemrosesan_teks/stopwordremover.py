from nltk.corpus import stopwords

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
    def create(self):
        stop_words = set(stopwords.words('english'))
        stopword_remover = StopwordRemover(stop_words)
        return stopword_remover
