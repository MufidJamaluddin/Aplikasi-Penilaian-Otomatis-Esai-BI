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
        list_guru = self.repository.find_all()
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
                pengampu.idkelas = p['idkelas']
                pengampu.idmapel = p['idmapel']
                pengampus.append(pengampu)

        self.repository.save(
            nip = data_guru['nip'],
            nuptk = data_guru['nuptk'],
            namaGuru = data_guru['namaGuru'],
            username = data_guru['username'],
            password = data_guru['password'],
            listpengampu = pengampus
        )
        
        # Berikan semua data yg ada di db
        list_guru = self.repository.find_all()
        return json.dumps({'list': list_guru }, cls=AlchemyEncoder), 201, {'Content-Type': 'application/json'}
    
    def put(self, idguru):
        '''
        HTTP PUT 
        Mengedit Data Guru yg Ada
        '''
        # Simpan Data yang di Post
        data_guru = request.get_json()

        listpengampu = data_guru['listpengampu']

        pengampus = []
        if listpengampu:
            for p in listpengampu:
                pengampu = Pengampu()
                if p.get('idpengampu', None):
                    pengampu.idpengampu = p['idpengampu']
                pengampu.idkelas = p['idkelas']
                pengampu.idmapel = p['idmapel']
                pengampus.append(pengampu)
        
        guru = self.repository.find_by_id(idguru)

        if(data_guru['nip']):
            guru.nip = data_guru['nip']
        
        if(data_guru['nuptk']):
            guru.nuptk = data_guru['nuptk']
        
        if(data_guru['namaGuru']):
            guru.namaGuru = data_guru['namaGuru']

        guru.listpengampu = pengampus

        self.repository.saveGuru(guru)

        # kirim semua data guru
        list_guru = self.repository.find_all()
        return json.dumps({'list': list_guru }, cls=AlchemyEncoder), 200, {'Content-Type': 'application/json'}
    
    def delete(self, idguru):
        '''
        HTTP DELETE
        Hapus Data Guru
        '''
        self.repository.deleteGuru(idguru)

        list_guru = self.repository.find_all()
        return json.dumps({'list': list_guru }, cls=AlchemyEncoder), 200, {'Content-Type': 'application/json'}

