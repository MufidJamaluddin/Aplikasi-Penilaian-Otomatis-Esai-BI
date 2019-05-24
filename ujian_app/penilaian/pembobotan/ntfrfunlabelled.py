from ujian_app.models import FiturObjekPenilaian, Jawaban,db
from sqlalchemy.sql.expression import and_
from math import log

class NtfRfUnlabeledWeighter(object):
    """
    Bertugas Melakukan Pembobotan Term NTF.RF
    Pada Dataset yang Tidak Berlabel (Fase Pengujian)
    """

    def __init__(self, docnum_repository, ntfrf_repository):
        self.docnum_repository = docnum_repository
        self.ntfrf_repository = ntfrf_repository
    

    def calculate_ntf(self, idsoal, tf:int, term:str):
        """
        Menghitung Normalized Term Frequency (ntf)
        
            NTF = TF / MAX_TF
        """
        max_tf = self.ntfrf_repository.get_max_tf(idsoal, term)
        
        if max_tf == 0:
            max_tf = 1

        ntf = tf / max_tf
        return ntf


    def calculate_rf(self, idsoal, term:str):
        """
        Max RF
        """
        rf = self.ntfrf_repository.get_max_rf(idsoal, term)

        return rf


    def calculate(self, idsoal, tf:int, term:str):
        """
        Menghitung Normalized Term Frequency - Relevance Frequency (ntf.rf)
        Return : ntf_rf

            NTFRF = NTF x RF

        """
        ntf = self.calculate_ntf(idsoal, tf, term)
        rf = self.calculate_rf(idsoal, term)

        ntf_rf = ntf * rf

        return ntf_rf
    
    
    def calculate_and_save(self, idsoal):
        list_fitur = FiturObjekPenilaian.query.join(Jawaban).filter(
            Jawaban.idsoal == idsoal
        )

        for fitur in list_fitur:
            ntf_rf = self.calculate(idsoal, fitur.tf, fitur.term)

            fitur.ntf_rf = ntf_rf

            db.session.add(fitur)
            db.session.commit()