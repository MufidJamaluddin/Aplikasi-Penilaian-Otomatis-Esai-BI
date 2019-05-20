from flask import Response
from flask.views import MethodView
from ujian_app.models import Guru
from sqlalchemy.sql.expression import and_
from tempfile import NamedTemporaryFile
from openpyxl import load_workbook
from copy import deepcopy, copy
from flask import Flask, request, jsonify
from flask.ext import excel

class ImportGuruAPI(MethodView):
    def downloadGuru(self):
        workbook = load_workbook("template/dataGuru.xlsx")
        sheet = workbook.active

        sheet[A1]= Nama Guru
        sheet[B1]= NIP
        sheet[C1]= NUPTK
        sheet[D1]= Username
        sheet[E1]= Password

workbook.remove(sheet)
        return workbook

#masih coba

    def uploadGuru(self):
        if request.method == 'POST'
            return jsonify ({"result": request.get_array(field_name='file')})
            return '''
    <!doctype html>
    <title>Upload an excel file</title>
    <h1>Excel file upload (csv, tsv, csvz, tsvz only)</h1>
    <form action="" method=post enctype=multipart/form-data><p>
    <input type=file name=file><input type=submit value=Upload>
    </form>
    '''