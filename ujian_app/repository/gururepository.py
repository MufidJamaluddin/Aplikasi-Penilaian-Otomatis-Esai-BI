from ujian_app.models import Guru, db

class GuruRepository:

    def save(self, nip, nuptk, namaGuru, username, password):
        guru = Guru()
        guru.nip = nip
        guru.nuptk = nuptk
        guru.namaGuru = namaGuru
        guru.username = username
        guru.password = password
        db.session.add(guru)
        db.session.commit()
    
    def findAll(self):
        return Guru.query.all()

    def update(self, idguru, nip,nuptk, namaGuru, username, password):
        guru = Guru.query.get(idguru)
        guru.nip = nip
        guru.nuptk = nuptk
        guru.namaGuru = namaGuru
        guru.username = username
        guru.password = password
        db.session.add(guru)
        db.session.commit()
    
    def delete(self, idguru):
        guru = Guru.query.get(idguru)
        db.session.delete(guru)
        db.session.commit()
