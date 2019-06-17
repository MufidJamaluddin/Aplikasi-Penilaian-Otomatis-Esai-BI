from ujian_app.penilaian import PenilaianOtomatis
from ujian_app import make_app
from ujian_app.tasks import penilaian_otomatis
from ujian_app.models import Ujian
import json
import time

ID_UJIAN = 1

print('Mulai penilaian otomatis dg KNN ...')

app = make_app()

with app.app_context():
    potomatis = PenilaianOtomatis(ID_UJIAN)
    potomatis.nilai_otomatis()

#penilaian_otomatis.apply_async(args=[ID_UJIAN])