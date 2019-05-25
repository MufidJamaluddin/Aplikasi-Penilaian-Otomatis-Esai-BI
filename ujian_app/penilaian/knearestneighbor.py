from ujian_app.models import ( 
    Soal, Jawaban, FiturObjekPenilaian, 
    FiturReferensiPenilaian, FiturObjekPenilaian, 
    Similarity, db
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

    def __get_list_idjawaban(self, idsoal):
        ''' 
        Ambil list idjawaban yang akan 
        dinilai otomatis
        berdasarkan idsoal
        '''
        listidjawaban = db.session.query(Jawaban.idjawaban).filter_by(
            idsoal=idsoal,
            nilaiOtomatis=1
        )
        return listidjawaban
    
    def __get_cosine_similarity(self, idjawaban_uji):
        '''
        Mendapatkan list cosine similarity
        antara jawaban data uji (jawaban yang akan 
        diberikan skor secara otomatis) terhadap
        jawaban data latih (jawaban yang dinilai manual
        oleh guru sebagai ref klasifikasi)

        Parameter:
            idjawaban_uji: idjawaban data uji
        '''
        list_sim = db.session.query(
            Similarity.skorAngka, 
            Similarity.skorHuruf
        ).filter_by(
            idjawaban_uji=idjawaban_uji
        ).limit(self.__k)
        return list_sim
    
    def __simpan_skor(self, idjawaban_uji, skor_huruf, skor_angka):
        '''
        Simpan Skor Hasil Klasifikasi

        Parameter:
        skorHuruf : skorHuruf hasil klasifikasi
        skorAngka : skorAngka pada jawaban data latih 
                    yang memiliki skorHuruf hasil klasifikasi
                    dan paling dekat dengan jawaban 
        '''
        db.session.query(Jawaban).filter(
            Jawaban.idjawaban == idjawaban_uji
        ).update({
            'skorHuruf': skor_huruf,
            'skorAngka': skor_angka
        })

        db.session.commit()
    
    def klasifikasi(self, idsoal):
        '''
        Melakukan klasifikasi jawaban siswa
        per soal

        Parameter:
            idsoal: soal yg jawabannya akan dilakukan
                    klasifikasi
        '''
        for jawaban in self.__get_list_idjawaban(idsoal):

            list_sim = self.__get_cosine_similarity(jawaban.idjawaban)

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

            self.__simpan_skor(
                jawaban.idjawaban,
                skor_huruf,
                sm['skorAngka']
            )