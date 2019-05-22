from .pemrosesan_teks import Preprocesser
from .konversinilai import Konversi
from ujian_app.models import Jawaban, Siswa,FiturReferensiPenilaian, db
from sqlalchemy.sql.expression import and_
from math import sqrt

class PenilaianManual(object):

    def __init__(self, idsoal:int, idkelas:int):
        self.idsoal = idsoal
        self.idkelas = idkelas
        self.preprocesser = Preprocesser()
        self.konversi = Konversi(idsoal)
    
    def hitung_panjang_vektor(self, **vector_space):
        vspace_value = vector_space.items()
        kuadrat_vspace = [(tf**2) for term, tf in vspace_value]
        hasil = sum(kuadrat_vspace)
        hasil = sqrt(hasil)
        return hasil
    
    def nilai_manual(self):
        list_jawaban = Jawaban.query.join(Siswa).filter(
            and_(
                Jawaban.idsoal == self.idsoal,
                Siswa.idkelas == self.idkelas
            )
        )

        for jawaban in list_jawaban:

            if jawaban.skorAngka is None:
                continue

            # Jika Jawabannya Bukan String Blank
            if jawaban.jawabanEsai.strip():

                fitur_vspace = self.preprocesser.preprocess_text(jawaban.jawabanEsai)
                panjangVektor = self.hitung_panjang_vektor(**fitur_vspace)

                skorHuruf = self.konversi.ke_huruf(int(jawaban.skorAngka))

                jawaban.panjangVektor = panjangVektor
                jawaban.skorHuruf = skorHuruf
                jawaban.nilaiOtomatis = 0

                db.session.add(jawaban)

                for key, value in fitur_vspace.items():
                    fitur_ref = FiturReferensiPenilaian()
                    fitur_ref.idjawaban = jawaban.idjawaban
                    fitur_ref.skorHuruf = skorHuruf
                    fitur_ref.term = key
                    fitur_ref.tf = value
                    db.session.add(fitur_ref)
                
                db.session.commit()
            #db.session.flush()