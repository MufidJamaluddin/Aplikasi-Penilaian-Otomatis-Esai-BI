from ujian_app.models import FiturObjekPenilaian, Jawaban,db
from sqlalchemy.sql.expression import and_
from math import log

class NtfRfUnlabeledWeighter(object):
    """
    Bertugas Melakukan Pembobotan Term NTF.RF
    Pada Dataset yang Tidak Berlabel (Fase Pengujian)
    """

    def __init__(self, docnum_repository, ntfrf_repository, progress_state):
        self.__docnum_repository = docnum_repository
        self.__ntfrf_repository = ntfrf_repository
        self.__progress = progress_state
    

    def __calculate_ntf(self, idsoal, tf:int, term:str):
        """
        Menghitung Normalized Term Frequency (ntf)
        
            NTF = TF / MAX_TF
        """
        max_tf = self.__ntfrf_repository.get_max_tf(idsoal, term)
        
        if max_tf == 0:
            max_tf = 1

        ntf = tf / max_tf
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
        list_fitur = FiturObjekPenilaian.query.join(Jawaban).filter(
            Jawaban.idsoal == idsoal
        )

        for fitur in list_fitur:

            if self.__progress.idjawaban is None:
                self.__progress.set_jawaban(fitur.idjawaban)
            
            # Lanjutkan Progress Terakhir
            if self.__progress.idjawaban != fitur.idjawaban:

                ntf_rf = self.__calculate(idsoal, fitur.tf, fitur.term)

                fitur.ntf_rf = ntf_rf

                db.session.add(fitur)
                db.session.commit()
                # Lanjut
                self.__progress.clear_jawaban()