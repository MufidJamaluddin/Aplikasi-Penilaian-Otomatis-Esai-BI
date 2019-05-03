from flask.views import MethodView
from flask import json, request
from ujian_app.utils import AlchemyEncoder
from ujian_app.repository import MapelRepository

class MatapelajaranAPI(MethodView):
    
    def __init__(self):
        self.repository = MapelRepository()

    def get(self):
        list_matapelajaran = self.repository.findAll()
        dt_matapelajaran = json.dumps(list_matapelajaran, cls=AlchemyEncoder)
        return json.dumps({'list': dt_matapelajaran }), 200, {'Content-Type': 'application/json'}

    def post(self):
        data_matapelajaran = request.get_json()
        namaMapel = data_matapelajaran['namaMapel']
        KKM = data_matapelajaran['KKM']
        self.repository.save(namaMapel, KKM)

        list_matapelajaran = self.repository.findAll()
        dt_matapelajaran = json.dumps(list_matapelajaran, cls=AlchemyEncoder)
        return json.dumps({'list': dt_matapelajaran }), 201, {'Content-Type': 'application/json'}
    
    def put(self, idmapel):
        data_matapelajaran = request.get_json()
        namaMapel = data_matapelajaran['namaMapel']
        KKM = data_matapelajaran['KKM']
        self.repository.update(idmapel, namaMapel, KKM)

        list_matapelajaran = self.repository.findAll()
        dt_matapelajaran = json.dumps(list_matapelajaran, cls=AlchemyEncoder)
        return json.dumps({'list': dt_matapelajaran }), 200, {'Content-Type': 'application/json'}
    
    def delete(self, idmapel):
        self.repository.delete(idmapel)

        list_matapelajaran = self.repository.findAll()
        dt_matapelajaran = json.dumps(list_matapelajaran, cls=AlchemyEncoder)
        return json.dumps({'list': dt_matapelajaran }), 200, {'Content-Type': 'application/json'}
