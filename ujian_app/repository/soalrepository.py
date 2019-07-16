from . import GenericRepository
from ujian_app.models import Soal, db

class SoalRepository(GenericRepository):

    def __init__(self):
        super().__init__(Soal)
    
    def findByIdUjian(self, idujian):
        return Soal.query.filter_by(idujian=idujian).all()
    
    def get_listidsoal(self, idujian):
        listidsoal = db.session.query(Soal.idsoal).filter_by(
            idujian=self.__idujian, flag='1'
        )
        return listidsoal