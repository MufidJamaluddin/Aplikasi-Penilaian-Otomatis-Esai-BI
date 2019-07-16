from ujian_app.repository import SoalRepository
from .angkakehuruf import SkorAngkaKeHuruf

class KonversiFactory(object):
    """
    Kelas untuk Konversi Nilai Angka ke Huruf 
    Factory
    Berdasarkan Data Soal
    """

    def __init__(self):
        self.__repo = SoalRepository()

    def create(self, idsoal):
        '''
        Membuat Konversi Angka ke Huruf
        '''
        soal = self.__repo.findById(idsoal)
        konverter = SkorAngkaKeHuruf(int(soal.skorMax), int(soal.skorMin))
        return konverter