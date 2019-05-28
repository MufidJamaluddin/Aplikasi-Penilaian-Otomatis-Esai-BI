from ujian_app.models import Soal, Jawaban, DaftarNilaiUjian, db
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
        self.__penskor = PenskoranOtomatis()
    
    def __del__(self):
        '''
        Destruktor
        '''
        del self.__idujian
        del self.__penskor
    
    def __get_list_id_soal(self):
        '''
        Mendapatkan list id soal
        pada ujian ini
        '''
        listsoal = db.session.query(Soal.idsoal).filter_by(
            idujian=self.__idujian, flag='1'
        )
        return listsoal
    
    def nilai_otomatis(self):
        '''
        Melakukan Penilaian Otomatis
        '''
        listsoal = self.__get_list_id_soal()
        
        for soal in listsoal:
            self.__penskor.set_id_soal(soal.idsoal)
            self.__penskor.skor_otomatis()