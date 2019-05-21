from flask.views import MethodView
from flask import json, request
from ujian_app.utils import AlchemyEncoder
from ujian_app.repository import SiswaRepository

class SiswaAPI(MethodView):
    
    def __init__(self):
        self.repository = SiswaRepository()
    
    def _getAllData(self):
        list_siswa = self.repository.findAll()

        lres_siswa = []
        for siswa in list_siswa:
            rsiswa = {}
            rsiswa['nis'] = siswa.nis
            rsiswa['idkelas'] = siswa.idkelas
            rsiswa['nama'] = siswa.nama
            rsiswa['kelas'] = {}
            rsiswa['kelas']['namaKelas'] = siswa.kelas.namaKelas
            rsiswa['angkatan'] = siswa.angkatan
            lres_siswa.append(rsiswa)

        return lres_siswa        

    def get(self):
        list_siswa = self._getAllData()

        return json.dumps({'list': list_siswa }, cls=AlchemyEncoder), 200, {'Content-Type': 'application/json'}

    def post(self):
        data_siswa = request.get_json()
        nis = data_siswa['nis']
        idkelas = data_siswa['idkelas']
        nama = data_siswa['nama']
        password = data_siswa['password']
        angkatan = data_siswa['angkatan']
        self.repository.save(
            nis=nis, 
            idkelas=idkelas,
            nama=nama, 
            password=password,
            angkatan=angkatan
        )

        list_siswa = self._getAllData()
        return json.dumps({'list': list_siswa }, cls=AlchemyEncoder), 201, {'Content-Type': 'application/json'}
    
    def put(self, nis):
        data_siswa = request.get_json()
        idkelas = data_siswa['idkelas']
        nama = data_siswa['nama']
        password = data_siswa['password']
        self.repository.update(nis, idkelas=idkelas, nama=nama, password=password)

        list_siswa = self._getAllData()
        return json.dumps({'list': list_siswa }, cls=AlchemyEncoder), 200, {'Content-Type': 'application/json'}
    
    def delete(self, nis):
        self.repository.delete(nis)

        list_siswa = self._getAllData()
        return json.dumps({'list': list_siswa }, cls=AlchemyEncoder), 200, {'Content-Type': 'application/json'}