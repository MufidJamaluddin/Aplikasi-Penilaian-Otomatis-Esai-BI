from . import GenericRepository
from ujian_app.models import Akun

class AkunRepository(GenericRepository):

    def __init__(self):
        super().__init__(Akun)
