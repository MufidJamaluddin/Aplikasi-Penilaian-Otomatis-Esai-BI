from ujian_app.models import ( 
    Jawaban, Soal
)
from sqlalchemy.sql.expression import and_
from sqlalchemy import func
import random

class SeleksiData(object):
    '''
    Kelas yang bertugas untuk seleksi
    data pada 4 kategori
    '''
    def __init__(self, idsoal):
        self.idsoal = idsoal
        self.listidjawaban = {'A':[], 'B':[], 'C':[], 'D':[]}
    
    def get_list_idjawaban(self, skorHuruf):
        '''
        Mendapatkan listidjawaban hasil
        undersampling
        '''
        if self.listidjawaban[skorHuruf]:
            return self.listidjawaban[skorHuruf]
        else:
            return []

    def undersampling(self):
        '''
        Melakukan Undersampling Data Latih
        '''
        # Mendapatkan List Soal
        listsoal = Soal.query.join(Jawaban).filter(
            and_(
               Soal.idsoal == self.idsoal,
               Soal.flag == '1',
               Jawaban.skorHuruf != None
            )
        )

        # Mendapatkan List ID Jawaban
        for soal in listsoal:
            listjawaban = soal.jawaban
            for jawaban in listjawaban:
                if not self.listidjawaban[jawaban.skorHuruf]:
                    self.listidjawaban[jawaban.skorHuruf] = []
                self.listidjawaban[jawaban.skorHuruf].append(jawaban.idjawaban)
        
        # Melakukan Undersampling
        min_count = None
        min_class = None

        for key, val in self.listidjawaban:
            if min_count is None:
                min_count = val.length
                min_class = key
            elif min_count > val.length:
                if val.length > 0:
                    min_count = val.length
                    min_class = key
        
        for key, val in self.listidjawaban:
            # Undersampling 1:1
            if key == min_class:
                continue
            self.listidjawaban[key] = random.sample(population=val, k=min_count)