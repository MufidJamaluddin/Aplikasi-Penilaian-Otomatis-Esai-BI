from flask.views import MethodView
from flask import json, request
from ujian_app.utils import AlchemyEncoder
from ujian_app.repository import GuruRepository
from ujian_app.models import Pengampu

class GuruAPI(MethodView):
    
    def __init__(self):
        '''
        Inisialisasi Repository
        '''
        self.repository = GuruRepository()

    def get(self):
        '''
        HTTP GET
        Ambil Semua Data Guru
        '''
        list_guru = self.repository.findAll()
        return json.dumps({'list': list_guru }, cls=AlchemyEncoder), 200, {'Content-Type': 'application/json'}

    def post(self):
        '''
        HTTP POST 
        Data Guru untuk Buat Baru
        '''
        # Simpan Data yang di Post
        data_guru = request.get_json()
        listpengampu = data_guru['listpengampu']

        pengampus = []
        if listpengampu:
            for p in listpengampu:
                pengampu = Pengampu()
                pengampu.idkelas = p.idkelas
                pengampu.idmapel = p.idmapel
                pengampus.append(pengampu)

        self.repository.save(
            nip = data_guru['nip'],
            nuptk = data_guru['nuptk'],
            namaGuru = data_guru['namaGuru'],
            username = data_guru['username'],
            password = data_guru['password'],
            pengampus = pengampus
        )
        
        # Berikan semua data yg ada di db
        list_guru = self.repository.findAll()
        return json.dumps({'list': list_guru }, cls=AlchemyEncoder), 201, {'Content-Type': 'application/json'}
    
    def put(self, idguru):
        '''
        HTTP PUT 
        Mengedit Data Guru yg Ada
        '''
        # Simpan Data yang di Post
        data_guru = request.get_json()
        self.repository.save(
            nip = data_guru['nip'],
            nuptk = data_guru['nuptk'],
            namaGuru = data_guru['namaGuru'],
            username = data_guru['username'],
            password = data_guru['password']
        )

        # kirim semua data guru
        list_guru = self.repository.findAll()
        return json.dumps({'list': list_guru }), 200, {'Content-Type': 'application/json'}
    
    def delete(self, idguru):
        '''
        HTTP DELETE
        Hapus Data Guru
        '''
        self.repository.delete(idguru)

        list_guru = self.repository.findAll()
        return json.dumps({'list': list_guru }, cls=AlchemyEncoder), 200, {'Content-Type': 'application/json'}