from flask.views import MethodView
from ujian_app.tasks import (
    penilaian_otomatis, penskoran_manual )
import json

class PenilaianAPI(MethodView):

    def post(self, tipe, idujian, idkelas=None):
        if tipe == 'manual' and idkelas is not None:
            penskoran_manual.apply_async(args=[idujian, idkelas])
        elif tipe == 'otomatis':
            penilaian_otomatis.apply_async(args=[idujian])

        return json.dumps({'status': 'OK'})