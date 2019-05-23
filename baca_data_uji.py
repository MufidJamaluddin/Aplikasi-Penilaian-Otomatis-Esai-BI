from ujian_app.models import Jawaban, FiturReferensiPenilaian,db
import pyexcel

from ujian_app import make_app

app = make_app()

#
#   Baca Excel MIA-2
#

print('Baca Excel')

book = pyexcel.iget_book(file_name="data/XII-MIA-2.xlsx")

row_mulai_penilaian = 17
column_nis = 1
column_jawaban = 3
idsoal = None
namaKelas = None

print('Insert Data Uji ...')

with app.app_context():
    for sheet in book:
        i = 0

        for index, row in enumerate(sheet.array):
            if index == 3:
                namaKelas = row[3] if 3 < len(row) else None
            if index == 8:
                idsoal = row[3] if 3 < len(row) else None
                #print('\nID SOAL: %s' % idsoal)
            if index >= row_mulai_penilaian:
                i+=1
                nis = row[column_nis] if column_nis < len(row) else None
                jawabanEsai = row[column_jawaban] if column_jawaban < len(row) else None
                if (nis is None) or (jawabanEsai is None):
                    continue
            else:
                continue
            
            jawaban = Jawaban()
            jawaban.idsoal = idsoal
            jawaban.nis = nis
            jawaban.jawabanEsai = jawabanEsai
            jawaban.namaKelas = namaKelas

            db.session.add(jawaban)

            #print('Insert %d. NIS %s ...' % (i, nis))

        db.session.commit()