from ujian_app.models import ( 
    FiturObjekPenilaian, db
)
from . import PemrosesanJawaban
from ujian_app.repository import ProgressRepository

class PemrosesanDataUji(PemrosesanJawaban):
    '''
    Kelas untuk pemrosesan teks data uji
    '''
    def __init__(self, progress_state: ProgressRepository):
        super().__init__()
        self.__progress = progress_state
    
    def proses_dan_simpan(self, idsoal):
        '''
        Melakukan Pemrosesan Teks Data Uji
        (Jawaban) Berdasarkan ID Soal
        '''
        listjawaban = self._get_list_jawaban(idsoal)
        
        for jawaban in listjawaban:

            if self.__progress.idjawaban is None:
                self.__progress.set_jawaban(jawaban.idjawaban)
            
            # Lanjutkan Progress Terakhir
            if self.__progress.idjawaban != jawaban.idjawaban:
                continue

            # Jika Jawabannya NULL
            if jawaban.jawabanEsai is None:
                self.__progress.set_jawaban(None)
                continue

            # Jika Jawabannya Bukan String Blank
            if jawaban.jawabanEsai.strip():
                
                try:
                    fitur_vspace = self._premrosesan_teks(jawaban.jawabanEsai)
                    jawaban.panjangVektor = self._kalkulasi_panjang_vektor(**fitur_vspace)
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
                except:
                    pass

            self.__progress.set_jawaban(None)