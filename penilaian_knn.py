from ujian_app.penilaian import PenilaianOtomatis
from ujian_app import make_app

ID_UJIAN = 1

app = make_app()

with app.app_context():
    potomatis = PenilaianOtomatis(ID_UJIAN)
    potomatis.nilai_otomatis()