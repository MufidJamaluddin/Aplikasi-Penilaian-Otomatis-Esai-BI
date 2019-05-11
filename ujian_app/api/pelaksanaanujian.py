from flask.views import MethodView
from flask import json, request
from ujian_app.repository import UjianRepository, PelaksanaanUjianRepository

class PelaksanaanUjianAPI(MethodView):
    
    def get(self, idujian):
        '''
        Mendapatkan semua PelaksanaanUjian / berasarkan idujian
        '''
        repository = UjianRepository()
        ujian = repository.findById(idujian)

        ujiand = {}
        ujiand['idujian'] = ujian.idujian
        ujiand['jumlahSoal'] = ujian.jumlahSoal
        ujiand['namaUjian'] = ujian.namaUjian
        ujiand['namaMapel'] = ujian.matapelajaran.namaMapel
        ujiand['durasi'] = str(ujian.durasi)
        ujiand['status_ujian'] = ujian.status_ujian

        listpel = []
        for p in ujian.pelaksanaan_ujian:
            pel = {}
            pel['idkelas'] = p.idkelas
            pel['idujian'] = p.idujian
            pel['namaKelas'] = p.kelas.namaKelas
            if(p.waktu_mulai):
                waktu_mulai = p.waktu_mulai.strftime('%d %B %Y, %H:%M') 
                pel['waktu_mulai'] = waktu_mulai
            pel['status_pelaksanaan'] = p.status_pelaksanaan
            listpel.append(pel)
        
        ujiand['pelaksanaan_ujian'] = listpel
        
        return json.dumps({'data':ujiand }), 201, {'Content-Type': 'application/json'}
        
    def post(self, idujian, idkelas):
        repository = PelaksanaanUjianRepository()
        repository.mulaiUjian(idujian, idkelas)

        return self.get(idujian)