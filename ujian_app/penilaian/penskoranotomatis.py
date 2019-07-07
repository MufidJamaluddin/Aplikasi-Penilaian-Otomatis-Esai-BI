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
from ujian_app.repository import ProgressRepository

class PenskoranOtomatis(object):
    '''
    Kelas yang bertugas melakukan penilaian ujian esai 
    secara otomatis
    '''

    def __init__(self, progress_state: ProgressRepository):
        '''
        Konstruktor
        '''
        self.__idsoal = None
        self.__knn = KNearestNeighbor(3, progress_state)
        self.__pemroses_data_uji = PemrosesanDataUji(progress_state)
        self.__ntfrffactory = NtfRfFactory(progress_state)
        self.__progress = progress_state
    

    def __del__(self):
        '''
        Destruktor
        '''
        del self.__idsoal
        del self.__knn
        del self.__pemroses_data_uji
        del self.__ntfrffactory
    

    def set_id_soal(self, idsoal):
        '''
        idsoal untuk penskoran otomatis
        '''
        self.__idsoal = idsoal

#    def seleksi_data(self):
#        '''
#        Menentukan seleksi data latih sebagai referensi
#        klasifikasi
#        '''
#        self.penseleksi_data.undersampling()


    def __pemrosesan_teks_datauji(self):
        '''
        Melakukan Pemrosesan Teks Data Uji 
        ( Esai Siswa yang Belum Dinilai )
        '''
        self.__pemroses_data_uji.proses_dan_simpan(self.__idsoal)


    def __pembobotan_term_datalatih(self):
        '''
        Melakukan pembobotan jawaban esai siswa
        '''
        ntf_rf = self.__ntfrffactory.create(True)
        ntf_rf.calculate_and_save(self.__idsoal)
    
    def __pembobotan_term_datauji(self):
        '''
        Melakukan pembobotan jawaban esai siswa
        '''
        ntf_rf = self.__ntfrffactory.create(False)
        ntf_rf.calculate_and_save(self.__idsoal)

    
    def __klasifikasi_knn(self):
        '''
        Melakukan klasifikasi jawaban esai siswa dengan 
        K-Nearest Neighbor
        '''
        self.__knn.klasifikasi(self.__idsoal)
    

    def skor_otomatis(self):
        '''
        Melakukan penskoran otomatis
        '''
        if self.__idsoal is None:
            raise Exception('idsoal belum di set')
        
        #self.seleksi_data()

        # Persiapan
        if self.__progress == None:
            self.__progress.set_proses(1)

        # Tahap 1
        if self.__progress == 1:
            self.__pemrosesan_teks_datauji()
            self.__progress.set_proses(2)

        # Tahap 2
        if self.__progress == 2:
            self.__pembobotan_term_datalatih()
            self.__progress.set_proses(3)

        # Tahap 3
        if self.__progress == 3:
            self.__pembobotan_term_datauji()
            self.__progress.set_proses(4)

        # Tahap 4
        if self.__progress == 4:
            self.__klasifikasi_knn()
        
        self.__progress.set_proses(None)