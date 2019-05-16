from flask.views import MethodView
from flask import json, request
from ujian_app.utils import AlchemyEncoder
from ujian_app.repository import DaftarNilaiRepository

class DaftarNilaiAPI(MethodView):
    
    def __init__(self):
        '''
        Inisialisasi Daftar Nilai Ujian
        '''
        self.repository = DaftarNilaiRepository()
    
    def get(self):
        '''
        Mendapatkan semua daftar nilai 
        '''
        list_nilai = self.repository.findAll()
        return json.dumps({'list': list_nilai }, cls=AlchemyEncoder), 200, {'Content-Type': 'application/json'}

   