from ujian_app.models import Siswa, db

class SiswaRepository:

    def save(self, nis,idkelas,nama,password):
        siswa = Siswa()
        siswa.nis = nis
        siswa.idkelas = idkelas
        siswa.nama = nama
        siswa.password = password
        db.session.add(mapel)
        db.session.commit()
    
    def findAll(self):
        return Siswa.query.all()

    def update(self, nis,idkelas,nama,password):
        siswa = Siswa.query.get(nis)
        siswa.idkelas = idkelas
        siswa.nama = nama
        siswa.password = password
        db.session.add(siswa)
        db.session.commit()
    
    def delete(self, nis):
        siswa = Siswa.query.get(nis)
        db.session.delete(siswa)
        db.session.commit()
