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
        idsoal = data_jawaban['idsoal']
        nis = data_jawaban['nis']
        jawabanEsai = data_jawaban['jawabanEsai']

        jawaban = self.repository.findByKeys(idsoal=idsoal, nis=nis).first()
        
        if jawaban:
            self.repository.updateJawaban(jawaban.idjawaban, jawabanEsai)
        
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