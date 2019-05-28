from .casefolder import CaseFolder
from .tokenizer import Tokenizer
from .stopwordremover import StopwordRemoverFactory
from .stemmer import StemmerFactory
from .ngram import TfUnigram, TfBigram

class Preprocesser(object):
    """
    Bertugas Melakukan Pemrosesan Teks (Text Proeprocessing)
    """

    def __init__(self):
        '''
        Konstruktor
        '''
        self.__case_folder = CaseFolder()
        self.__tokenizer = Tokenizer()

        stopword_remover_factory = StopwordRemoverFactory()
        self.__stopword_remover = stopword_remover_factory.create()

        stemmer_factory = StemmerFactory()
        self.__stemmer = stemmer_factory.create()

        self.__tf_unigram = TfUnigram()
        self.__tf_bigram = TfBigram()

        del stopword_remover_factory
        del stemmer_factory
    
    def __del__(self):
        '''
        Destructor
        '''
        del self.__case_folder
        del self.__tokenizer
        del self.__stopword_remover
        del self.__tf_unigram
        del self.__tf_bigram

    def __get_features(self, tokens:list):
        """
        Mendapatkan Fitur Ruang-Vektor Kombinasi Unigram dan Bigram
        """
        unigram_features = self.__tf_unigram.calculate(tokens)
        bigram_features = self.__tf_bigram.calculate(tokens)
        
        features = {**unigram_features, **bigram_features}
        return features

    def __text_to_tokens(self, teks:str):
        """
        Melakukan Pemrosesan Teks dari Teks menjadi list token
        """
        result_text = self.__case_folder.case_fold(teks)
        result_tokens = self.__tokenizer.tokenize(result_text)
        result_tokens = self.__stopword_remover.filter(result_tokens)
        result_tokens = self.__stemmer.stem_tokens(result_tokens)
        
        return result_tokens

    def preprocess_text(self, teks:str):
        """
        Mengekstrak fitur dari teks
        dalam bentuk Ruang-Vektor
        """
        tokens = self.__text_to_tokens(teks)
        features = self.__get_features(tokens)

        return features