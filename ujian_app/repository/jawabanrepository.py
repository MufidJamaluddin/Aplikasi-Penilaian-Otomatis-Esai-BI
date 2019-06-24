from . import GenericRepository
from ujian_app.models import Jawaban, Soal, Kelas, db
from sqlalchemy.sql.expression import and_

class JawabanRepository(GenericRepository):

    def __init__(self):
        super().__init__(Jawaban)

    def find_by_soal(self, idujian, idkelas, idsoal):
        kelas = db.session\
            .query(Kelas.namaKelas)\
            .filter_by(idkelas=idkelas).first()

        listjawaban = Jawaban.query\
            .join(Soal).filter(
                and_(
                    Soal.idujian == idujian,
                    Soal.idsoal == idsoal,
                    Jawaban.namaKelas == kelas.namaKelas
                )
            )\
            .order_by(Soal.idsoal, Jawaban.nis)\
            .all()
        return listjawaban
    
    def updateJawaban(self, idjawaban, jawabanEsai):
        jawaban = Jawaban.query.get(idjawaban)
        jawaban.jawabanEsai = jawabanEsai

        db.session.add(jawaban)
        db.session.commit()