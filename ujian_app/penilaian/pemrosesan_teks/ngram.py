class TfUnigram(object):
    """
    Bertugas Menghitung TF pada term Unigram
    """

    def calculate(self, tokens: list):
        """
        Mengembalikan Vektor TF-Unigram
        (Tipe data dictionary python)
        """
        vektor_tf_unigram = {}

        for token in tokens:
            if token in vektor_tf_unigram:
                vektor_tf_unigram[token] = vektor_tf_unigram[token] + 1
            else:
                vektor_tf_unigram[token] = 1

        return vektor_tf_unigram

class TfBigram(object):
    """
    Bertugas Menghitung TF pada term Bigram
    """

    def get_term_bigram(self, indeks_token_pertama:int, tokens:list):
        """
        Menggabungkan Dua String (Bigram)
        """
        term1 = tokens[indeks_token_pertama]
        term2 = tokens[indeks_token_pertama + 1]
        return ' '.join([term1, term2])

    def calculate(self, tokens:list):
        """
        Mengembalikan Vektor TF-Bigram
        (Tipe data dictionary)
        """
        vektor_tf_bigram = {}
        sz = len(tokens) - 1

        for i in range(sz):
            bigram_token = self.get_term_bigram(i, tokens)

            if bigram_token in vektor_tf_bigram:
                vektor_tf_bigram[bigram_token] = vektor_tf_bigram[bigram_token] + 1
            else:
                vektor_tf_bigram[bigram_token] = 1

        return vektor_tf_bigram