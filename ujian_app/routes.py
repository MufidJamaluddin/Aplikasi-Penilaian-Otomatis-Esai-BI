from . import app
from .api import GuruAPI, PengampuAPI, SiswaAPI, SoalAPI, UjianEsaiAPI, MatapelajaranAPI 
from .api import AuthAPI, DaftarNilaiAPI, KelasAPI, MatapelajaranAPI, PengerjaanUjianAPI
from .api import PenilaianAPI, UjianEsaiAPI, PanelSiswaAPI

ROUTES_API = [

    {'url':'/api/auth', 'name':'auth', 'view':AuthAPI, 'methods':['GET','POST']},
    {'url':'/api/auth/<string:username>', 'name':'auth_logout', 'view':AuthAPI, 'methods':['DELETE']},
    {'url':'/api/panelsiswa', 'name':'panelsiswa', 'view':PanelSiswaAPI, 'methods':['GET']},

    {'url':'/api/daftarnilai', 'name':'daftarnilai', 'view':DaftarNilaiAPI, 'methods':['GET','POST','PUT']},
    
    {'url':'/api/kelas', 'name':'kelas', 'view':KelasAPI, 'methods':['GET','POST']},
    {'url':'/api/kelas/<int:idkelas>', 'name':'kelas_dt', 'view':KelasAPI, 'methods':['PUT','DELETE']},

    {'url':'/api/matapelajaran', 'name':'mapel', 'view':MatapelajaranAPI, 'methods':['GET','POST']},
    {'url':'/api/matapelajaran/<int:idmapel>', 'name':'matapelajaran_dt', 'view':MatapelajaranAPI, 'methods':['PUT','DELETE']},

    {'url':'/api/siswa', 'name':'siswa', 'view':SiswaAPI, 'methods':['GET','POST']},
    {'url':'/api/siswa/<int:nis>', 'name':'siswa_dt', 'view':SiswaAPI, 'methods':['PUT','DELETE']},

    {'url':'/api/soalujian/<int:idujian>', 'name':'soalujian', 'view':SoalAPI, 'methods':['GET']},
    {'url':'/api/soal/<int:idsoal>', 'name':'soal_dt', 'view':SoalAPI, 'methods':['PUT']},

    {'url':'/api/guru', 'name':'guru', 'view':GuruAPI, 'methods':['GET','POST']},
    {'url':'/api/guru/<int:idguru>', 'name':'guru_dt', 'view':GuruAPI, 'methods':['PUT','DELETE']},
    {'url':'/api/pengampu/<int:idguru>', 'name':'guru_pengampu', 'view':PengampuAPI, 'methods':['GET']},
    {'url':'/api/pengampu', 'name':'cur_pengampu', 'view':PengampuAPI, 'methods':['GET']},

    {'url':'/api/pengerjaanujian', 'name':'pengerjaanujian', 'view':PengerjaanUjianAPI, 'methods':['GET','POST','PUT']},
    {'url':'/api/penilaian', 'name':'penilaian', 'view':PenilaianAPI, 'methods':['GET','POST','PUT']},

    {'url':'/api/ujianesai', 'name':'ujianesai', 'view':UjianEsaiAPI, 'methods':['GET','POST']},
    {'url':'/api/ujianesai/<int:idujian>', 'name':'ujianesai_dt', 'view':UjianEsaiAPI, 'methods':['PUT','DELETE']}
]

for ROUTE in ROUTES_API:
    app.add_url_rule(ROUTE['url'], view_func=ROUTE['view'].as_view(ROUTE['name']), methods=ROUTE['methods'])

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def index(path):
    return app.send_static_file('index.html')