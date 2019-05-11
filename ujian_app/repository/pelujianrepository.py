from . import GenericRepository
from datetime import datetime
from ujian_app.models import Pelaksanaanujian, db

class PelaksanaanUjianRepository(GenericRepository):

    def __init__(self):
        super().__init__(Pelaksanaanujian)
    
    def mulaiUjian(self, idujian, idkelas):
        pel = Pelaksanaanujian.query.filter_by(idujian=idujian, idkelas=idkelas).one()
        pel.waktu_mulai = datetime.now()
        pel.status_pelaksanaan = 1
        pel.ujian.status_ujian = 1

        db.session.add(pel)
        db.session.commit()
    
    def selesaiUjian(self, idujian, idkelas):
        pel = Pelaksanaanujian.query.filter_by(idujian=idujian, idkelas=idkelas).one()
        pel.status_pelaksanaan = 2

        db.session.add(pel)
        db.session.commit()