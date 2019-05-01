from ujian_app.models import Kelas, db

class KelasRepository:

    def save(self, namaKelas: str):
        kls = Kelas()
        kls.namaKelas = namaKelas
        db.session.add(kls)
        db.session.commit()
    
    def findAll(self):
        return Kelas.query.all()

    def update(self, idkelas: int, namaKelas: str):
        kls = Kelas.query.get(idkelas)
        kls.namaKelas = namaKelas
        db.session.add(kls)
        db.session.commit()
    
    def delete(self, idkelas: int):
        kls = Kelas.query.get(idkelas)
        db.session.delete(kls)
        db.session.commit()
