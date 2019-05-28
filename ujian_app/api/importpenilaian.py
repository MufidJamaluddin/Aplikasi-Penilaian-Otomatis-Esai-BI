from flask import request
from flask.views import MethodView
from ujian_app.models import Jawaban, db
from ujian_app.tasks import penskoran_manual

class ImportPenilaianAPI(MethodView):
    '''
    Kelas untuk import penilaian manual
    '''

    def save_workbook_skor(self, book):
        '''
        Menyimpann workbook skor jawaban esai
        '''
        row_mulai_penilaian = 17
        column_nis = 1
        column_jawaban = 3
        column_skor = 4
        namaKelas = None
        idsoal = None

        for sheet in book:

            for index, row in enumerate(sheet.array):
                if index == 3:
                    namaKelas = row[3] if 3 < len(row) else None
                if index == 8:
                    idsoal = row[3] if 3 < len(row) else None
                if index >= row_mulai_penilaian:
                    nis = row[column_nis] if column_nis < len(row) else None
                    jawabanEsai = str(row[column_jawaban]) if column_jawaban < len(row) else None
                    skor = row[column_skor] if column_skor < len(row) else None
                    if (nis is None) or (skor is None) or (jawabanEsai is None):
                        continue
                    if (nis != '') or (skor != '') or (not jawabanEsai.strip()):
                        continue
                else:
                    continue
                
                jawaban = Jawaban()
                jawaban.idsoal = idsoal
                jawaban.nis = nis
                jawaban.jawabanEsai = jawabanEsai
                jawaban.skorAngka = skor
                jawaban.namaKelas = namaKelas

                db.session.add(jawaban)
                
            db.session.commit()


    def post(self, idujian, idkelas):
        '''
        Upload File / Import
        '''
        workbook = request.get_book(field_name='file')
        self.save_workbook_skor(workbook)

        # Background Task Celery
        penskoran_manual.apply_async(args=[idujian, idkelas])

        return '', 204