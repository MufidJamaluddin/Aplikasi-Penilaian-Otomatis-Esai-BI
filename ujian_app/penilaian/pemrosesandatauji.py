from ujian_app.models import ( 
    Soal, Jawaban, FiturObjekPenilaian, 
    FiturReferensiPenilaian, FiturObjekPenilaian, 
    Similarity, db
)
from math import sqrt
from .pemrosesan_teks import Preprocesser

class PemrosesanDataUji(object):
    '''
    Kelas untuk pemrosesan teks data uji
    '''
    def __init__(self):
        self.preprocesser = Preprocesser()

    def kalkulasi_panjang_vektor(self, **vector_space):
        '''
        Melakukan kalkulasi panjag vektor dari
        vektor term (tipe data dictionary python)
        '''
        vspace_items = vector_space.items()
        kuadrat_vspace = [(tf**2) for term, tf in vspace_items]
        hasil = sum(kuadrat_vspace)
        return sqrt(hasil)
    
    def get_list_jawaban(self, idsoal):
        '''
        Mendapatkan list data uji
        (jawaban yang akan belum dinilai guru)
        berdasarkan idsoal
        '''
        listjawaban = Jawaban.query.filter_by(
            skorHuruf = None,
            idsoal = self.idsoal
        )
        return listjawaban

    
    def process_and_save(self, idsoal):
        '''
        Melakukan Pemrosesan Teks Data Uji
        (Jawaban) Berdasarkan ID Soal
        '''
        for jawaban in self.get_list_jawaban(idsoal):

            # Jika Jawabannya NULL
            if jawaban.jawabanEsai is None:
                continue

            # Jika Jawabannya Bukan String Blank
            if jawaban.jawabanEsai.strip():

                fitur_vspace = self.preprocesser.preprocess_text(jawaban.jawabanEsai)
                jawaban.panjangVektor = self.kalkulasi_panjang_vektor(**fitur_vspace)
                jawaban.nilaiOtomatis = 1
                db.session.add(jawaban)

                for key, value in fitur_vspace.items():
                    fitur_obj = FiturObjekPenilaian()
                    fitur_obj.idjawaban = jawaban.idjawaban
                    fitur_obj.term = key
                    fitur_obj.tf = value
                    db.session.add(fitur_obj)
                    db.session.add(jawaban)
            
                db.session.commit()