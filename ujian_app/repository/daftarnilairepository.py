#from . import GenericRepository
from ujian_app.models import NilaiUjian, DaftarNilaiUjian, Jawaban, Ujian, Soal, Siswa, db
from sqlalchemy import and_
from sqlalchemy.orm import subqueryload, aliased

class DaftarNilaiRepository:


    def get_skor(self, idujian, idkelas):
        subquery = db.session.query(Jawaban)\
            .options(subqueryload(Jawaban.soal))\
            .filter(
                and_(
                    DaftarNilaiUjian.idujian == idujian,
                    Soal.idujian == DaftarNilaiUjian.idujian,
                    Jawaban.idsoal == Soal.idsoal
                )
            ).subquery()

        daftar_skor = aliased(Jawaban, subquery)

        return db.session.query(Siswa)\
            .join(daftar_skor, Siswa.jawaban)\
            .filter(
                and_(Siswa.idkelas == idkelas, Siswa.nis == daftar_skor.nis)
            ).all()
        

    def get_nilai(self, idmapel, idkelas):
        subquery = db.session.query(DaftarNilaiUjian)\
            .options(subqueryload(DaftarNilaiUjian.ujian))\
            .filter(
                and_(
                    Ujian.idmapel == idmapel, 
                    DaftarNilaiUjian.idujian == Ujian.idujian
                )
            ).subquery()

        daftar_nilai = aliased(DaftarNilaiUjian, subquery)

        return db.session.query(Siswa)\
            .join(daftar_nilai, Siswa.daftarnilaiujian)\
            .filter(
                and_(Siswa.idkelas == idkelas, Siswa.nis == daftar_nilai.nis)
            ).all()