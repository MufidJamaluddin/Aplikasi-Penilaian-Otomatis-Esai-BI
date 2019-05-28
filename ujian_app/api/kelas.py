from flask.views import MethodView
from flask import json, request
from ujian_app.utils import AlchemyEncoder
from ujian_app.repository import KelasRepository

class KelasAPI(MethodView):
    
    def __init__(self):
        '''
        Inisialisasi Kelas
        '''
        self.repository = KelasRepository()

    def get(self):
        '''
        Mendapatkan semua kelas / berasarkan page
        '''
        list_kelas = self.repository.findAll()
        return json.dumps({'list': list_kelas }, cls=AlchemyEncoder), 200, {'Content-Type': 'application/json'}

    def post(self):
        '''
        Menyimpan data kelas
        '''
        data_kelas = request.get_json()
        namaKelas = data_kelas['namaKelas']

        if namaKelas is not None:
            self.repository.save(namaKelas=namaKelas)

            list_kelas = self.repository.findAll()
            return json.dumps({'list': list_kelas }, cls=AlchemyEncoder), 201, {'Content-Type': 'application/json'}
   
    def put(self, idkelas):
        '''
        Mengedit data kelas
        '''
        data_kelas = request.get_json()
        namaKelas = data_kelas['namaKelas']
        self.repository.update(idkelas, namaKelas=namaKelas)

        list_kelas = self.repository.findAll()
        return json.dumps({'list': list_kelas }, cls=AlchemyEncoder), 200, {'Content-Type': 'application/json'}
    
    def delete(self, idkelas):
        '''
        Menghapus Data Kelas
        '''
        self.repository.delete(idkelas)

        list_kelas = self.repository.findAll()
        return json.dumps({'list': list_kelas }, cls=AlchemyEncoder), 200, {'Content-Type': 'application/json'}