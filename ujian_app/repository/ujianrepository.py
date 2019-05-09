from . import GenericRepository
from ujian_app.models import Ujian, Guru, db

class UjianRepository(GenericRepository):

    def __init__(self):
        super().__init__(Ujian)
    
    def getUjianByUsername(self, username):
        guru = Guru.query.filter_by(username=username).first()
        if(guru):
            return guru.listujian
        else:
            return []
   
    def deleteUjian(self, idujian):
        ujian = self.findById(idujian)
        
        for i in ujian.pelaksanaan_ujian:
            db.session.delete(i)
        
        db.session.delete(ujian)
        db.session.commit()
