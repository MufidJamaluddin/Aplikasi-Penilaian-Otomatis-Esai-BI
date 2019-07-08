from flask.views import MethodView
from flask import json, request
from ujian_app.repository import DaftarNilaiRepository

class DaftarNilaiAPI(MethodView):
    
    def __init__(self):
        self.__repository = DaftarNilaiRepository()
    
    def post(self):
        data_req = request.get_json()
        dnilai_siswa = self.__repository.get_nilai(data_req.get('idmapel', ''), data_req.get('idkelas', ''))

        list_data_nilai = []
        list_ujian = {}
        list_nilaiujian = {}
        for dt_nilai_siswa in dnilai_siswa:
            data_nilai = {}
            data_nilai['nis'] = dt_nilai_siswa.nis
            data_nilai['nama'] = dt_nilai_siswa.nama
            data_nilai['nilai'] = {}

            nilai_akhir = 0
            for dt_nilai in dt_nilai_siswa.daftarnilaiujian:
                nilai_ujian = int(dt_nilai.nilai)
                nama_ujian = dt_nilai.ujian.namaUjian
                id_ujian = dt_nilai.ujian.idujian
                data_nilai['nilai'][id_ujian] = nilai_ujian
                list_ujian[id_ujian] = nama_ujian
                nilai_akhir += nilai_ujian
                if list_nilaiujian.get(nama_ujian, None) == None:
                    list_nilaiujian[nama_ujian] = []
                    list_nilaiujian[nama_ujian].append(nilai_ujian)
                else:
                    list_nilaiujian[nama_ujian].append(nilai_ujian)

            data_nilai['nilai_akhir'] = nilai_akhir
            list_data_nilai.append(data_nilai)

        sz = len(list_ujian)
        for dt_nilai in list_data_nilai:
            dt_nilai['nilai_akhir'] = dt_nilai['nilai_akhir'] / sz

        return json.jsonify({
            'list_ujian': list_ujian,
            'list_nilai': list_data_nilai,
            'list_nilaiujian': list_nilaiujian
        })