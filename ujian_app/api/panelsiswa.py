from flask import session, request
from flask.views import MethodView
from ujian_app.repository import SiswaRepository
import json

class PanelSiswaAPI(MethodView):
    '''
    Mendapatkan data data siswa yang sedang login
    '''

    def get(self):
        '''
        Mendapatkan nama dan role
        '''
        cur_user = session.get('user')
        repo = SiswaRepository()
        siswa = repo.find_by_id(cur_user['username'])
        
        rsiswa = {
            'nis': siswa.nis,
            'idkelas': siswa.idkelas,
            'nama': siswa.nama,
            'kelas': {
                'namaKelas': siswa.kelas.namaKelas,
            }
        }

        return json.dumps({'data': rsiswa}), 200, {'Content-Type': 'application/json'}