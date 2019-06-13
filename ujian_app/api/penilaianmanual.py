from flask.views import MethodView
from ujian_app.repository import JawabanRepository
from ujian_app.utils import AlchemyEncoder
from ujian_app.tasks import penilaian_manual
import json

class PenilaianManualAPI(MethodView):

    def get(self, idujian, idkelas):
        repo = JawabanRepository()

        list_jawaban = repo.find_by_ujian_kelas(idujian, idkelas)
        return json.dumps({'list': list_jawaban}, cls=AlchemyEncoder), 200

    def post(self, idujian, idkelas):
        penilaian_manual.apply_async(args=[idujian, idkelas])
        return json.dumps({'status': 'OK'})