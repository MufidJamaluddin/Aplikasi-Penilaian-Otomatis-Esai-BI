from flask.views import MethodView
from flask import json, request, session
from ujian_app.utils import AlchemyEncoder
from ujian_app.repository import JawabanRepository, KelasRepository


class JawabanAPI(MethodView):
    
    def __init__(self):
        '''
        Inisialisasi Jawaban
        '''
        self.repository = JawabanRepository()


    def get(self, idsoal):
        cur_user = session.get('user')
        nis = cur_user['username']

        jawaban = self.repository.find_by_keys(idsoal=idsoal, nis=nis).first()  

        if jawaban:
            dtjawaban = {
                'idjawaban': jawaban.idjawaban,
                'idsoal': jawaban.idsoal,
                'nis': jawaban.nis,
                'jawabanEsai': jawaban.jawabanEsai
            }

            return json.jsonify({'data': dtjawaban})
        else:
            return json.jsonify({'data': ''})


    def post(self):
        '''
        Menyimpan data jawaban
        '''
        data_jawaban = request.get_json()
        cur_user = session.get('user')

        idsoal = data_jawaban['idsoal']
        nis = cur_user['username']
        jawabanEsai = data_jawaban.get('jawabanEsai', '')

        if not jawabanEsai.strip():
            return json.dumps({'idjawaban': ''}), 200, {'Content-Type': 'application/json'}    

        jawaban = self.repository.find_by_keys(idsoal=idsoal, nis=nis).first()
        
        if jawaban:
            self.repository.updateJawaban(jawaban.idjawaban, jawabanEsai)
        else:
            jawaban = self.repository.save(
                idsoal = idsoal,
                nis = nis,
                jawabanEsai = jawabanEsai,
            )

            jawaban.namaKelas = jawaban.siswa.kelas.namaKelas
            self.repository.commit()

        return json.dumps({'idjawaban': jawaban.idjawaban}), 200, {'Content-Type': 'application/json'}


    def put(self, idjawaban):
        '''
        Menyimpan data jawaban
        '''
        data_jawaban = request.get_json()
        
        self.repository.updateJawaban(idjawaban, data_jawaban['jawabanEsai'])

        return json.dumps({'idjawaban': idjawaban}), 200, {'Content-Type': 'application/json'}