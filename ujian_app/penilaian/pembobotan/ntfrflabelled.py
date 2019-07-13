from ujian_app.models import FiturReferensiPenilaian, Jawaban,db
from sqlalchemy.sql.expression import and_
from math import log

class NtfRfLabeledWeighter(object):
    """
    Bertugas Melakukan Pembobotan Term
    Data Berlabel (Training)
    """

    def __init__(self, docnum_repository, ntfrf_repository):
        self.__docnum_repository = docnum_repository
        self.__ntfrf_repository = ntfrf_repository

    def __calculate_ntf(self, idsoal, tf:int, term:str):
        """
        Menghitung Normalized Term Frequency (ntf)
        
            NTF = TF / MAX_TF
        """
        max_tf = self.__ntfrf_repository.get_max_tf(idsoal, term)
        
        #if max_tf == 0: Tidak Mungkin MAX_TF 0 Jika ada TF
        #    max_tf = 1

        ntf = tf / max(1, max_tf)
        return ntf

    def __calculate_rf(self, idsoal, tf:int, term:str, skor_huruf:str):
        """
        Menghitung Relevance Frequency (rf)

            RF = log10 ( 2 + ( pos / max(1, neg) ) 
        """
        pos = self.__docnum_repository.\
                get_doc_num_pos_class(idsoal, term, skor_huruf)
        neg = self.__docnum_repository.\
                get_doc_num_neg_class(idsoal, term, skor_huruf)
        
        rf = log(2 + (pos / max(1, neg)), 10)

        return rf

    def __calculate(self, idsoal, tf:int, term:str, skor_huruf:str):
        """
        Menghitung Normalized Term Frequency - Relevance Frequency 
        (ntf.rf)
        Return : rf, ntf_rf

            NTFRF = NTF x RF

        """
        ntf = self.__calculate_ntf(idsoal, tf, term)
        rf = self.__calculate_rf(idsoal, tf, term, skor_huruf)

        ntf_rf = ntf * rf

        return rf, ntf_rf
    
    
    def calculate_and_save(self, idsoal):
        list_fitur = FiturReferensiPenilaian.query.join(Jawaban).filter(
#            and_(
                Jawaban.idsoal == idsoal,
#              Jawaban.kode_proses == '1'
#            )
        )

        last_idjawaban = None
        for fitur in list_fitur:
                
            rf, ntf_rf = self.__calculate(idsoal, fitur.tf,\
                fitur.term, fitur.skorHuruf)

            fitur.rf = rf
            fitur.ntf_rf = ntf_rf
            
            db.session.add(fitur)

            jawaban = fitur.jawaban
            if last_idjawaban != jawaban.idjawaban:
                jawaban.kode_proses = '2'
                last_idjawaban = jawaban.idjawaban
                db.session.add(jawaban)       
            
            db.session.commit()