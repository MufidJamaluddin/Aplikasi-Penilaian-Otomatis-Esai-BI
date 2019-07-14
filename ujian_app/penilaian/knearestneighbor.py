from ujian_app.repository import (
    ProgressRepository, CosineSimRepository,
    JawabanRepository
)

class KNearestNeighbor(object):
    '''
    Kelas untuk klasifikasi KNN
    '''

    def __init__(self, k_knn:int):
        '''
        k_knn : Nilai K tetangga terdekaat pada KNN
        '''
        self.__k = k_knn
        self.__cosim_repo = CosineSimRepository()
        self.__jawaban_repo = JawabanRepository
    
    def __del__(self):
        del self.__jawaban_repo
        del self.__cosim_repo
        del self.__k

    def __get_listidjawaban_uji(self, idsoal):
        ''' 
        Ambil list idjawaban yang akan 
        dinilai otomatis
        berdasarkan idsoal
        '''
        listidjawaban = self.__jawaban_repo.get_listidjawaban(
            idsoal=idsoal,
            nilaiOtomatis=1,
            kode_proses='3'
        )
        return listidjawaban
    

    def klasifikasi(self, idsoal):
        '''
        Melakukan klasifikasi jawaban siswa
        per soal

        Parameter:
            idsoal: soal yg jawabannya akan dilakukan
                    klasifikasi
        '''
        for jawaban in self.__get_listidjawaban_uji(idsoal):

            list_sim = self.__cosim_repo.\
                get_cosine_similarity(jawaban.idjawaban)

            # DICTIONARY KEMUNCULAN SKOR HURUF
            count_class = {}

            for sim in list_sim:
                if count_class.get(sim.skorHuruf, None) is None:
                    # SKOR ANGKA DAN ID JAWABAN
                    # DATA UJI YG TERDEKAT 
                    count_class[sim.skorHuruf] = {
                        'freq': 1,
                        'skorAngka': sim.skorAngka
                    }
                else:
                    count_class[sim.skorHuruf]['freq'] += 1
            
            # URUTKAN BERDASARKAN INDEX KEDUA PADA TUPLE (ASC)
            #   INDEX PERTAMA   (0): SKOR
            #   INDEX KEDUA     (1): DICT
            sorted_cc = sorted(count_class.items(), key=lambda a:a[1]['freq'])

            # AMBIL SKOR KEMUNCULAN YG TERBESAR
            skor_huruf, sm = sorted_cc.pop()

            self.__jawaban_repo.simpan_skor(
                jawaban.idjawaban,
                skor_huruf,
                sm['skorAngka']
            )