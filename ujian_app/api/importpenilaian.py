from flask import request
from ujian_app.models import Jawaban
from ujian_app.tasks import penilaian_manual

class ImportPenilaianAPI:
    '''
    Kelas untuk import penilaian manual
    '''

    def post(self, idsoal, idkelas):
        book = request.get_book(field_name='file')

        row_mulai_penilaian = 17
        column_nis = 1
        column_skor = 3

        for sheet in book:
            i = 0

            for index, value in enumerate(sheet.array[row_mulai_penilaian-1:]):
                i += 1
                nis = value[column_nis] if column_nis < len(value) else None
                skor = value[column_skor] if column_skor < len(value) else None
                if nis is None and skor is None:
                    continue
                jawaban = Jawaban.query.filter_by(nis=nis, skor=None).first()
                jawaban.skor = skor
                Jawaban.session.add(jawaban)

        Jawaban.session.commit()
        penilaian_manual.apply_async(idsoal, idkelas)