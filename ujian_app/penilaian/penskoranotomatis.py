from .pemrosesan_teks import Preprocesser
from .seleksidata import SeleksiData
from .pembobotan import NtfRfLabeledWeighter, NtfRfUnlabeledWeighter
from ujian_app.models import ( 
    Soal, Jawaban, FiturObjekPenilaian, 
    FiturReferensiPenilaian, FiturObjekPenilaian, 
    Similarity, db
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

        # AMBIL LIST ID JAWABAN YANG:
        #   SOAL YANG DIUJI
        #   YANG DINILAI OTOMATIS
        listidjawaban = db.query(Jawaban.idjawaban).filter_by(
            idsoal=self.idsoal,
            nilaiOtomatis=1
        )

        # AMBIL 3 BUAH SIMILARITY JAWABAN
        #   KNN K=3
        for jawaban in listidjawaban:

            list_sim = db.query(
                Similarity.idjawaban_uji,
                Similarity.skorAngka, 
                Similarity.skorHuruf
            ).filter_by(
                idjawaban=jawaban.idjawaban
            ).limit(3)

            # DICTIONARY KEMUNCULAN SKOR HURUF
            count_class = {}

            for sim in list_sim:
                if count_class[sim.skorHuruf] is None:
                    # SKOR ANGKA DAN ID JAWABAN
                    # DATA UJI YG TERDEKAT 
                    count_class[sim.skorHuruf] = {
                        'freq': 1,
                        'idjawaban_uji': sim.idjawaban_uji,
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
            
            # SIMPAN SKOR ANGKA
            db.session.query(Jawaban).filter(
                Jawaban.idjawaban == sm['idjawaban_uji']
            ).update({
                'skorHuruf': skor_huruf,
                'skorAngka': sm['skorAngka']
            })

            db.session.commit()
    
    def skor_otomatis(self):
        '''
        Melakukan penskoran otomatis
        '''
        #self.seleksi_data()
        self.pemrosesan_teks_datauji()
        self.pembobotan_term_datalatih()
        self.pembobotan_term_datauji()
        self.klasifikasi_knn()