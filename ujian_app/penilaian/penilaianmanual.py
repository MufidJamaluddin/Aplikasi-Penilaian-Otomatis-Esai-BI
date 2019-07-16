from ujian_app.penilaian.pemrosesan_jawaban import (
    PemrosesanDataLatih
)
from ujian_app.repository import (
    PelaksanaanUjianRepository,
    SoalRepository,
    DaftarNilaiRepository
)
from sqlalchemy import func

class PenilaianManual(object):
    '''
    Kelas yang bertugas menghandle aksi
    penskoran manual
    '''

    def __init__(self):
        self.__pel_repo = PelaksanaanUjianRepository()
        self.__pemroses = PemrosesanDataLatih()
        self.__soal_repo = SoalRepository()
        self.__dtnilai_repo = DaftarNilaiRepository()
    
    def __del__(self):
        del self.__pemroses
        del self.__soal_repo
        del self.__dtnilai_repo
        del self.__pel_repo

    def nilai_manual(self, idujian, idkelas):
        '''
        Menghandle skor manual
        '''
        listsoal = self.__soal_repo.get_listidsoal(idujian)

        for soal in listsoal:
            self.__pemroses.proses_dan_simpan(soal.idsoal, idkelas)
        
        self.__dtnilai_repo.hitung_nilai_ujian_latih(idujian, idkelas)
        self.__pel_repo.akhiri_pmanual(idujian, idkelas)