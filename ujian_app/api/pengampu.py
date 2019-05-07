from flask.views import MethodView
from flask import json, request
from ujian_app.utils import AlchemyEncoder
from ujian_app.repository import PengampuRepository

class PengampuAPI(MethodView):
    
    def __init__(self):
        '''
        Inisialisasi Repository
        '''
        self.repository = PengampuRepository()

    def get(self, idguru):
        '''
        HTTP GET
        Ambil Semua Data Pengampu
        '''
        listpengampu = self.repository.getPengampuByIdGuru(idguru)
        tlistpengampu = []

        for pengampu in listpengampu:
            tpengampu = {}
            tpengampu['idmapel'] = pengampu.idmapel
            tpengampu['idkelas'] = pengampu.idkelas
            tpengampu['idguru'] = pengampu.idguru
            tpengampu['namaKelas'] = pengampu.kelas.namaKelas
            tpengampu['namaMapel'] = pengampu.matapelajaran.namaMapel
            tlistpengampu.append(tpengampu)
        
        return json.dumps({'list': tlistpengampu }), 200, {'Content-Type': 'application/json'}