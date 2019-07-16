from . import GenericRepository
from ujian_app.models import Jawaban, Soal, Kelas, Siswa, db
from sqlalchemy.sql.expression import and_
from sqlalchemy.orm import aliased

class JawabanRepository(GenericRepository):

    def __init__(self):
        super().__init__(Jawaban)


    def get_listidjawaban(self, **kwargs):
        ''' 
        Ambil list idjawaban
        '''
        listidjawaban = db.session.query(Jawaban.idjawaban)\
            .filter_by(**kwargs)
        return listidjawaban
    

    def get_data_latih(self, idkelas, idsoal):
        '''
        Mendapatkan Jawaban Data Latih
        '''
        listjawaban = Jawaban.query.join(Siswa).filter(
            and_(
                Jawaban.idsoal == idsoal,
                Jawaban.skorHuruf != None,
                Siswa.idkelas == idkelas
            )
        )
        return listjawaban


    def get_data_uji(self, idsoal):
        '''
        Mendapatkan Jawaban Data Uji (skorHuruf = None)
        '''
        listjawaban = Jawaban.query.filter_by(
            skorHuruf = None,
            idsoal = idsoal
        )
        return listjawaban


    def simpan_skor(self, idjawaban, skor_huruf, skor_angka):
        '''
        Simpan Skor

        Parameter:
        skorHuruf : skorHuruf hasil klasifikasi
        skorAngka : skorAngka pada jawaban data latih 
                    yang memiliki skorHuruf hasil klasifikasi
                    dan paling dekat dengan jawaban 
        '''
        db.session.query(Jawaban).filter(
            Jawaban.idjawaban == idjawaban
        ).update({
            'skorHuruf': skor_huruf,
            'skorAngka': skor_angka,
            'kode_proses': '4'
        })

        db.session.commit()


    def find_by_soal(self, idujian, idkelas, idsoal):
        kelas = db.session\
            .query(Kelas.namaKelas)\
            .filter_by(idkelas=idkelas).first()

        listjawaban = Jawaban.query\
            .join(Soal).filter(
                and_(
                    Soal.idujian == idujian,
                    Soal.idsoal == idsoal,
                    Jawaban.namaKelas == kelas[0]
                )
            )\
            .all()
        return listjawaban
    
    def updateJawaban(self, idjawaban, jawabanEsai):
        jawaban = Jawaban.query.get(idjawaban)
        jawaban.jawabanEsai = jawabanEsai

        db.session.add(jawaban)
        db.session.commit()