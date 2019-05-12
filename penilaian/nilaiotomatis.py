from penilaian.pemrosesan_teks import Preprocesser

class NilaiOtomatis(object):
    '''
    Kelas yang bertugas melakukan penilaian ujian esai 
    secara otomatis pada satu ujian
    '''

    def __init__(self, idujian):
        self.idujian = idujian
    
    def seleksi_data(self):
        '''
        Menentukan seleksi data latih sebagai referensi
        klasifikasi
        '''
        pass

    def pemrosesan_teks_datauji(self):
        '''
        Melakukan Pemrosesan Teks Data Uji 
        ( Esai Siswa yang Belum Dinilai )
        '''
        pass

    def pembobotan_term(self):
        '''
        Melakukan pembobotan jawaban esai siswa
        '''
        pass
    
    def kalkulasi_panjang_vektor(self, **vektor_term_dict):
        '''
        Melakukan kalkulasi panjag vektor dari
        vektor term (tipe data dictionary python)
        '''
        pass
    
    def klasifikasi_knn(self):
        '''
        Melakukan klasifikasi jawaban esai siswa dengan 
        K-Nearest Neighbor
        '''
        pass
    
    def kalkulasi_nilai_ujian_siswa(self):
        '''
        Melakukan kalkulasi nilai ujian siswa
        '''
        pass
    
    def nilai_otomatis(self):
        '''
        Melakukan penilaian otomatis
        '''
        pass