from . import GenericRepository
from ujian_app.models import Daftarnilaiujian

class DaftarNilaiRepository(GenericRepository):

    def __init__(self):
        super().__init__(Daftarnilaiujian)