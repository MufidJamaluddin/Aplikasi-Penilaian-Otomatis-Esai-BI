from flask import current_app
from .api import (
    GuruAPI, PengampuAPI, SiswaAPI, SoalAPI, UjianEsaiAPI, MatapelajaranAPI,
    AuthAPI, DaftarNilaiAPI, KelasAPI, MatapelajaranAPI, PengerjaanUjianAPI,
    UjianEsaiAPI, PanelSiswaAPI, PelaksanaanUjianAPI, JawabanAPI, 
    PenilaianManualAPI, PenilaianOtomatisAPI, DownloadDaftarNilaiAPI,NilaiUjianAPI
)

def define_api_routes(app):  
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

#        {'url':'/api/download','name':'doDownloadGuru', 'view':ImportGuruAPI, 'methods':['GET']},
#        {'url':'/api/upload', 'name':'doImportGuru', 'view':ImportGuruAPI, 'methods':['GET', 'POST']},
       
        {'url':'/api/pengerjaanujian', 'name':'pengerjaanujian', 'view':PengerjaanUjianAPI, 'methods':['GET']},

        {'url':'/api/ujianesai/<int:idujian>', 'name':'ujianesai_dt', 'view':UjianEsaiAPI, 'methods':['PUT','DELETE']},
        {'url':'/api/ujianesai/<int:idujian>', 'name':'ujianesai_ket', 'view':UjianEsaiAPI, 'methods':['GET']},
        {'url':'/api/ujianesai', 'name':'ujianesai', 'view':UjianEsaiAPI, 'methods':['GET','POST']},

        {'url':'/api/jawaban/<int:idjawaban>', 'name':'ubahjawaban', 'view':JawabanAPI, 'methods':['PUT']},
        {'url':'/api/jawaban/<int:idsoal>', 'name':'jawabansiswa', 'view':JawabanAPI, 'methods':['GET']},
        {'url':'/api/jawaban', 'name':'jawaban', 'view':JawabanAPI, 'methods':['POST']},

        {'url':'/api/pelaksanaan/<int:idujian>/<int:idkelas>', 'name':'laksanakanujian', 'view':PelaksanaanUjianAPI, 'methods':['POST']},
        {'url':'/api/pelaksanaan/<int:idujian>', 'name':'pelaksanaanujian', 'view':PelaksanaanUjianAPI, 'methods':['GET']},

        {'url':'/api/penilaianmanual/<int:idujian>/<int:idkelas>/<int:idsoal>', 'name':'jawaban_nilaimanual', 'view':PenilaianManualAPI, 'methods':['GET']},
        {'url':'/api/penilaianmanual/<int:idujian>/<int:idkelas>', 'name':'mulai_nilaimanual', 'view':PenilaianManualAPI, 'methods':['POST']},
        {'url':'/api/penilaianmanual', 'name':'nilaimanual', 'view':PenilaianManualAPI, 'methods':['PUT']},

        {'url':'/api/penilaianotomatis/<int:idujian>', 'name':'penilaianotomatis', 'view':PenilaianOtomatisAPI, 'methods':['POST']},
        
        {'url':'/api/nilaiujian/<int:idujian>/<int:idkelas>', 'name':'nilaiujian', 'view':NilaiUjianAPI, 'methods':['GET']},   
        {'url':'/api/daftarnilai', 'name':'daftarnilaiujian', 'view':DaftarNilaiAPI, 'methods':['POST']},

        {'url':'/download/daftarnilai/<int:idmapel>/<int:idkelas>', 'name':'downloaddaftarnilaiujian', 'view':DownloadDaftarNilaiAPI, 'methods':['GET']},
    ]

    for route in routes_api:
        app.add_url_rule(route['url'], view_func=route['view'].as_view(route['name']), methods=route['methods'])


def index(path = None):
    '''
    Selain Route API, Handle oleh FrontEnd (ReactJS)
    '''
    return current_app.send_static_file('index.html')


def define_root_routes(app):
    '''
    Mendefinisikan Route untuk Root ReactJS
    Default ke index.html 
    '''
    app.add_url_rule('/', 'root_app', index)
    app.add_url_rule('/<path:path>', 'root_app_default', index)