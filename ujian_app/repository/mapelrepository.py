from ujian_app.models import Matapelajaran, db

class MapelRepository:

    def save(self, namaMapel, KKM):
        mapel = Matapelajaran()
        mapel.namaMapel = namaMapel
        mapel.KKM = KKM
        db.session.add(mapel)
        db.session.commit()
    
    def findAll(self):
        return Matapelajaran.query.all()

    def update(self, idmapel,namaMapel,KKM):
        mapel = Matapelajaran.query.get(idMapel)
        mapel.namaMapel = namaMapel
        mapel.KKM = KKM
        db.session.add(mapel)
        db.session.commit()
    
    def delete(self, idmapel):
        mapel = Matapelajaran.query.get(idMapel)
        db.session.delete(mapel)
        db.session.commit()
