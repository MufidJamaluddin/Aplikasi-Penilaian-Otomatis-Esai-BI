class TfUnigram(object):
    """
    Bertugas Menghitung TF pada term Unigram
    """

    def calculate(self, tokens: list):
        """
        Mengembalikan Dictionary TF-Unigram
        """
        dictTfUnigram = {}

        for token in tokens:
            if token in dictTfUnigram:
                dictTfUnigram[token] = dictTfUnigram[token] + 1
            else:
                dictTfUnigram[token] = 1

        return dictTfUnigram

class TfBigram(object):
    """
    Bertugas Menghitung TF paa term Bigram
    """
    def unify_term_bigram(self, firstTokenIndex:int, tokens:list):
        """
        Menggabungkan Dua String (Bigram)
        """
        term1 = tokens[firstTokenIndex]
        term2 = tokens[firstTokenIndex + 1]
        return ' '.join([term1, term2])

    def calculate(self, tokens:list):
        """
        Mengembalikan Dictionary TF-Bigram
        """
        dictTfBigram = {}
        sz = len(tokens) - 1

        for i in range(sz):
            bigram_token = self.unify_term_bigram(i, tokens)

            if bigram_token in dictTfBigram:
                dictTfBigram[bigram_token] = dictTfBigram[bigram_token] + 1
            else:
                dictTfBigram[bigram_token] = 1

        return dictTfBigram