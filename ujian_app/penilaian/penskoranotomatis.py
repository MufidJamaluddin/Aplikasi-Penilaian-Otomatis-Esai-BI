from .pemrosesan_teks import Preprocesser
from .seleksidata import SeleksiData
from .pembobotan import NtfRfLabeledWeighter, NtfRfUnlabeledWeighter
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
#        self.penseleksi_data = SeleksiData(idsoal)
        self.preprocesser = Preprocesser()


#    def seleksi_data(self):
#        '''
#        Menentukan seleksi data latih sebagai referensi
#        klasifikasi
#        '''
#        self.penseleksi_data.undersampling()


    def pemrosesan_teks_datauji(self):
        '''
        Melakukan Pemrosesan Teks Data Uji 
        ( Esai Siswa yang Belum Dinilai )
        '''
        listjawaban = Jawaban.query.filter_by(
            skorHuruf = None,
            idsoal = self.idsoal
        )

        for jawaban in listjawaban:

            # Jika Jawabannya NULL
            if jawaban.jawabanEsai is None:
                continue

            # Jika Jawabannya Bukan String Blank
            if jawaban.jawabanEsai.strip():

                fitur_vspace = self.preprocesser.preprocess_text(jawaban.jawabanEsai)
                jawaban.panjangVektor =  self.kalkulasi_panjang_vektor(**fitur_vspace)
                db.session.add(jawaban)

                for key, value in fitur_vspace.items():
                    fitur_obj = FiturObjekPenilaian()
                    fitur_obj.idjawaban = jawaban.idjawaban
                    fitur_obj.term = key
                    fitur_obj.tf = value
                    db.session.add(fitur_obj)
                    db.session.add(jawaban)
            
                db.session.commit()


    def pembobotan_term_datalatih(self):
        '''
        Melakukan pembobotan jawaban esai siswa
        '''
        ntf_rf = NtfRfLabeledWeighter(self.idsoal)
        ntf_rf.calculate_and_save()
    
    def pembobotan_term_datauji(self):
        '''
        Melakukan pembobotan jawaban esai siswa
        '''
        ntf_rf = NtfRfUnlabeledWeighter(self.idsoal)
        ntf_rf.calculate_and_save()

    def kalkulasi_panjang_vektor(self, **vector_space):
        '''
        Melakukan kalkulasi panjag vektor dari
        vektor term (tipe data dictionary python)
        '''
        vspace_items = vector_space.items()
        kuadrat_vspace = [(tf**2) for term, tf in vspace_items]
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
        #self.seleksi_data()
        self.pemrosesan_teks_datauji()
        self.pembobotan_term_datalatih()
        self.pembobotan_term_datauji()
        self.klasifikasi_knn()