from . import GenericRepository
from ujian_app.models import Matapelajaran

class MapelRepository(GenericRepository):

    def __init__(self):
        super().__init__(Matapelajaran)