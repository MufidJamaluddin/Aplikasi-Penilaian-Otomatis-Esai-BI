from . import GenericRepository
from ujian_app.models import Kelas

class KelasRepository(GenericRepository):

    def __init__(self):
        super().__init__(Kelas)
