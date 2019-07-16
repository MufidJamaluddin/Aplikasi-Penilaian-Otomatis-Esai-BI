from ujian_app.repository import FiturObjekRepository
from sqlalchemy.sql.expression import and_
from math import log

class NtfRfUnlabeledWeighter(object):
    """
    Bertugas Melakukan Pembobotan Term NTF.RF
    Pada Dataset yang Tidak Berlabel (Fase Pengujian)
    """

    def __init__(self, ntfrf_repository):
        self.__ntfrf_repository = ntfrf_repository
        self.__fitur_repository = FiturObjekRepository()
    
    def __del__(self):
        del self.__fitur_repository

    def __calculate_ntf(self, idsoal, tf:int, term:str):
        """
        Menghitung Normalized Term Frequency (ntf)
        
            NTF = TF / MAX_TF
        """
        max_tf = self.__ntfrf_repository.get_max_tf(idsoal, term)
        
        #if max_tf == 0: GAK MUNGKIN MAX TF = 0 JIKA ADA TF
        #    max_tf = 1

        ntf = tf / max(1, max_tf)
        return ntf


    def __calculate_rf(self, idsoal, term:str):
        """
        Max RF
        """
        rf = self.__ntfrf_repository.get_max_rf(idsoal, term)

        return rf


    def __calculate(self, idsoal, tf:int, term:str):
        """
        Menghitung Normalized Term Frequency - Relevance Frequency (ntf.rf)
        Return : ntf_rf

            NTFRF = NTF x RF

        """
        ntf = self.__calculate_ntf(idsoal, tf, term)
        rf = self.__calculate_rf(idsoal, term)

        ntf_rf = ntf * rf

        return ntf_rf
    
    
    def calculate_and_save(self, idsoal):
        list_fitur = self.__fitur_repository.\
            get_list_fitur(idsoal)

        last_idjawaban = None
        for fitur in list_fitur:

            ntf_rf = self.__calculate(idsoal, fitur.tf, fitur.term)

            fitur.ntf_rf = ntf_rf

            cur_idjawaban = fitur.jawaban.idjawaban
            if last_idjawaban != cur_idjawaban:
                fitur.jawaban.kode_proses = '3'
                last_idjawaban = cur_idjawaban       
            
            self.__fitur_repository.add_fitur(fitur)
        self.__fitur_repository.commit()