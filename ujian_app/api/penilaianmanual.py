from flask.views import MethodView
from ujian_app.repository import (
    JawabanRepository, 
    PelaksanaanUjianRepository
)
from ujian_app.utils import AlchemyEncoder
from ujian_app.tasks import penilaian_manual
from flask import json, request

class PenilaianManualAPI(MethodView):

    def get(self, idujian, idkelas, idsoal):
        repo = JawabanRepository()

        list_jawaban = repo.find_by_soal(idujian, idkelas, idsoal)
        return json.dumps({'list': list_jawaban}, cls=AlchemyEncoder), \
            200,  {'Content-Type': 'application/json'}
    
    def put(self):
        repo = JawabanRepository()
        data_nilai = request.get_json()

        repo.update(
            data_nilai.get('idjawaban'),
            skorAngka=data_nilai.get('skorAngka', None)
        )

        return json.jsonify(data_nilai), 201


    def post(self, idujian, idkelas):    
        repo = PelaksanaanUjianRepository()
        pel = repo.find_by_keys(
                idujian=idujian, 
                idkelas=idkelas,
              #  status_pelaksanaan='1',
              #  status_penilaian='0'
            ).first()
        if pel:
            penilaian_manual.apply_async(args=[idujian, idkelas])
            repo.mulai_pmanual(idujian, idkelas)
            return json.dumps({'status': 'OK'})

        return json.dumps({'status': 'NG', 'pesan': 'Telah dinilai sebelumnya!'})