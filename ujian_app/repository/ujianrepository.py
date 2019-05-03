from ujian_app.models import Ujian, Kelas, Pelaksanaanujian, db

class UjianRepository:

    def save(self, idpengampu, namaUjian, namaMapel, listKelas, jumlahSoal, durasi):
        ujian = Ujian()
        ujian.namaUjian = namaUjian
        ujian.jumlahSoal = jumlahSoal

        pelaksanaan_ujian = []
        for kls in listKelas:
            ps = Pelaksanaanujian()
            ps.kelas = Kelas.query.filter_by(namaKelas = kls).first()
            pelaksanaan_ujian.append(ps)

        ujian.pelaksanaan_ujian = pelaksanaan_ujian
        ujian.idpengampu = idpengampu

        db.session.add(ujian)
        db.session.commit()
    
    def findAll(self):
        return Ujian.query.all()

    def update(self, idujian, idpengampu, namaUjian, namaMapel, listKelas, jumlahSoal, durasi):
        ujian = Ujian.query.filter_by(idujian = idujian, idpengampu = idpengampu).first()
        ujian.namaUjian = namaUjian
        ujian.jumlahSoal = jumlahSoal

        pelaksanaan_ujian = []
        for kls in listKelas:
            ps = Pelaksanaanujian()
            ps.kelas = Kelas.query.filter_by(namaKelas = kls).first()
            pelaksanaan_ujian.append(ps)

        ujian.pelaksanaan_ujian = pelaksanaan_ujian
        ujian.idpengampu = idpengampu

        db.session.add(ujian)
        db.session.commit()
    
    def delete(self, idujian, idpengampu):
        Ujian = ujian = Ujian.query.filter_by(idujian = idujian, idpengampu = idpengampu).first()
        db.session.delete(Ujian)
        db.session.commit()
