from ujian_app.repository import (
    ProgressRepository, DaftarNilaiRepository,
    SoalRepository
)
from .penskoranotomatis import PenskoranOtomatis

class PenilaianOtomatis(object):
    '''
    Melakukan Penilaian Otomatis
    '''

    def __init__(self, idujian):
        '''
        Konstruktor
        '''
        self.__idujian = idujian
        self.__progress_state = ProgressRepository()
        self.__penskor = PenskoranOtomatis(self.__progress_state)
        self.__dtnilai_repo = DaftarNilaiRepository()
        self.__soal_repo = SoalRepository()
    
    def __del__(self):
        '''
        Destruktor
        '''
        del self.__idujian
        del self.__penskor
        del self.__progress_state
        del self.__dtnilai_repo
        del self.__soal_repo

    def nilai_otomatis(self):
        '''
        Melakukan Penilaian Otomatis
        '''
        if not self.__progress_state.mulai_state_ptotomatis(self.__idujian):
            return
        
        listsoal = self.__soal_repo.get_listidsoal(self.__idujian).all()
        jumlah_soal = len(listsoal)
        
        i = 0
        for soal in listsoal:
            if self.__progress_state.get_state_idsoal() == None:
                self.__progress_state.set_state_soal(soal.idsoal, 'Soal 1')
            # Lanjut Progress Terakhir ...
            if self.__progress_state.get_state_idsoal() == soal.idsoal:

                self.__penskor.set_id_soal(soal.idsoal)
                self.__penskor.skor_otomatis()
                
                next_soal = i + 1
                if next_soal < jumlah_soal:
                    next_idsoal = listsoal[next_soal].idsoal
                    next_namasoal = 'Soal {}'.format(next_soal + 1)
                    self.__progress_state.set_state_soal(next_idsoal, next_namasoal)
            i = i + 1

        self.__dtnilai_repo.hitung_nilai_ujian_uji(self.__idujian)
        self.__progress_state.akhiri_state_potomatis()