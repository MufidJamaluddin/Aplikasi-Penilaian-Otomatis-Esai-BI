from flask.views import MethodView
from flask import json, request
from ujian_app.utils import AlchemyEncoder
from ujian_app.repository import SiswaRepository

class SiswaAPI(MethodView):
    
    def __init__(self):
        self.repository = SiswaRepository()

    def get(self):
        list_siswa = self.repository.findAll()
        dt_siswa = json.dumps(list_siswa, cls=AlchemyEncoder)
        return json.dumps({'list': dt_siswa }), 200, {'Content-Type': 'application/json'}

    def post(self):
        data_siswa = request.get_json()
        nis = data_siswa['nis']
        idkelas = data_siswa['idkelas']
        nama = data_siswa['nama']
        password = data_siswa['password']
        self.repository.save(nis, idkelas, nama, password)

        list_siswa = self.repository.findAll()
        dt_siswa = json.dumps(list_siswa, cls=AlchemyEncoder)
        return json.dumps({'list': dt_siswa }), 201, {'Content-Type': 'application/json'}
    
    def put(self, nis):
        data_siswa = request.get_json()
        idkelas = data_siswa['idkelas']
        nama = data_siswa['nama']
        password = data_siswa['password']
        self.repository.update( idkelas, nama, password)

        list_siswa = self.repository.findAll()
        dt_siswa = json.dumps(list_siswa, cls=AlchemyEncoder)
        return json.dumps({'list': dt_siswa }), 301, {'Content-Type': 'application/json'}
    
    def delete(self, nis):
        self.repository.delete(nis)

        list_siswa = self.repository.findAll()
        dt_siswa = json.dumps(list_siswa, cls=AlchemyEncoder)
        return json.dumps({'list': dt_siswa }), 301, {'Content-Type': 'application/json'}
