from flask import Response
from flask.views import MethodView
from ujian_app.models import Jawaban, PelaksanaanUjian, Siswa
from sqlalchemy.sql.expression import and_
from tempfile import NamedTemporaryFile
from openpyxl import load_workbook
from copy import deepcopy, copy

class DownloadPenilaianAPI(MethodView):
    
    def get_wb_penilaian_manual(self, idujian, idkelas):
        pel = PelaksanaanUjian.query.filter_by(idkelas=idkelas, idujian=idujian).first()

        workbook = load_workbook("template/penilaian_manual.xlsx")
        sheet = workbook.active

        ujian = pel.ujian

        sheet['C3'] = ujian.guru.namaGuru
        sheet['C4'] = pel.kelas.namaKelas
        sheet['C5'] = ujian.matapelajaran.namaMapel
        sheet['C6'] = ujian.idujian
        sheet['C7'] = ujian.namaUjian

        listsoal = ujian.listsoal

        border = sheet['C17'].border
        fill_abu = sheet['C17'].fill

        for index, soal in enumerate(listsoal):
            nsheet = workbook.copy_worksheet(sheet)
            nsheet.title = 'Soal %d' % (index+1)

            nsheet['C9'] = soal.idsoal
            nsheet['C10'] = soal.soalEsai
            nsheet['C11'] = soal.kompetensiDasar
            nsheet['C12'] = soal.materiPokok
            nsheet['C13'] = soal.skorMax
            nsheet['C14'] = soal.skorMin

            listjawaban = Jawaban.query.join(Siswa).filter(
                and_(Jawaban.idsoal == soal.idsoal, Siswa.idkelas == pel.idkelas)
            )

            for index, jawaban in enumerate(listjawaban):
                nindex = index + 17
                nsheet['A%d' % (nindex)] = index + 1
                nsheet['A%d' % (nindex)].border = copy(border)
                nsheet['A%d' % (nindex)].fill = copy(fill_abu)

                nsheet['B%d' % (nindex)] = jawaban.nis
                nsheet['B%d' % (nindex)].border = copy(border)
                nsheet['B%d' % (nindex)].fill = copy(fill_abu)

                nsheet['C%d' % (nindex)] = jawaban.jawabanEsai or ''
                nsheet['C%d' % (nindex)].border = copy(border)
                nsheet['C%d' % (nindex)].fill = copy(fill_abu)

                nsheet['D%d' % (nindex)] = jawaban.skorAngka or ''
                nsheet['D%d' % (nindex)].border = copy(border)
        
        workbook.remove(sheet)
        return workbook
        
    def get(self, idujian, idkelas):
        file_name = 'PMANUAL_IDUJIAN_%d_IDKLS_%d.xlsx' % (idujian, idkelas)
        workbook = self.get_wb_penilaian_manual(idujian, idkelas)
        with NamedTemporaryFile() as tmp:
            workbook.save(tmp)
            tmp.seek(0)
            return Response(
                tmp.read(), 
                mimetype="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                headers={'Content-Disposition':'attachment; filename="%s"' % (file_name)}
            )