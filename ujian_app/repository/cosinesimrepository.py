from ujian_app.models import (
    Similarity, db
)

class CosineSimRepository(object):

    def get_cosine_similarity(self, k, idjawaban_uji):
        '''
        Mendapatkan list cosine similarity
        antara jawaban data uji (jawaban yang akan 
        diberikan skor secara otomatis) terhadap
        jawaban data latih (jawaban yang dinilai manual
        oleh guru sebagai ref klasifikasi)

        Parameter:
            idjawaban_uji: idjawaban data uji
        '''
        list_sim = db.session.query(
            Similarity.skorAngka, 
            Similarity.skorHuruf
        ).filter_by(
            idjawaban_uji=idjawaban_uji
        ).limit(k)
        return list_sim