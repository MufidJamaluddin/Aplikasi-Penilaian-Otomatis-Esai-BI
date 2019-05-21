from sqlalchemy import func
from sqlalchemy.sql.expression import and_
from ujian_app.models import ( 
    FiturReferensiPenilaian, Jawaban, db
)

class RfRepository(object):
    '''
    Kelas yang bertugas thd data 
    Relevance Frequency
    '''
    def __init__(self, idsoal):
        self.idsoal = idsoal
    
    def get_max_rf(self, term:str):
        '''
        Mendapatkan Nilai Kemunculan RF
        '''
        pass
    
    
