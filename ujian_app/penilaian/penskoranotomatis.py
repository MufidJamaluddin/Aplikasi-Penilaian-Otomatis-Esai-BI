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
        '''
        Konstruktor
        '''
        self.__idsoal = None
        self.__knn = KNearestNeighbor(3)
        self.__pemroses_data_uji = PemrosesanDataUji()
        self.__ntfrffactory = NtfRfFactory()
    

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
        self.__pemrosesan_teks_datauji()
        self.__pembobotan_term_datalatih()
        self.__pembobotan_term_datauji()
        self.__klasifikasi_knn()