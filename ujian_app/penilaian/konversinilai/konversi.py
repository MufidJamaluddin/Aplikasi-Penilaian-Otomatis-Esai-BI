from ujian_app.models import Soal
from .angkakehuruf import SkorAngkaKeHuruf
from .hurufkeangka import SkorHurufKeAngka

class Konversi(object):
    """
    Kelas untuk Konversi Nilai Angka ke Huruf 
    dan Nilai Huruf ke Angka
    Berdasarkan Data Soal
    """

    def __init__(self, idsoal):
        '''
        idsoal : idsoal Soal yang akan dinilai
        '''
        self.idsoal = idsoal

        soal = Soal.query.get(self.idsoal)
        self.skor_angka_ke_huruf = SkorAngkaKeHuruf(soal.skorMax, soal.skorMin)
        self.skor_huruf_ke_angka = SkorHurufKeAngka(soal.skorMax, soal.skorMin)

    def ke_angka(self, huruf:str):
        '''
        Melakukan konversi nilai dari huruf ke angka
        '''
        return self.skor_huruf_ke_angka.konversi(huruf)

    def ke_huruf(self, angka:int):
        '''
        Melakukan konversi nilai dari angka ke huruf
        '''
        return self.skor_angka_ke_huruf.konversi(angka)