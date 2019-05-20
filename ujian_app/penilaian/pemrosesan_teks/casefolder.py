import re

class CaseFolder(object):
    """
    Bertugas Melakukan Case Folding
    """

    def lowercase(self, teks:str):
        """
        Melakukan Lowercase Teks (Penyeragaman)
        """
        return teks.lower()

    def remove_punctuation(self, teks:str):
        """
        Menghilangkan karakter selain huruf A-Z
        dan selain tanda hubung kata berulang (-),
        Menghilangkan Kelebihan Spasi
        """
        # menghilangkan karakter selain a-z dan -
        result = re.sub(r'[^a-z -]', ' ', teks)

        # menghilangkan karakter - yang bukan tanda hubung
        result = re.sub('([ -])([- ])', ' ', result)

        # menghilangkan spasi yang duplikat
        result = re.sub(r'( +)', ' ', result)
        return result.strip()

    def case_fold(self, teks:str):
        '''
        Melakukan Case Folding
        '''
        result = self.lowercase(teks)
        result = self.remove_punctuation(result)
        return result