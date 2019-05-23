from .seleksidata import SeleksiData
from .pembobotan import NtfRfFactory
from .knearestneighbor import KNearestNeighbor
from ujian_app.models import ( 
    Soal, Jawaban, FiturObjekPenilaian, 
    FiturReferensiPenilaian, FiturObjekPenilaian, 
    Similarity, db
)
from ujian_app.penilaian.pemrosesan_jawaban import (
    PemrosesanDataUji
)

class PenskoranOtomatis(object):
    '''
    Kelas yang bertugas melakukan penilaian ujian esai 
    secara otomatis
    '''

    def __init__(self):
        self.idsoal = None
        self.knn = KNearestNeighbor(3)
        self.pemroses_data_uji = PemrosesanDataUji()
        self.ntfrffactory = NtfRfFactory()


    def set_id_soal(self, idsoal):
        '''
        idsoal untuk penskoran otomatis
        '''
        self.idsoal = idsoal

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
        self.pemroses_data_uji.proses_dan_simpan(self.idsoal)


    def pembobotan_term_datalatih(self):
        '''
        Melakukan pembobotan jawaban esai siswa
        '''
        ntf_rf = self.ntfrffactory.create(True)
        ntf_rf.calculate_and_save(self.idsoal)
    
    def pembobotan_term_datauji(self):
        '''
        Melakukan pembobotan jawaban esai siswa
        '''
        ntf_rf = self.ntfrffactory.create(False)
        ntf_rf.calculate_and_save(self.idsoal)

    
    def klasifikasi_knn(self):
        '''
        Melakukan klasifikasi jawaban esai siswa dengan 
        K-Nearest Neighbor
        '''
        self.knn.klasifikasi(self.idsoal)
    

    def skor_otomatis(self):
        '''
        Melakukan penskoran otomatis
        '''
        if self.idsoal is None:
            raise Exception('idsoal belum di set')
        
        #self.seleksi_data()
        self.pemrosesan_teks_datauji()
        self.pembobotan_term_datalatih()
        self.pembobotan_term_datauji()
        self.klasifikasi_knn()