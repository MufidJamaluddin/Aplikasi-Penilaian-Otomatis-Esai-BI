from . import GenericRepository
from ujian_app.models import Pengampu

class PengampuRepository(GenericRepository):

    def __init__(self):
        super().__init__(Pengampu)