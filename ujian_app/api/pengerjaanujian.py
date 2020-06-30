from flask.views import MethodView
from flask import json, request, session
from ujian_app.utils import AlchemyEncoder
from ujian_app.repository import PelaksanaanUjianRepository
from ujian_app.models import PelaksanaanUjian, Soal

class PengerjaanUjianAPI(MethodView):
    '''
    Kelas untuk menyediakan data tentang ujian
    selama pengerjaan ujian berlangsung
    '''

    def __init__(self):
        '''
        Inisialisasi Ujian
        '''
        self.repository = PelaksanaanUjianRepository()

    def __del__(self):
        del self.repository

    def get(self):
        '''
        Mendapatkan semua Ujian / berasarkan page
        '''
        cur_user = session.get('user')

        if cur_user['role'] != 'siswa':
            return 'Forbidden', 403

        pelaksanaan = self.repository.findPelaksanaanUjianByNim(cur_user['username'])

        if not pelaksanaan:
            return 'Ujian Ditutup', 400
        
        dtpel = {}
        dtpel['idkelas'] = pelaksanaan.idkelas
        dtpel['waktu_mulai'] = str(pelaksanaan.waktu_mulai)

        ujian = pelaksanaan.ujian

        dtujian = {}
        dtujian['idujian'] = ujian.idujian
        dtujian['namaUjian'] = ujian.namaUjian
        dtujian['namaMapel'] = ujian.matapelajaran.namaMapel
        dtujian['durasi'] = ujian.durasi

        listsoal = []
        for soal in ujian.listsoal:
            dtsoal = {}
            dtsoal['idsoal'] = soal.idsoal
            dtsoal['idujian'] = soal.idujian
            dtsoal['soalEsai'] = soal.soalEsai
            dtsoal['skorMin'] = soal.skorMin
            dtsoal['skorMax'] = soal.skorMax
            listsoal.append(dtsoal)

        return json.dumps({'data_ujian':dtujian, 'data_pelaksanaan':dtpel,'list_soal':listsoal }), 200, {'Content-Type': 'application/json'}