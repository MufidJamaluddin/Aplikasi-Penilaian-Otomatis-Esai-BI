from __future__ import print_function
from ujian_app.models import Soal, Jawaban, DaftarNilaiUjian, db
from ujian_app.repository import ProgressRepository
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
        self.__progress = ProgressRepository()
        self.__penskor = PenskoranOtomatis(self.__progress)
    
    def __del__(self):
        '''
        Destruktor
        '''
        del self.__idujian
        del self.__penskor
        del self.__progress
    
    def __get_list_id_soal(self):
        '''
        Mendapatkan list id soal
        pada ujian ini
        '''
        listsoal = db.session.query(Soal.idsoal).filter_by(
            idujian=self.__idujian, flag='1'
        ).all()
        return listsoal

    def __hitung_nilai_ujian(self):

        connection = db.engine.engine.raw_connection()
        
        cursor = connection.cursor()
        cursor.callproc("hitung_nilai_ujian_uji", [self.__idujian])
        cursor.close()
        connection.commit()

    def nilai_otomatis(self):
        '''
        Melakukan Penilaian Otomatis
        '''
        if not self.__progress.mulai_state_ptotomatis(self.__idujian):
            return
        
        listsoal = self.__get_list_id_soal()
        jumlah_soal = len(listsoal)
        
        i = 0
        for soal in listsoal:
            if self.__progress.get_state_idsoal() == None:
                self.__progress.set_state_soal(soal.idsoal, 'Soal 1')
            # Lanjut Progress Terakhir ...
            if self.__progress.get_state_idsoal() == soal.idsoal:

                self.__penskor.set_id_soal(soal.idsoal)
                self.__penskor.skor_otomatis()
                
                next_soal = i + 1
                if next_soal < jumlah_soal:
                    next_idsoal = listsoal[next_soal].idsoal
                    next_namasoal = 'Soal {}'.format(next_soal + 1)
                    self.__progress.set_state_soal(next_idsoal, next_namasoal)
            i = i + 1

        try:
            self.__hitung_nilai_ujian()
        except:
            print("Nilai Ujian Duplikat. Hitung Nilai Ujian Batal!")
        finally:
            self.__progress.akhiri_state_potomatis()