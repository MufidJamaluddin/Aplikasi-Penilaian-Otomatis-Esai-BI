from flask.views import MethodView
from flask import json, request
from ujian_app.utils import AlchemyEncoder
from ujian_app.repository import KelasRepository

class KelasAPI(MethodView):
    
    def __init__(self):
        self.repository = KelasRepository()

    def get(self):
        list_kelas = self.repository.findAll()
        dt_kelas = json.dumps(list_kelas, cls=AlchemyEncoder)
        return json.dumps({'list': dt_kelas }), 200, {'Content-Type': 'application/json'}

    def post(self):
        data_kelas = request.get_json()
        namaKelas = data_kelas['namaKelas']
        self.repository.save(namaKelas)

        list_kelas = self.repository.findAll()
        dt_kelas = json.dumps(list_kelas, cls=AlchemyEncoder)
        return json.dumps({'list': dt_kelas }), 201, {'Content-Type': 'application/json'}
    
    def put(self, idkelas):
        data_kelas = request.get_json()
        namaKelas = data_kelas['namaKelas']
        self.repository.update(idkelas, namaKelas)

        list_kelas = self.repository.findAll()
        dt_kelas = json.dumps(list_kelas, cls=AlchemyEncoder)
        return json.dumps({'list': dt_kelas }), 301, {'Content-Type': 'application/json'}
    
    def delete(self, idkelas):
        self.repository.delete(idkelas)

        list_kelas = self.repository.findAll()
        dt_kelas = json.dumps(list_kelas, cls=AlchemyEncoder)
        return json.dumps({'list': dt_kelas }), 301, {'Content-Type': 'application/json'}
