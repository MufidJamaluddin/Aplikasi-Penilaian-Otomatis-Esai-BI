from . import GenericRepository
from ujian_app.models import Guru, db

class GuruRepository(GenericRepository):

    def __init__(self):
        super().__init__(Guru)

    def saveGuru(self, guru):
        db.session.add(guru)
        db.session.commit()

    def updateGuru(self, guru):
        db.session.merge(guru)
        db.session.commit()
    
    def deleteGuru(self, idguru):
        guru = self.find_by_id(idguru)
        
        for i in guru.listpengampu:
            db.session.delete(i)
        
        db.session.delete(guru)
        db.session.commit()

    def getGuruByUsername(self, username):
        return Guru.query.filter_by(username=username).first()