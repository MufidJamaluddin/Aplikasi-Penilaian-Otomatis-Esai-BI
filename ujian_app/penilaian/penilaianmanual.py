from ujian_app.penilaian.pemrosesan_jawaban import (
    PemrosesanDataLatih
)
from ujian_app.models import Soal, Kelas, db
from sqlalchemy import func

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
    
    def __hitung_nilai_ujian(self, idujian, idkelas):

        kelas = Kelas.query.get(idkelas)

        connection = db.engine.engine.raw_connection()

        cursor = connection.cursor()
        cursor.callproc("hitung_nilai_ujian_latih", [idujian, kelas.namaKelas])
        cursor.close()
        connection.commit()

    def nilai_manual(self, idujian, idkelas):
        '''
        Menghandle skor manual
        '''
        listsoal = self.__get_list_id_soal(idujian)

        for soal in listsoal:
            self.pemroses.proses_dan_simpan(soal.idsoal, idkelas)
        
        self.__hitung_nilai_ujian(idujian, idkelas)