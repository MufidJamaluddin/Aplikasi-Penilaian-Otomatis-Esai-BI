from ujian_app.models import Soal, Jawaban, DaftarNilaiUjian, db
from .penskoranotomatis import PenskoranOtomatis

class PenilaianOtomatis(object):
    '''
    Melakukan Penilaian Otomatis
    '''
    def __init__(self, idujian):
        self.idujian = idujian
        self.penskor = PenskoranOtomatis()
    
    def get_list_id_soal(self):
        '''
        Mendapatkan list id soal
        pada ujian ini
        '''
        listsoal = db.session.query(Soal.idsoal).filter_by(
            idujian=self.idujian, flag='1'
        )
        return listsoal
    
    def nilai_otomatis(self):
        '''
        Melakukan Penilaian Otomatis
        '''
        listsoal = self.get_list_id_soal()
        
        for soal in listsoal:
            self.penskor.set_id_soal(soal.idsoal)
            self.penskor.skor_otomatis()