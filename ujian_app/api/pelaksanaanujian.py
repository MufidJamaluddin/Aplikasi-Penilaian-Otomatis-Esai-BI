from flask.views import MethodView
from flask import json, request
from ujian_app.repository import ( 
    UjianRepository, PelaksanaanUjianRepository,
    ProgressRepository
)
from datetime import timedelta

class PelaksanaanUjianAPI(MethodView):
    
    def get(self, idujian):
        '''
        Mendapatkan semua PelaksanaanUjian / berasarkan idujian
        '''
        repository = UjianRepository()
        pel_repo = PelaksanaanUjianRepository()
        prog_repo = ProgressRepository()

        ujian = repository.find_by_id(idujian)

        ujiand = {}
        pesan_progress, progress = prog_repo.get_progress(idujian)

        ujiand['idujian'] = ujian.idujian
        ujiand['jumlahSoal'] = ujian.jumlahSoal
        ujiand['namaUjian'] = ujian.namaUjian
        ujiand['namaMapel'] = ujian.matapelajaran.namaMapel
        ujiand['durasi'] = str(ujian.durasi)
        ujiand['status_ujian'] = ujian.status_ujian
        ujiand['progress_penilaian'] = progress
        ujiand['pesan_progress_penilaian'] = pesan_progress

        pelaksanaan_ujian = pel_repo.find_by_keys(
            idujian=ujian.idujian,
            flag='1'
        )

        listpel = []
        for p in pelaksanaan_ujian:
            pel = {}
            pel['idkelas'] = p.idkelas
            pel['idujian'] = p.idujian
            pel['namaKelas'] = p.kelas.namaKelas
            if(p.waktu_mulai):
                waktu_mulai = p.waktu_mulai.strftime('%d %B %Y, %H:%M') 
                waktu_selesai = p.waktu_mulai + timedelta(minutes=ujian.durasi)
                pel['waktu_mulai'] = waktu_mulai + ' s.d '+ waktu_selesai.strftime('%H:%M')
            pel['status_pelaksanaan'] = p.status_pelaksanaan
            pel['status_penilaian'] = p.status_penilaian
            listpel.append(pel)
        
        ujiand['pelaksanaan_ujian'] = listpel
        
        return json.dumps({'data':ujiand }), 201, {'Content-Type': 'application/json'}
        
    def post(self, idujian, idkelas):
        repository = PelaksanaanUjianRepository()
        repository.mulaiUjian(idujian, idkelas)

        return self.get(idujian)