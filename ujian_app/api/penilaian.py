from flask import Response
from flask.views import MethodView
from ujian_app.models import Jawaban, Pelaksanaanujian
from tempfile import NamedTemporaryFile
from openpyxl import load_workbook
from copy import deepcopy

class PenilaianAPI(MethodView):
    
    def get_wb_penilaian_manual(self, idujian, idkelas):
        pel = Pelaksanaanujian.query.filter_by(idkelas=idkelas, idujian=idujian).first()

        workbook = load_workbook("template/penilaian_manual.xlsx")
        sheet = workbook.active

        ujian = pel.ujian

        sheet['C3'] = ujian.guru.namaGuru
        sheet['C4'] = ujian.kelas.namaKelas
        sheet['C5'] = ujian.matapelajaran.namaMapel
        sheet['C6'] = ujian.idujian
        sheet['C7'] = ujian.namaUjian

        listsoal = ujian.listsoal

        border = sheet['C17'].border
        fill_abu = sheet['C17'].fill

        for index, soal in enumerate(listsoal):
            nsheet = workbook.copy_worksheet(sheet)
            nsheet.title = 'Soal %d' % (index)

            nsheet['C9'] = soal.idsoal
            nsheet['C10'] = soal.soalEsai
            nsheet['C11'] = soal.kompetensiDasar
            nsheet['C12'] = soal.materiPokok
            nsheet['C13'] = soal.skorMax
            nsheet['C14'] = soal.skorMin

            listjawaban = Jawaban.query.filter_by(
                Jawaban.soal == soal.idsoal, Jawaban.siswa.idkelas == idkelas
            )

            for index, jawaban in enumerate(listjawaban):
                nindex = index + 17
                nsheet['A%d' % (nindex)] = index + 1
                nsheet['A%d' % (nindex)].border = border
                nsheet['A%d' % (nindex)].fill = fill_abu

                nsheet['B%d' % (nindex)] = jawaban.nis
                nsheet['B%d' % (nindex)].border = border
                nsheet['B%d' % (nindex)].fill = fill_abu

                nsheet['C%d' % (nindex)] = jawaban.jawabanEsai or ''
                nsheet['C%d' % (nindex)].border = border
                nsheet['C%d' % (nindex)].fill = fill_abu

                nsheet['D%d' % (nindex)] = jawaban.skorAngka or ''
                nsheet['D%d' % (nindex)].border = border
        
        workbook.remove(sheet)
        return workbook
        
    def get(self, idujian, idkelas):
        file_name = 'PMANUAL_IDUJIAN_%d_IDKLS_%d' % (idujian, idkelas)
        def stream():
            workbook = self.get_wb_penilaian_manual(idujian, idkelas)
            with NamedTemporaryFile() as tmp:
                workbook.save(tmp)
                tmp.seek(0)
                yield tmp.read()
        return Response(
            stream(), 
            mimetype="application/vnd.openxmlformats-officedocuments.spreadsheetml.sheet",
            headers={'Content-Disposition':'attachment; filename="%s"' % (file_name)}
        )