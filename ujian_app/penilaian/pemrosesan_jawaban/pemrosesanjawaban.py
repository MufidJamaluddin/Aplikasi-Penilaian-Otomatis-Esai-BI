from abc import ABC, abstractmethod
from math import sqrt
from ujian_app.penilaian.pemrosesan_teks import Preprocesser
from ujian_app.repository import JawabanRepository
from sqlalchemy.sql.expression import and_

class PemrosesanJawaban(ABC):
    '''
    Abstract class yang bertugas
    melakukan Pemrosesan Jawaban Siswa
    '''

    def __init__(self):
        self.__preprocesser = Preprocesser()
        self.__repo = JawabanRepository()
    
    def __del__(self):
        del self.__preprocesser
        del self.__repo


    def _get_repo(self):
        '''
        Mendapatkan Jawaban Repository
        '''
        return self.__repo


    def _kalkulasi_panjang_vektor(self, **vector_space):
        '''
        Melakukan kalkulasi panjag vektor dari
        vektor term (tipe data dictionary python)
        '''
        vspace_items = vector_space.items()
        kuadrat_vspace = [(tf**2) for term, tf in vspace_items]
        hasil = sqrt(sum(kuadrat_vspace))
        return hasil
    

    def _premrosesan_teks(self, jawabanEsai):
        '''
        Melakukan pemrosesan teks
        '''
        return self.__preprocesser.preprocess_text(jawabanEsai)
    

    @abstractmethod
    def proses_dan_simpan(self):
        '''
        Proses dan simpan TF jawaban siswa 
        '''
        pass