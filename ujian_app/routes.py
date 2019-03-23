from . import app
from .api import AkunGuruAPI, AkunSiswaAPI, AuthAPI, DaftarNilaiAPI, KelasAPI, MatapelajaranAPI, PengerjaanUjianAPI, PenilaianAPI, UjianEsaiAPI

ROUTES_API = [
    {'url':'/api/akunguru', 'name':'akunguru', 'view':AkunGuruAPI, 'methods':['GET','POST','PUT']},
    {'url':'/api/akunsiswa', 'name':'akunsiswa', 'view':AkunSiswaAPI, 'methods':['GET','POST','PUT']},
    {'url':'/api/auth', 'name':'auth', 'view':AuthAPI, 'methods':['GET','POST','PUT']},
    {'url':'/api/daftarnilai', 'name':'daftarnilai', 'view':DaftarNilaiAPI, 'methods':['GET','POST','PUT']},
    {'url':'/api/kelas', 'name':'kelas', 'view':KelasAPI, 'methods':['GET','POST','PUT']},
    {'url':'/api/matapelajaran', 'name':'matapelajaran', 'view':MatapelajaranAPI, 'methods':['GET','POST','PUT']},
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