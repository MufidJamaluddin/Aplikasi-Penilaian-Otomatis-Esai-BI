from . import GenericRepository
from ujian_app.models import Soal

class SoalRepository(GenericRepository):

    def __init__(self):
        super().__init__(Soal)
    
    def findByIdUjian(self, idujian):
        return Soal.query.filter_by(idujian=idujian)