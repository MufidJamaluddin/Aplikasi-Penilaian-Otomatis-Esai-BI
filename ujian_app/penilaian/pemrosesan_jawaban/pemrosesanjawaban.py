from abc import ABC, abstractmethod
from math import sqrt
from ujian_app.penilaian import Preprocesser
from ujian_app.models import Jawaban, Siswa
from sqlalchemy.sql.expression import and_

class PemrosesanJawaban(ABC):
    '''
    Abstract class yang bertugas
    melakukan Pemrosesan Jawaban Siswa
    '''

    def __init__(self):
        self.preprocesser = Preprocesser()
    

    def kalkulasi_panjang_vektor(self, **vector_space):
        '''
        Melakukan kalkulasi panjag vektor dari
        vektor term (tipe data dictionary python)
        '''
        vspace_items = vector_space.items()
        kuadrat_vspace = [(tf**2) for term, tf in vspace_items]
        hasil = sum(kuadrat_vspace)
        return sqrt(hasil)
    

    def premrosesan_teks(self, jawabanEsai):
        '''
        Melakukan pemrosesan teks
        '''
        return self.premrosesan_teks.preprocess_text(jawabanEsai)


    def get_list_jawaban(self, idsoal, idkelas = None):
        '''
        Mendapatkan list data uji
        (jawaban yang akan belum dinilai guru)
        berdasarkan idsoal
        '''
        if idkelas is None:
            # Data Uji
            listjawaban = Jawaban.query.filter_by(
                skorHuruf = None,
                idsoal = self.idsoal
            )
        else:
            # Data Latih
            list_jawaban = Jawaban.query.join(Siswa).filter(
                and_(
                    Jawaban.idsoal == self.idsoal,
                    Siswa.idkelas == self.idkelas
                )
            )
        
        return listjawaban
    

    @abstractmethod
    def proses_dan_simpan(self):
        '''
        Proses dan simpan TF jawaban siswa 
        '''
        pass