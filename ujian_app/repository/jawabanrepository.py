from . import GenericRepository
from ujian_app.models import Jawaban, db

class JawabanRepository(GenericRepository):

    def __init__(self):
        super().__init__(Jawaban)
    
    def updateJawaban(self, idjawaban, jawabanEsai):
        jawaban = Jawaban.query.get(idjawaban)
        jawaban.jawabanEsai = jawabanEsai

        db.session.add(jawaban)
        db.session.commit()