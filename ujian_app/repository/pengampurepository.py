from . import GenericRepository
from ujian_app.models import Pengampu, Guru

class PengampuRepository(GenericRepository):

    def __init__(self):
        super().__init__(Pengampu)
    
    def getPengampuByIdGuru(self, idg):
        return Pengampu.query.filter_by(idguru=idg).all()

    def getPengampuByUsername(self, username):
        guru = Guru.query.filter_by(username=username).first()
        if(guru):
            return guru.listpengampu
        else:
            return []