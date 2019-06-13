from ujian_app.penilaian.pemrosesan_jawaban import (
    PemrosesanDataLatih
)
from ujian_app.models import Soal, db

class PenilaianManual(object):
    '''
    Kelas yang bertugas menghandle aksi
    penskoran manual
    '''

    def __init__(self):
        self.pemroses = PemrosesanDataLatih()
    
    def __get_list_id_soal(self, idujian):
        '''
        Mendapatkan list id soal
        pada ujian ini
        '''
        listsoal = db.session.query(Soal.idsoal).filter_by(
            idujian = idujian, flag = '1'
        )
        return listsoal

    def nilai_manual(self, idujian, idkelas):
        '''
        Menghandle skor manual
        '''
        listsoal = self.__get_list_id_soal(idujian)

        for soal in listsoal:
            self.pemroses.proses_dan_simpan(soal.idsoal, idkelas)