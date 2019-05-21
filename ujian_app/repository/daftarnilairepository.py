from . import GenericRepository
from ujian_app.models import DaftarNilaiUjian

class DaftarNilaiRepository(GenericRepository):

    def __init__(self):
        super().__init__(DaftarNilaiUjian)