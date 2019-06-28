from flask.views import MethodView
from flask import json, request
from ujian_app.utils import AlchemyEncoder
from ujian_app.repository import DaftarNilaiRepository, UjianRepository
from ujian_app.models import NilaiUjian, Siswa

class NilaiUjianAPI(MethodView):

    def __init__(self):
        self.__repository = DaftarNilaiRepository()

    def get(self, idujian, idkelas):
        dskor_siswa = self.__repository.get_skor(idujian, idkelas)

        list_data_skor = []
        list_soal = {}
        for dt_skor_siswa in dskor_siswa:
            data_skor = {}
            data_skor['nis'] = dt_skor_siswa.nis
            data_skor['nama'] = dt_skor_siswa.nama
            data_skor['skor'] = {}
            data_skor['status'] = {}

            nilai = 0
            for dt_skor in dt_skor_siswa.jawaban:
                id_soal = dt_skor.idsoal
                data_skor['skor'][id_soal] = dt_skor.skorAngka
                nilai = nilai + int(dt_skor.skorAngka or 0)
                if dt_skor.nilaiOtomatis == 0:
                    data_skor['status'][id_soal] = 'Dinilai Manual'
                elif dt_skor.nilaiOtomatis == 1:
                    data_skor['status'][id_soal] = 'Dinilai Otomatis'
                else:
                    data_skor['status'][id_soal] = ''
                list_soal[id_soal] = True

            data_skor['nilai'] = nilai
            if int(dt_skor.soal.ujian.matapelajaran.KKM) > nilai:
                data_skor['keterangan'] = 'Remedial'
            else:
                data_skor['keterangan'] = 'Lulus'
                
            list_data_skor.append(data_skor)

        i = 0
        for id_soal in sorted(list_soal.keys()):
            i += 1
            list_soal[id_soal] = "Soal %d" % i

        return json.jsonify({
            'list_soal': list_soal,
            'list_skor': list_data_skor
        })