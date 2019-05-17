from . import app
from .api import (
    GuruAPI, PengampuAPI, SiswaAPI, SoalAPI, UjianEsaiAPI, MatapelajaranAPI,
    AuthAPI, DaftarNilaiAPI, KelasAPI, MatapelajaranAPI, PengerjaanUjianAPI,
    PenilaianAPI, UjianEsaiAPI, PanelSiswaAPI, PelaksanaanUjianAPI, JawabanAPI
)

def define_api_routes():  
    '''
    Definisi Route API Aplikasi
    '''  
    routes_api = [
        {'url':'/api/auth', 'name':'auth', 'view':AuthAPI, 'methods':['GET','POST']},
        {'url':'/api/auth/<string:username>', 'name':'auth_logout', 'view':AuthAPI, 'methods':['DELETE']},
        {'url':'/api/panelsiswa', 'name':'panelsiswa', 'view':PanelSiswaAPI, 'methods':['GET']},

            
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

        {'url':'/api/pengerjaanujian', 'name':'pengerjaanujian', 'view':PengerjaanUjianAPI, 'methods':['GET']},
        {'url':'/api/penilaian', 'name':'penilaian', 'view':PenilaianAPI, 'methods':['GET','POST','PUT']},

        {'url':'/api/ujianesai/<int:idujian>', 'name':'ujianesai_dt', 'view':UjianEsaiAPI, 'methods':['PUT','DELETE']},
        {'url':'/api/ujianesai/<int:idujian>', 'name':'ujianesai_ket', 'view':UjianEsaiAPI, 'methods':['GET']},
        {'url':'/api/ujianesai', 'name':'ujianesai', 'view':UjianEsaiAPI, 'methods':['GET','POST']},

        {'url':'/api/jawaban/<int:idjawaban>', 'name':'ubahjawaban', 'view':JawabanAPI, 'methods':['PUT']},
        {'url':'/api/jawaban/<int:idsoal>', 'name':'jawabansiswa', 'view':JawabanAPI, 'methods':['GET']},
        {'url':'/api/jawaban', 'name':'jawaban', 'view':JawabanAPI, 'methods':['POST']},

        {'url':'/api/pelaksanaan/<int:idujian>/<int:idkelas>', 'name':'laksanakanujian', 'view':PelaksanaanUjianAPI, 'methods':['POST']},
        {'url':'/api/pelaksanaan/<int:idujian>', 'name':'pelaksanaanujian', 'view':PelaksanaanUjianAPI, 'methods':['GET']},

        {'url':'/penilaianmanual/<int:idujian>/<int:idkelas>', 'name':'penilaianmanual', 'view':PenilaianAPI, 'methods':['GET']},
        
        {'url':'/api/daftarnilai/<int:idujian>', 'name':'daftarnilaiujian', 'view':DaftarNilaiAPI, 'methods':['GET']},
    ]

    for route in routes_api:
        app.add_url_rule(route['url'], view_func=route['view'].as_view(route['name']), methods=route['methods'])

# Panggil Disini
define_api_routes()

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def index(path):
    '''
    Selain Route API, Handle oleh FrontEnd (ReactJS)
    '''
    return app.send_static_file('index.html')