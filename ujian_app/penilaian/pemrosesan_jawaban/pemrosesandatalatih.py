from ujian_app.models import ( 
    FiturReferensiPenilaian, db
)
from . import PemrosesanJawaban
from ujian_app.penilaian.konversinilai import KonversiFactory

class PemrosesanDataLatih(PemrosesanJawaban):
    '''
    Kelas untuk pemrosesan teks data uji
    '''
    def __init__(self):
        super().__init__()
        self.konverter_factory = KonversiFactory()
    

    def get_konverter(self, idsoal):
        '''
        Mendapatkan Konverter Skor
        Angka ke Huruf
        '''
        return self.konverter_factory.create(idsoal)


    def proses_dan_simpan(self, idsoal, idkelas):
        '''
        Melakukan Pemrosesan Teks Data Uji
        (Jawaban) Berdasarkan ID Soal
        '''
        konverter = self.get_konverter(idsoal)

        for jawaban in self.get_list_jawaban(idsoal, idkelas):

            if jawaban.skorAngka is None:
                continue

            # Jika Jawabannya Bukan String Blank
            if jawaban.jawabanEsai.strip():

                fitur_vspace = self.premrosesan_teks(jawaban.jawabanEsai)
                panjangVektor = self.hitung_panjang_vektor(**fitur_vspace)

                skorHuruf = konverter.konversi(int(jawaban.skorAngka))

                jawaban.panjangVektor = panjangVektor
                jawaban.skorHuruf = str(skorHuruf)
                jawaban.nilaiOtomatis = 0

                db.session.add(jawaban)

                for key, value in fitur_vspace.items():
                    fitur_ref = FiturReferensiPenilaian()
                    fitur_ref.idjawaban = jawaban.idjawaban
                    fitur_ref.skorHuruf = skorHuruf
                    fitur_ref.term = key
                    fitur_ref.tf = value
                    db.session.add(fitur_ref)
                
                db.session.commit()