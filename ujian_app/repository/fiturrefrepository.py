from sqlalchemy import func
from sqlalchemy.sql.expression import and_
from ujian_app.models import ( 
    FiturReferensiPenilaian, Jawaban, db
)

class FiturReferensiRepository(object):

    def get_list_fitur(self, idsoal):
        list_fitur = FiturReferensiPenilaian.query.join(Jawaban).filter(
            Jawaban.idsoal == idsoal
        )
        return list_fitur
    
    def add_fitur(self, fitur):
        db.session.add(fitur)
        db.session.flush()
    
    def commit(self):
        db.session.commit()