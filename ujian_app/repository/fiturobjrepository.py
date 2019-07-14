from sqlalchemy import func
from sqlalchemy.sql.expression import and_
from ujian_app.models import ( 
    FiturObjekPenilaian, Jawaban, db
)

class FiturObjekRepository(object):

    def get_list_fitur(self, idsoal):
        list_fitur = FiturObjekPenilaian.query.join(Jawaban).filter(
            Jawaban.idsoal == idsoal,
            Jawaban.nilaiOtomatis == 1,
            Jawaban.kode_proses == '1'
        )
        return list_fitur
    
    def add_fitur(self, fitur):
        db.session.add(fitur)
        db.session.flush()
    
    def commit(self):
        db.session.commit()