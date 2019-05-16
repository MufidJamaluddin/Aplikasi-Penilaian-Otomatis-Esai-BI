from . import GenericRepository
from datetime import datetime, timedelta
from ujian_app.models import Pelaksanaanujian, db, Siswa

class PelaksanaanUjianRepository(GenericRepository):

    def __init__(self):
        super().__init__(Pelaksanaanujian)
    
    def findPelaksanaanUjianByNim(self, nim):
        siswa = Siswa.query.get(nim)
        pelaksanaan = Pelaksanaanujian.query.filter_by(idkelas=siswa.idkelas,status_pelaksanaan='1').first()

        if pelaksanaan:
            ujian = pelaksanaan.ujian
            waktu_berakhir_ujian = pelaksanaan.waktu_mulai + timedelta(minutes=ujian.durasi)
            
            if pelaksanaan.waktu_mulai <= datetime.now() < waktu_berakhir_ujian:
                return pelaksanaan
            else:
                jml_beres = Pelaksanaanujian.query.filter_by(
                    idujian=ujian.idujian, 
                    idkelas=siswa.idkelas, 
                    status_pelaksanaan='2'
                ).count()
                jml_ujian = Pelaksanaanujian.query.filter_by(
                    idujian=ujian.idujian, 
                    idkelas=siswa.idkelas
                ).count()

                pelaksanaan.status_pelaksanaan = 2
                db.session.add(pelaksanaan)

                if(jml_beres == jml_ujian):
                    ujian.status_ujian = 2
                    db.session.add(ujian)
                
                db.session.commit()
                
                return None
        else:
            return None

    def mulaiUjian(self, idujian, idkelas):
        pel = Pelaksanaanujian.query.filter_by(idujian=idujian, idkelas=idkelas).one()
        pel.waktu_mulai = datetime.now()
        pel.status_pelaksanaan = 1
        pel.ujian.status_ujian = 1

        db.session.add(pel)
        db.session.commit()