from . import GenericRepository
from ujian_app.models import Ujian, db

class UjianRepository(GenericRepository):

    def __init__(self):
        super().__init__(Ujian)