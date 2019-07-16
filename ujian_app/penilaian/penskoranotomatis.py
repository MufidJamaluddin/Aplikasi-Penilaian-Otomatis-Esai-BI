from .seleksidata import SeleksiData
from .pembobotan import NtfRfFactory
from .knearestneighbor import KNearestNeighbor
from ujian_app.penilaian.pemrosesan_jawaban import (
    PemrosesanDataUji
)
from ujian_app.repository import ProgressRepository
import time

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
        self.__knn = KNearestNeighbor(3)
        self.__pemroses_data_uji = PemrosesanDataUji()
        self.__ntfrffactory = NtfRfFactory()
        self.__progress_state = progress_state
    

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
        if self.__progress_state.get_state_kode_proses() == None:
            self.__progress_state.set_state_proses('1')


        # Tahap 1
        if self.__progress_state.get_state_kode_proses() == '1':
            self.__pemrosesan_teks_datauji()
            self.__progress_state.set_state_proses('2')
            time.sleep(1.5)


        # Tahap 2
        if self.__progress_state.get_state_kode_proses() == '2':
            self.__pembobotan_term_datalatih()
            self.__progress_state.set_state_proses('3')
            time.sleep(1.5)

        # Tahap 3
        if self.__progress_state.get_state_kode_proses() == '3':
            self.__pembobotan_term_datauji()
            self.__progress_state.set_state_proses('4')
            time.sleep(1.5)

        # Tahap 4
        if self.__progress_state.get_state_kode_proses() == '4':
            self.__klasifikasi_knn()
            time.sleep(1.5)