class Tokenizer(object):
    """
    Bertugas Melakukan Tokenisasi Terhadap Teks
    """

    def tokenize(self, teks:str):
        tokens = teks.split(' ')
        return tokens