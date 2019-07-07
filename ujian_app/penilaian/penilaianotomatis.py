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
        listsoal = self.__get_list_id_soal()
        jumlah_soal = len(listsoal)

        self.__progress.load(self.__idujian, jumlah_soal)

        if self.__progress.selesai:
            return
        
        if self.__progress.selesai_potomatis:
            self.__hitung_nilai_ujian()
            return
        
        i = 0
        for soal in listsoal:
            if i == 0:
                self.__progress.set_soal(soal.idsoal, 'Soal 1')
            # Lanjut Progress Terakhir ...
            if self.__progress.idsoal == soal.idsoal:
                self.__penskor.set_id_soal(soal.idsoal)
                self.__penskor.skor_otomatis()
                next_soal = i+1
                if next_soal < jumlah_soal:
                    self.__progress.set_soal(
                        listsoal[next_soal], 
                        'Soal %s' % next_soal
                    )
            i += 1
        
        self.__progress.akhiri_potomatis()
        self.__hitung_nilai_ujian()
        self.__progress.akhiri()