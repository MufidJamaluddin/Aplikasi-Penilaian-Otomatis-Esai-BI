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
        self.case_folder = CaseFolder()
        self.tokenizer = Tokenizer()

        stopword_remover_factory = StopwordRemoverFactory()
        self.stopword_remover = stopword_remover_factory.create()

        stemmer_factory = StemmerFactory()
        self.stemmer = stemmer_factory.create_stemmer()

        self.tf_unigram = TfUnigram()
        self.tf_bigram = TfBigram()

    def get_features(self, tokens:list):
        """
        Mendapatkan Fitur Kombinasi Unigram dan Bigram
        """
        unigram_features = self.tf_unigram.calculate(tokens)
        bigram_features = self.tf_bigram.calculate(tokens)
        
        features = {**unigram_features, **bigram_features}
        return features

    def text_to_tokens(self, teks:str):
        """
        Melakukan Pemrosesan Teks dari Teks menjadi list token
        """
        result_text = self.case_folder.case_fold(teks)
        result_tokens = self.tokenizer.tokenize(result_text)
        result_tokens = self.stopword_remover.filter(result_tokens)
        result_tokens = self.stemmer.stem_tokens(result_tokens)
        
        return result_tokens

    def preprocess_text(self, teks:str):
        """
        Mengekstrak fitur dari teks
        """
        tokens = self.text_to_tokens(teks)
        features = self.get_features(tokens)

        return features