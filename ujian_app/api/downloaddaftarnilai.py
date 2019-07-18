from flask.views import MethodView
from flask import json, request, send_file
from ujian_app.repository import DaftarNilaiRepository
from pyexcel_xlsx import save_data
from io import BytesIO

class DownloadDaftarNilaiAPI(MethodView):

    def __init__(self):
        self.__repository = DaftarNilaiRepository()

    def __get_data_nilai(self, idmapel, idkelas):
        dnilai_siswa = self.__repository.get_nilai(idmapel, idkelas)
        list_data_nilai = []
        list_ujian = {}
        for dt_nilai_siswa in dnilai_siswa:
            data_nilai = {}
            data_nilai['nis'] = dt_nilai_siswa.nis
            data_nilai['nama'] = dt_nilai_siswa.nama
            data_nilai['nilai'] = {}

            nilai_akhir = 0
            for dt_nilai in dt_nilai_siswa.daftarnilaiujian:
                nama_ujian = dt_nilai.ujian.namaUjian
                id_ujian = dt_nilai.ujian.idujian
                data_nilai['nilai'][id_ujian] = dt_nilai.nilai
                list_ujian[id_ujian] = nama_ujian
                nilai_akhir += int(dt_nilai.nilai)

            data_nilai['nilai_akhir'] = nilai_akhir
            list_data_nilai.append(data_nilai)

        sz = len(list_ujian)
        for dt_nilai in list_data_nilai:
            dt_nilai['nilai_akhir'] = dt_nilai['nilai_akhir'] / sz
        
        return list_data_nilai, list_ujian

    def get(self, idmapel, idkelas):
        list_data_nilai, list_ujian = self.__get_data_nilai(idmapel, idkelas)

        dict_id_ujian = {}
        i = 1
        for key, val in list_ujian.items():
            i += 1
            dict_id_ujian[key] = i

        list_atas = ['NIS', 'Nama Siswa', 'Nilai Ujian']
        for i in range(len(list_ujian) - 1):
            list_atas.append('')
        list_atas.append('Nilai Akhir')

        list_nama_ujian = ['', '']
        for ujian in list_ujian.values():
            list_nama_ujian.append(ujian)
        
        list_excel = []
        list_excel.append(list_atas)
        list_excel.append(list_nama_ujian)

        for dt_nilai in list_data_nilai:
            bag_nilai_ujian = []
            bag_nilai_ujian.append(dt_nilai['nis'])
            bag_nilai_ujian.append(dt_nilai['nama'])
            for key, val in dt_nilai['nilai'].items():
                index = dict_id_ujian[key]
                bag_nilai_ujian.insert(index, val)
            bag_nilai_ujian.insert(index + 1, dt_nilai['nilai_akhir'])
            list_excel.append(bag_nilai_ujian)

        data = {"Nilai Ujian": list_excel}

        bytio = BytesIO()
        save_data(bytio, data)

        bytio.seek(0)
        return send_file(
            bytio,
            attachment_filename="'DaftarNilai_%s_%s.xlsx'" % (idmapel, idkelas),
            as_attachment=True
        )