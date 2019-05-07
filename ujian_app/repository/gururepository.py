from . import GenericRepository
from ujian_app.models import Guru, db

class GuruRepository(GenericRepository):

    def __init__(self):
        super().__init__(Guru)

    def saveGuru(self, guru):
        db.session.add(guru)
        db.session.commit()
    
    def deleteGuru(self, idguru):
        guru = self.findById(idguru)
        
        for i in guru.listpengampu:
            db.session.delete(i)
        
        db.session.delete(guru)
        db.session.commit()