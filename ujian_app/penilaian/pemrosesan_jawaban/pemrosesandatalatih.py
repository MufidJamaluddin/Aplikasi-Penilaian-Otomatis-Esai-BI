from ujian_app.models import ( 
    FiturReferensiPenilaian, db
)
from . import PemrosesanJawaban
from ujian_app.penilaian.konversiskor import KonversiFactory

class PemrosesanDataLatih(PemrosesanJawaban):
    '''
    Kelas untuk pemrosesan teks data uji
    '''
    def __init__(self):
        super().__init__()
        self.__konverter_factory = KonversiFactory()
    
    def __del__(self):
        super().__del__()
        del self.__konverter_factory

    def __get_konverter(self, idsoal):
        '''
        Mendapatkan Konverter Skor
        Angka ke Huruf
        '''
        return self.__konverter_factory.create(idsoal)


    def proses_dan_simpan(self, idsoal, idkelas):
        '''
        Melakukan Pemrosesan Teks Data Uji
        (Jawaban) Berdasarkan ID Soal
        '''
        konverter = self.__get_konverter(idsoal)

        listjawaban = self._get_list_jawaban(idsoal, idkelas)

        for jawaban in listjawaban:

            if jawaban.skorAngka is None:
                continue

            # Jika Jawabannya Bukan String Blank
            if jawaban.jawabanEsai.strip():

                fitur_vspace = self._premrosesan_teks(jawaban.jawabanEsai)
                panjang_vektor = self._kalkulasi_panjang_vektor(**fitur_vspace)

                skor_huruf = konverter.konversi(int(jawaban.skorAngka))

                jawaban.panjangVektor = panjang_vektor
                jawaban.skorHuruf = skor_huruf
                jawaban.nilaiOtomatis = 0

                jml_term = len(jawaban.fitur_ref)
                if jml_term == 0:
                    jawaban.fitur_ref = []

                for key, value in fitur_vspace.items():
                    fitur_ref = FiturReferensiPenilaian()
                    fitur_ref.skorHuruf = skor_huruf
                    fitur_ref.term = key
                    fitur_ref.tf = value
                    jawaban.fitur_ref.append(fitur_ref)

                db.session.add(jawaban)
                db.session.flush()
                
        db.session.commit()