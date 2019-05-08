from flask.views import MethodView
from flask import json, request
from ujian_app.utils import AlchemyEncoder
from ujian_app.repository import UjianRepository
from ujian_app.models import Pelaksanaanujian

class UjianEsaiAPI(MethodView):
   
    def __init__(self):
        '''
        Inisialisasi Ujian
        '''
        self.repository = UjianRepository()

    def get(self):
        '''
        Mendapatkan semua Ujian / berasarkan page
        '''
        list_Ujian = self.repository.findAll()
        return json.dumps({'list': list_Ujian }, cls=AlchemyEncoder), 200, {'Content-Type': 'application/json'}

    def post(self):
        '''
        Menyimpan data Ujian
        '''
        data_Ujian = request.get_json()
        namaUjian = data_Ujian['namaUjian']
        jumlahSoal = data_Ujian['jumlahSoal']
        durasi = data_Ujian['durasi']

        pelaksanaan_ujian = []
        listpelaksanaan = data_Ujian['pelaksanaan_ujian']
        if listpelaksanaan:
            for p in listpelaksanaan:
                pelaksanaan = Pelaksanaanujian()
                pelaksanaan.idkelas = p['idkelas']
                pelaksanaan_ujian.append(pelaksanaan)

        self.repository.save(
            namaUjian=namaUjian, 
            jumlahSoal=jumlahSoal, 
            durasi=durasi,
            pelaksanaan_ujian=pelaksanaan_ujian
        )

        list_ujian = self.repository.findAll()
        return json.dumps({'list': list_ujian }, cls=AlchemyEncoder), 201, {'Content-Type': 'application/json'}
   
    def put(self, idujian):
        '''
        Mengubah Data Ujian
        '''
        ujian = self.repository.findById(idujian)

        data_Ujian = request.get_json()
        namaUjian = data_Ujian['namaUjian']
        jumlahSoal = data_Ujian['jumlahSoal']
        durasi = data_Ujian['durasi']

        pelaksanaan_ujian = []
        listpelaksanaan = data_Ujian['pelaksanaan_ujian']
        if listpelaksanaan:
            for p in listpelaksanaan:
                pelaksanaan = Pelaksanaanujian()
                pelaksanaan.idkelas = p['idkelas']
                pelaksanaan_ujian.append(pelaksanaan)

        self.repository.update(
            idujian, 
            namaUjian=namaUjian, 
            jumlahSoal=jumlahSoal, 
            durasi=durasi,
            pelaksanaan_ujian=pelaksanaan_ujian
        )

        list_Ujian = self.repository.findAll()
        return json.dumps({'list': list_Ujian }, cls=AlchemyEncoder), 200, {'Content-Type': 'application/json'}
    
    def delete(self, idujian):
        '''
        Menghapus Data Ujian
        '''
        self.repository.delete(idujian)

        list_Ujian = self.repository.findAll()
        return json.dumps({'list': list_Ujian }, cls=AlchemyEncoder), 200, {'Content-Type': 'application/json'}