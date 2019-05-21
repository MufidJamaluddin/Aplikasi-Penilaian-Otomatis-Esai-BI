'''
from flask import Response
from flask.views import MethodView
from ujian_app.models import Guru
from sqlalchemy.sql.expression import and_
from tempfile import NamedTemporaryFile
from openpyxl import load_workbook
from copy import deepcopy, copy
from flask import Flask, request, jsonify
from flask_excel import excel

class ImportGuruAPI(MethodView):
    def get_wb_data_guru(self):
        workbook = load_workbook("template/Data_Siswa.xlsx")
        sheet = workbook.active

        workbook.remove(sheet)
        return workbook

    def get(self):
        file_name = 'Data_Guru.xlsx'
        workbook = self.get_wb_data_guru()
        with NamedTemporaryFile() as tmp:
            workbook.save(tmp)
            tmp.seek(0)
            return Response(
                tmp.read(),
                mimetype="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                headers={'Content-Disposition':'attachment; filename="%s"' % (file_name)}
            )
    
    def upload_file(self):
        if request.method == 'POST'
        return jsonify({'result': request.get_array(field_name='file')})
'''