from . import GenericRepository
from ujian_app.models import Siswa, Kelas

class SiswaRepository(GenericRepository):

    def __init__(self):
        super().__init__(Siswa)
    
    def findAll(self):
        return Siswa.query.all()