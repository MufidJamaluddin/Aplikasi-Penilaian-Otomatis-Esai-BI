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
        )
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
        listsoal = self.__get_list_id_soal()
        
        for soal in listsoal:
            
            if self.__progress.idsoal == None:
                self.__progress.set_soal(soal.idsoal)
            
            if self.__progress.idsoal == soal.idsoal:
                self.__penskor.set_id_soal(soal.idsoal)
                self.__penskor.skor_otomatis()
                self.__progress.set_soal(None)
        
        self.__hitung_nilai_ujian()
        self.__progress.akhiri()