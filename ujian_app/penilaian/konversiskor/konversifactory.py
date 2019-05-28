from ujian_app.models import Soal
from .angkakehuruf import SkorAngkaKeHuruf

class KonversiFactory(object):
    """
    Kelas untuk Konversi Nilai Angka ke Huruf 
    Factory
    Berdasarkan Data Soal
    """

    def __get_data_soal(self, idsoal):
        '''
        Mendapatkan Data Soal
        '''
        return Soal.query.filter_by(idsoal=idsoal).first()

    def create(self, idsoal):
        '''
        Membuat Konversi Angka ke Huruf
        '''
        soal = self.__get_data_soal(idsoal)
        konverter = SkorAngkaKeHuruf(int(soal.skorMax), int(soal.skorMin))
        return konverter