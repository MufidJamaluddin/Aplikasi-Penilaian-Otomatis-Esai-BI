from flask.views import MethodView
from flask import json, request, send_file
from ujian_app.repository import DaftarNilaiRepository
from pyexcel_xlsx import save_data
from io import BytesIO

class DownloadNilaiUjianAPI(MethodView):

    def __init__(self):
        self.__repository = DaftarNilaiRepository()

    def __get_data_skor(self, idujian, idkelas):
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
                skor_angka = int(dt_skor.skorAngka or 0)
                data_skor['skor'][id_soal] = skor_angka
                nilai = nilai + skor_angka
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
        sid_soal = []
        for id_soal in sorted(list_soal.keys()):
            i += 1
            nama_soal = "Soal %d" % i
            list_soal[id_soal] = nama_soal
            sid_soal.append(id_soal)
        
        return sid_soal, list_soal, list_data_skor


    def get(self, idujian, idkelas):
        sid_soal, list_soal, list_data_skor = self.__get_data_skor(idujian, idkelas)

        list_atas = ['NIS', 'Nama Siswa', 'Skor Setiap Soal']
        for i in range(len(list_soal) - 1):
            list_atas.append('')
            list_atas.append('')
        list_atas.append('Nilai')
        list_atas.append('Keterangan')

        list_nama_soal = ['', '']
        for soal in sorted(list_soal.values()):
            list_nama_soal.append(soal)
            list_nama_soal.append('')
        
        list_status_soal = ['', '']
        for soal in sid_soal:
            list_status_soal.append('Skor')
            list_status_soal.append('Status')

        list_excel = []
        list_excel.append(list_atas)
        list_excel.append(list_nama_soal)
        list_excel.append(list_status_soal)

        for dt_skor in list_data_skor:
            bag_skor_ujian = []
            bag_skor_ujian.append(dt_skor['nis'])
            bag_skor_ujian.append(dt_skor['nama'])
            
            index = 2
            for id_soal in sid_soal:
                skor = dt_skor['skor'].get(id_soal, None)
                status = dt_skor['status'].get(id_soal, None)
                bag_skor_ujian.insert(index, skor)
                index += 1
                bag_skor_ujian.insert(index, status)
                index += 1

            bag_skor_ujian.insert(index, dt_skor['nilai'])
            bag_skor_ujian.insert(index + 1, dt_skor['keterangan'])
            list_excel.append(bag_skor_ujian)

        data = {"Skor Ujian": list_excel}

        bytio = BytesIO()
        save_data(bytio, data)

        bytio.seek(0)
        return send_file(bytio,
            attachment_filename="'Skor_Ujian_%s_%s.xlsx'" % (idujian, idkelas),
            as_attachment=True)