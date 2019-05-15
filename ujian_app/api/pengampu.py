from flask.views import MethodView
from flask import json, request, session
from ujian_app.utils import AlchemyEncoder
from ujian_app.repository import PengampuRepository, GuruRepository

class PengampuAPI(MethodView):
    
    def __init__(self):
        '''
        Inisialisasi Repository
        '''
        self.repository = PengampuRepository()

    def get(self, idguru = None):
        '''
        HTTP GET
        Ambil Semua Data Pengampu
        '''
        if idguru:
            listpengampu = self.repository.getPengampuByIdGuru(idguru)
        else:
            cur_data = session.get('user')
            if cur_data is None:
                return 'Tidak Ditemukan', 404
            listpengampu = self.repository.getPengampuByUsername(cur_data['username'])
    
        tlistpengampu = []

        for pengampu in listpengampu:
            tpengampu = {}
            tpengampu['idpengampu'] = pengampu.idpengampu
            tpengampu['idmapel'] = pengampu.idmapel
            tpengampu['idkelas'] = pengampu.idkelas
            tpengampu['idguru'] = pengampu.idguru
            tpengampu['namaKelas'] = pengampu.kelas.namaKelas
            tpengampu['namaMapel'] = pengampu.matapelajaran.namaMapel
            tlistpengampu.append(tpengampu)
        
        return json.dumps({'list': tlistpengampu }), 200, {'Content-Type': 'application/json'}