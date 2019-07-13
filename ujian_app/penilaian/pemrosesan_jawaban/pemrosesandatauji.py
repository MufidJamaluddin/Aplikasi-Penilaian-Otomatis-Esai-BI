from ujian_app.models import ( 
    FiturObjekPenilaian, db
)
from . import PemrosesanJawaban

class PemrosesanDataUji(PemrosesanJawaban):
    '''
    Kelas untuk pemrosesan teks data uji
    '''
    def __init__(self):
        super().__init__()
    
    def proses_dan_simpan(self, idsoal):
        '''
        Melakukan Pemrosesan Teks Data Uji
        (Jawaban) Berdasarkan ID Soal
        '''
        listjawaban = self._get_list_jawaban(idsoal)
        
        for jawaban in listjawaban:

            if jawaban.jawabanEsai is None:
                continue

            # Jika Jawabannya Bukan String Blank
            if jawaban.jawabanEsai.strip():
                
                try:
                    fitur_vspace = self._premrosesan_teks(jawaban.jawabanEsai)
                    jawaban.panjangVektor = self._kalkulasi_panjang_vektor(**fitur_vspace)
                    jawaban.nilaiOtomatis = 1
                    jawaban.kode_proses = '1'
                    db.session.add(jawaban)

                    for key, value in fitur_vspace.items():
                        fitur_obj = FiturObjekPenilaian()
                        fitur_obj.idjawaban = jawaban.idjawaban
                        fitur_obj.term = key
                        fitur_obj.tf = value
                        db.session.add(fitur_obj)
                        db.session.add(jawaban)
                
                    db.session.commit()
                
                # Error Duplikat, continue aja
                except:
                    continue