from . import GenericRepository
from ujian_app.models import NilaiUjian

class DaftarNilaiRepository(GenericRepository):

    def __init__(self):
        super().__init__(NilaiUjian)