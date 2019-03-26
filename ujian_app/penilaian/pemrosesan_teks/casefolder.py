import re

class CaseFolder(object):
    """
    Bertugas Melakukan Case Folding
    """

    def lowercase(self, teks:str):
        """
        Lowercase Teks
        """
        return teks.lower()

    def remove_punctuation(self, teks:str):
        """
        Menghilangkan Karakter Selain Huruf A-Z
        dan Menghilangkan Kelebihan Spasi
        """
        result = re.sub(r'[^a-z]', ' ', teks)
        result = re.sub(r'( +)', ' ', result)
        return result.strip()

    def case_fold(self, teks:str):
        result = self.lowercase(teks)
        result = self.remove_punctuation(result)
        return result