from .pemrosesan_teks import Preprocesser
from .konversinilai import Konversi
from ujian_app.models import Jawaban, FiturReferensiPenilaian, db
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
        return sum(kuadrat_vspace)
    
    def nilai_manual(self):
        list_jawaban = Jawaban.query.filter_by(idsoal=self.idsoal).all()

        for jawaban in list_jawaban:
            fitur_vspace = self.preprocesser.preprocess_text(jawaban.jawabanEsai)
            panjangVektor = self.hitung_panjang_vektor(**fitur_vspace)

            skorHuruf = self.konversi.ke_huruf(int(jawaban.skorAngka))

            setattr(jawaban, 'panjangVektor', panjangVektor)
            setattr(jawaban, 'skorHuruf', skorHuruf)

            db.session.add(jawaban)

            db.session.commit()
            db.session.flush()

            for key, value in fitur_vspace.items():
                fitur_ref = FiturReferensiPenilaian()
                fitur_ref.idjawaban = jawaban.idjawaban
                fitur_ref.skorHuruf = skorHuruf
                fitur_ref.term = key
                fitur_ref.tf = value
                db.session.add(fitur_ref)
            
            db.session.commit()