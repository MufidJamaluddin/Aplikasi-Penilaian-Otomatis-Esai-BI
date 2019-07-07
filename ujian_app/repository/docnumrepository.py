from sqlalchemy import func
from sqlalchemy.sql.expression import and_
from ujian_app.models import ( 
    FiturReferensiPenilaian, Jawaban, db
)
from functools import lru_cache

class DocNumRepository(object):
    '''
    Kemunculan Dokumen
    '''
    def clear_lrucache(self):
        self.get_doc_num_neg_class.cache_clear()
        self.get_doc_num_pos_class.cache_clear()

    @lru_cache()
    def get_doc_num_pos_class(self, idsoal, term, skorHuruf):
        """
        Mendapatkan Jumlah Dokumen Kelas Positif (Kelas Skor Huruf/Alfabet)
        """
        '''
        Mendapatkan Nilai MaksimalKemunculan RF
        '''
        jml_doc_positif = db.session.query(
            func.count(FiturReferensiPenilaian.idjawaban)
        ).join(Jawaban).filter(
            and_(
                FiturReferensiPenilaian.term == term, 
                Jawaban.skorHuruf == skorHuruf,
                Jawaban.idsoal == idsoal
            )
        ).scalar()
    
        if jml_doc_positif is None:
            return 0
        return jml_doc_positif

    @lru_cache()
    def get_doc_num_neg_class(self, idsoal, term, skorHuruf):
        """
        Mendapatkan Jumlah Dokumen Kelas Negatif (Kelas Skor Huruf/Alfabet)
        """
        jml_doc_negatif = db.session.query(
            func.count(FiturReferensiPenilaian.idjawaban)
        ).join(Jawaban).filter(
            and_(
                FiturReferensiPenilaian.term == term, 
                Jawaban.skorHuruf != skorHuruf,
                Jawaban.idsoal == idsoal
            )
        ).scalar()
    
        if jml_doc_negatif is None:
            return 0
        return jml_doc_negatif