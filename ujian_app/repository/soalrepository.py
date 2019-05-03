from ujian_app.models import Soal, db

class SiswaRepository:

    def save(self, idujian, soalEsai, skorMin, skorMax, kompetensiDasar, materiPokok):
        soal = Soal()

        soal.idujian = idujian
        soal.soalEsai = soalEsai
        soal.skorMin = skorMin
        soal.skorMax = skorMax
        soal.kompetensiDasar = kompetensiDasar
        soal.materiPokok = materiPokok

        db.session.add(soal)
        db.session.commit()
    
    def findAll(self, idujian):
        return Soal.query.filter_by(idujian = idujian).all()

    def update(self, idsoal, idujian, soalEsai, skorMin, skorMax, kompetensiDasar, materiPokok):
        soal = Soal.query.get(idsoal)

        soal.idujian = idujian
        soal.soalEsai = soalEsai
        soal.skorMin = skorMin
        soal.skorMax = skorMax
        soal.kompetensiDasar = kompetensiDasar
        soal.materiPokok = materiPokok

        db.session.add(soal)
        db.session.commit()
    
    def delete(self, idsoal):
        soal = Soal.query.get(idsoal)
        db.session.delete(soal)

        db.session.commit()
