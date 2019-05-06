from . import app
from .api import GuruAPI, SiswaAPI, MatapelajaranAPI, AuthAPI, DaftarNilaiAPI, KelasAPI, MatapelajaranAPI, PengerjaanUjianAPI, PenilaianAPI, UjianEsaiAPI, PanelSiswaAPI

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

    {'url':'/api/guru', 'name':'guru', 'view':GuruAPI, 'methods':['GET','POST']},
    {'url':'/api/guru/<int:idguru>', 'name':'guru_dt', 'view':GuruAPI, 'methods':['PUT','DELETE']},

    {'url':'/api/pengerjaanujian', 'name':'pengerjaanujian', 'view':PengerjaanUjianAPI, 'methods':['GET','POST','PUT']},
    {'url':'/api/penilaian', 'name':'penilaian', 'view':PenilaianAPI, 'methods':['GET','POST','PUT']},
    {'url':'/api/ujianesai', 'name':'ujianesai', 'view':UjianEsaiAPI, 'methods':['GET','POST','PUT']}
]

for ROUTE in ROUTES_API:
    app.add_url_rule(ROUTE['url'], view_func=ROUTE['view'].as_view(ROUTE['name']), methods=ROUTE['methods'])

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def index(path):
    return app.send_static_file('index.html')