from . import GenericRepository
from ujian_app.models import Guru

class GuruRepository(GenericRepository):

    def __init__(self):
        super().__init__(Guru)