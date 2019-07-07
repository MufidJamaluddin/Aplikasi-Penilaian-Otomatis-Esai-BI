from ujian_app.models import Jawaban, FiturReferensiPenilaian,db
from ujian_app.penilaian.konversiskor import KonversiFactory

import pyexcel

from ujian_app import make_app

app = make_app()

#
#   Baca Excel MIA-2
#

list_data_uji = [
    {'nama':'X-IIS-3', 'idkelas': '20'}
    
]

for nkelas in list_data_uji:
    
    print('Baca Excel %s' % (nkelas['nama']))
    book = pyexcel.iget_book(file_name="data/%s.xlsx" % (nkelas['nama']))

    row_mulai_penilaian = 16
    column_nis = 1
    column_jawaban = 3
    column_skor = 4
    
    idsoal = None
    namaKelas = None

    print('Insert Data Uji %s ...' % (nkelas['nama']))

    with app.app_context():

        konverter_factory = KonversiFactory()

        for sheet in book:
            i = 0
            konverter = None

            for index, row in enumerate(sheet.array):

                if index == 3:
                    namaKelas = row[3] if 3 < len(row) else None
                if index == 8:
                    idsoal = row[3] if 3 < len(row) else None
                    #print('\nID SOAL: %s' % idsoal)
                if index >= row_mulai_penilaian:
                    nis = row[column_nis] if column_nis < len(row) else None
                    jawabanEsai = row[column_jawaban] if column_jawaban < len(row) else None
                    skor = row[column_skor] if column_skor < len(row) else None
                    if (nis is None) or (jawabanEsai is None):
                        continue
                else:
                    continue
                
                if konverter is None:
                    konverter = konverter_factory.create(idsoal)

                jawaban = Jawaban()
                jawaban.idsoal = idsoal
                jawaban.nis = nis
                jawaban.jawabanEsai = jawabanEsai
                jawaban.namaKelas = namaKelas

                if skor is not None:
                    jawaban.skorAngkaS = skor
                    jawaban.skorHurufS = konverter.konversi(int(skor))

                db.session.add(jawaban)

                i += 1

                #print('Insert %d. NIS %s ...' % (i, nis))

            db.session.commit()
        
            print('Insert %d Jawaban pada Soal %d : %s ...\n' % (i, idsoal, namaKelas))