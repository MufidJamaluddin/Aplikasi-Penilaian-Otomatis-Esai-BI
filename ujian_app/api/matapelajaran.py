from flask.views import MethodView
from flask import json, request
from ujian_app.utils import AlchemyEncoder
from ujian_app.repository import MapelRepository

class MatapelajaranAPI(MethodView):
    
    def __init__(self):
        '''
        Inisialisasi Mapel
        '''
        self.repository = MapelRepository()

    def get(self):
        '''
        Mendapatkan semua mapel / berdasarkan page
        '''
        list_matapelajaran = self.repository.findAll()
        return json.dumps({'list': list_matapelajaran }, cls=AlchemyEncoder), 200, {'Content-Type': 'application/json'}

    def post(self):
        '''
        Menyimpan data mapel
        '''
        data_matapelajaran = request.get_json()
        namaMapel = data_matapelajaran['namaMapel']
        kkm = data_matapelajaran['KKM']

        if namaMapel is not None and kkm is not None:
            self.repository.save(namaMapel=namaMapel, KKM=kkm)

            list_matapelajaran = self.repository.findAll()
            return json.dumps({'list': list_matapelajaran }, cls=AlchemyEncoder), 201, {'Content-Type': 'application/json'}
   
    def put(self, idmapel):
        '''
        Menyimpan data mapel
        '''
        data_matapelajaran = request.get_json()
        namaMapel = data_matapelajaran['namaMapel']
        kkm = data_matapelajaran['KKM']
        self.repository.update(idmapel, namaMapel=namaMapel, KKM=kkm)

        list_matapelajaran = self.repository.findAll()
        return json.dumps({'list': list_matapelajaran }, cls=AlchemyEncoder), 200, {'Content-Type': 'application/json'}
    
    def delete(self, idmapel):
        '''
        Menghapus Data mapel
        '''
        self.repository.delete(idmapel)

        list_matapelajaran = self.repository.findAll()
        return json.dumps({'list': list_matapelajaran }, cls=AlchemyEncoder), 200, {'Content-Type': 'application/json'}