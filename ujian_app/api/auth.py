from flask import session, request
from flask.views import MethodView
from ujian_app.repository import AkunRepository, SiswaRepository, PelaksanaanUjianRepository
from datetime import timedelta, datetime
import json

class AuthAPI(MethodView):

    def get(self):
        '''
        Mendapatkan nama dan role
        '''
        pel_repo = PelaksanaanUjianRepository()

        cur_user = session.get('user')
        
        user = {}

        if not cur_user:
            return json.dumps({'role':'', 'nama':'', 'username':''})

        user['role'] = cur_user['role']
        user['nama'] = cur_user['nama']
        user['username'] = cur_user['username']

        if cur_user['role'] == 'siswa':
            pelaksanaan = pel_repo.findPelaksanaanUjianByNim(cur_user['username'])
            if pelaksanaan:
                idujian = pelaksanaan.ujian.idujian
                if idujian:
                    user['pelaksanaanujian'] = idujian

        return json.dumps(user), 200

    def post(self):
        '''
        Melakukan aksi login
        '''
        repo = AkunRepository()
        pel_repo = PelaksanaanUjianRepository()
        
        if not request.is_json:
            return '', 400
        
        data_user = request.get_json()
        if not data_user['username'] and not data_user['password']:
            return '', 400

        user = repo.findById(data_user['username'])

        if user:
            if user.password == data_user['password']:
                dt = {
                    'nama': user.nama,
                    'role': user.role,
                    'username': user.username
                }
                session['user'] = dt

                if user.role == 'siswa':
                    pelaksanaan = pel_repo.findPelaksanaanUjianByNim(user.username)
                    if pelaksanaan:
                        idujian = pelaksanaan.ujian.idujian
                        if idujian:
                            dt['pelaksanaanujian'] = idujian

                return json.dumps(dt), 200

        dt = {'role':'', 'nama':'', 'username':'', 'pesan':'Username atau Password Salah!'}
        return json.dumps(dt), 200

    def delete(self, username):
        '''
        Melakukan aksi logout
        '''
        session.pop('user', None)
        return json.dumps({'role':'', 'nama':'', 'username':''}), 201