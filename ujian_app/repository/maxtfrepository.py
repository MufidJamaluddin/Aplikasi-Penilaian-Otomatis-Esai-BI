from sqlalchemy import func
from ujian_app.models import ( 
    FiturReferensiPenilaian, Jawaban, db
)

class MaxTfRepository(object):
    '''
    Kelas untuk mendapatkan maksimal TF Repository
    '''

    def get_max_tf(self, idsoal, term):
        """
        Mendapatkan Nilai TF Maksimum atau Satu
        Jika Tidak Ada
        """
        pass