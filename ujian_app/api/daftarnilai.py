from flask.views import MethodView
from flask import json, request
from ujian_app.utils import AlchemyEncoder
from ujian_app.repository import DaftarNilaiRepository, UjianRepository
from ujian_app.models import NilaiUjian, Siswa

class DaftarNilaiAPI(MethodView):
    
    def __init__(self):
        '''
        Inisialisasi Daftar Nilai Ujian
        '''
        self.nilairepository = DaftarNilaiRepository()
        self.ujianrepository = UjianRepository()
    
    def get(self, idujian):
        '''
        Mendapatkan semua daftar nilai 
        '''
        list_nilai = self.nilairepository.findByKeys(idujian=idujian).join(Siswa).order_by(
            NilaiUjian.namaKelas, Siswa.nama
        )
        ujian = self.ujianrepository.findById(idujian)

        dt_list_nilai = []
        dt_list_kelas = []
        dt_ujian = {} #dict()
        kelas_lama = None

        dt_ujian['idujian'] = ujian.idujian
        dt_ujian['namaMapel'] = ujian.matapelajaran.namaMapel
        dt_ujian['namaUjian'] = ujian.namaUjian

        for nilai in list_nilai:
            if nilai.nilai is None:
                continue
            
            dt_nilai = {}
            dt_nilai['nis'] = nilai.nis
            dt_nilai['nama'] = nilai.siswa.nama
            dt_nilai['nilai'] = int(nilai.nilai)
            dt_nilai['namaKelas'] = nilai.namaKelas
            dt_list_nilai.append(dt_nilai)

            if kelas_lama != nilai.namaKelas:
                dt_list_kelas.append(nilai.namaKelas)
                kelas_lama = nilai.namaKelas

        return json.jsonify({
                'list_nilai': dt_list_nilai,
                'list_kelas': dt_list_kelas,
                'ujian': dt_ujian
            })
