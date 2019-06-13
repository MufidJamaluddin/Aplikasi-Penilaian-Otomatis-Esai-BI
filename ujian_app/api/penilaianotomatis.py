from flask.views import MethodView
from ujian_app.tasks import penilaian_otomatis
from ujian_app.repository import UjianRepository
import json

class PenilaianOtomatisAPI(MethodView):

    def post(self, idujian):
        penilaian_otomatis.apply_async(args=[idujian])
        return json.dumps({'status': 'OK', 'progress': 0})