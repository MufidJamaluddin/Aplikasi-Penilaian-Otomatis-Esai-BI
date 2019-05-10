from flask.views import MethodView
from flask import json, request
from ujian_app.utils import AlchemyEncoder
from ujian_app.repository import SoalRepository

class SoalAPI(MethodView):
    
    def __init__(self):
        '''
        Inisialisasi Soal
        '''
        self.repository = SoalRepository()

    def get(self, idujian):
        '''
        Mendapatkan Soal / berasarkan idujian
        '''
        list_soal = self.repository.findByIdUjian(idujian)
        return json.dumps({'list': list_soal }, cls=AlchemyEncoder), 200, {'Content-Type': 'application/json'}

    def put(self, idsoal):
        '''
        Menyimpan data Soal
        '''
        data_soal = request.get_json()
        soalEsai = data_soal['soalEsai']
        skorMin = data_soal['skorMin']
        skorMax = data_soal['skorMax']
        kompetensiDasar = data_soal['kompetensiDasar']
        materiPokok = data_soal['materiPokok']

        if soalEsai is not None and skorMax is not None:
            self.repository.update(
                idsoal,
                soalEsai=soalEsai,
                skorMin=skorMin,
                skorMax=skorMax,
                kompetensiDasar=kompetensiDasar,
                materiPokok=materiPokok
            )

        return json.dumps({'data': data_soal }), 200, {'Content-Type': 'application/json'}