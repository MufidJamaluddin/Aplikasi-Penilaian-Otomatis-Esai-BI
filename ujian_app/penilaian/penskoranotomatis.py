from .pemrosesan_teks import Preprocesser
from .seleksidata import SeleksiData
from ujian_app.models import ( 
    Soal, Jawaban, FiturObjekPenilaian, 
    FiturReferensiPenilaian, FiturObjekPenilaian, db
)
from math import sqrt

class PenskoranOtomatis(object):
    '''
    Kelas yang bertugas melakukan penilaian ujian esai 
    secara otomatis pada satu ujian
    '''

    def __init__(self, idsoal):
        '''
        Inisiasi idsoal : idsoal yg dinilai otomatis
        Inisiasi listidjawaban : idjawaban yg dipilih
            secara random
        '''
        self.idsoal = idsoal
        self.seleksi_data = SeleksiData(idsoal)
        self.preprocesser = Preprocesser()

    
    def seleksi_data(self):
        '''
        Menentukan seleksi data latih sebagai referensi
        klasifikasi
        '''
        self.seleksi_data.undersampling()


    def pemrosesan_teks_datauji(self):
        '''
        Melakukan Pemrosesan Teks Data Uji 
        ( Esai Siswa yang Belum Dinilai )
        '''
        listjawaban = Jawaban.query.filter_by(
            skorHuruf = None
        )

        for jawaban in listjawaban:
            fitur_vspace = self.preprocesser.preprocess_text(jawaban.jawabanEsai)
            jawaban.panjangVektor =  self.kalkulasi_panjang_vektor(**fitur_vspace)
            db.session.add(jawaban)

            for key, value in fitur_vspace:
                fitur_obj = FiturObjekPenilaian()
                fitur_obj.idjawaban = jawaban.idjawaban
                fitur_obj.term = key
                fitur_obj.tf = value
                db.session.add(fitur_obj)
                db.session.add(jawaban)
            
            db.session.commit()


    def pembobotan_term(self):
        '''
        Melakukan pembobotan jawaban esai siswa
        '''
        pass
    
    def kalkulasi_panjang_vektor(self, **vector_space):
        '''
        Melakukan kalkulasi panjag vektor dari
        vektor term (tipe data dictionary python)
        '''
        kuadrat_vspace = [(tf**2) for term, tf in vector_space.items]
        hasil = sum(kuadrat_vspace)
        return sqrt(hasil)
    
    def klasifikasi_knn(self):
        '''
        Melakukan klasifikasi jawaban esai siswa dengan 
        K-Nearest Neighbor
        '''
        pass
    
    def skor_otomatis(self):
        '''
        Melakukan penskoran otomatis
        '''
        self.seleksi_data()
        self.pemrosesan_teks_datauji()
        self.pembobotan_term()
        self.klasifikasi_knn()