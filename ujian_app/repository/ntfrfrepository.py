from sqlalchemy import func
from sqlalchemy.sql.expression import and_
from ujian_app.models import ( 
    FiturReferensiPenilaian, FiturObjekPenilaian,
    Jawaban, db
)
from functools import lru_cache

class NtfRfRepository(object):
    '''
    Kelas yang bertugas thd data 
    Relevance Frequency
    '''

    def clear_lrucache(self):
        self.get_max_rf.cache_clear()
        self.get_max_tf.cache_clear()

    @lru_cache()
    def get_max_rf(self, idsoal, term):
        '''
        Mendapatkan Nilai MaksimalKemunculan RF
        '''
        max_rf = db.session.query(
            func.max(FiturReferensiPenilaian.rf)
        ).join(Jawaban).filter(
            and_(
                FiturReferensiPenilaian.term == term, 
                Jawaban.idsoal == idsoal
            )
        ).scalar()
    
        if max_rf is None:
            return 0
        return max_rf

    @lru_cache()
    def get_max_tf(self, idsoal, term):
        '''
        Mendapatkan Nilai Maksimal Kemunculan TF
        '''
        max_tf = db.session.query(
            func.max(FiturReferensiPenilaian.tf)
        ).join(Jawaban).filter(
            and_(
                FiturReferensiPenilaian.term == term, 
                Jawaban.idsoal == idsoal
            )
        ).scalar()
    
        if max_tf is None:
            return 0
        return max_tf

    def save_ntf_rf(self, idjawaban, term, rf, ntf_rf, skorHuruf = None):
        '''
        Menyimpan nilai RF dan NTF RF
        '''
        if skorHuruf is None:
            fitur = FiturObjekPenilaian.query.filter_by(
                idjawaban=idjawaban, term=term
            ).first()
            
            fitur.ntf_rf = ntf_rf
            db.session.add(fitur)

        else:
            fitur = FiturReferensiPenilaian.query.filter_by(
                idjawaban=idjawaban, skorHuruf=skorHuruf, term=term
            ).first()
            
            fitur.rf = rf
            fitur.ntf_rf = ntf_rf
            db.session.add(fitur)
            
        db.session.commit()