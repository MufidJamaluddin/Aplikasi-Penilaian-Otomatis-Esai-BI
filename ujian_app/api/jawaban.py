from flask.views import MethodView
from flask import json, request
from ujian_app.utils import AlchemyEncoder
from ujian_app.repository import JawabanRepository

class JawabanAPI(MethodView):
    
    def __init__(self):
        '''
        Inisialisasi Jawaban
        '''
        self.repository = JawabanRepository()

    def post(self):
        '''
        Menyimpan data jawaban
        '''
        data_jawaban = request.get_json()
        idsoal = data_ujian['idsoal']
        nis = data_ujian['nis']
        jawabanEsai = data_ujian['jawabanEsai']
        
        jawaban = self.repository.save(
            idsoal = idsoal,
            nis = nis,
            jawabanEsai = jawabanEsai
        )

        return json.dumps({'idjawaban': jawaban.idjawaban}), 200, {'Content-Type': 'application/json'}


    def put(self, idjawaban):
        '''
        Menyimpan data jawaban
        '''
        data_jawaban = request.get_json()
        
        self.repository.updateJawaban(idjawaban, data_jawaban['jawabanEsai'])

        return json.dumps({'idjawaban': idjawaban}), 200, {'Content-Type': 'application/json'}