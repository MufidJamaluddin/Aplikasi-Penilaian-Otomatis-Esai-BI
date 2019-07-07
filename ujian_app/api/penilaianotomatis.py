from flask.views import MethodView
from ujian_app.tasks import penilaian_otomatis
from ujian_app.repository import UjianRepository
import json

class PenilaianOtomatisAPI(MethodView):

    def post(self, idujian):
        repo = UjianRepository()
        penilaian_otomatis.apply_async(args=[idujian])
        repo.update(idujian, {
            'status_ujian': 3,
            'progress_penilaian': 0, 
            'pesan_progress_penilaian': 'Menunggu Antrian Tugas'
        })
        return json.dumps({'status': 'OK', 'progress': 0})