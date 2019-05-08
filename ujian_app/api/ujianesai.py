from flask.views import MethodView
from flask import json, request, session
from ujian_app.utils import AlchemyEncoder
from ujian_app.repository import UjianRepository
from ujian_app.models import Pelaksanaanujian, Guru

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
        gururepository = Guru()
        cur_user = session.get('user')

        guru = gururepository.query.filter_by(username=cur_user['username']).first()

        tlistpengampu = []

        for pengampu in guru.listpengampu:
            tpengampu = {}
            tpengampu['idmapel'] = pengampu.idmapel
            tpengampu['idkelas'] = pengampu.idkelas
            tpengampu['idguru'] = pengampu.idguru
            tpengampu['namaKelas'] = pengampu.kelas.namaKelas
            tpengampu['namaMapel'] = pengampu.matapelajaran.namaMapel
            tlistpengampu.append(tpengampu)

        return json.dumps({'listpengampu': tlistpengampu, 'listujian': guru.listujian }, cls=AlchemyEncoder), 200, {'Content-Type': 'application/json'}

    def post(self):
        '''
        Menyimpan data Ujian
        '''
        data_Ujian = request.get_json()
        namaUjian = data_Ujian['namaUjian']
        jumlahSoal = data_Ujian['jumlahSoal']
        durasi = data_Ujian['durasi']
        idguru = data_Ujian['idguru']
        idmapel = data_Ujian['idmapel']
        status_ujian = data_Ujian['status_ujian']

        pelaksanaan_ujian = []
        listpelaksanaan = data_Ujian['pelaksanaan_ujian']
        if listpelaksanaan:
            for p in listpelaksanaan:
                pelaksanaan = Pelaksanaanujian()
                pelaksanaan.idkelas = p['idkelas']
                pelaksanaan.status_pelaksanaan = 0
                pelaksanaan_ujian.append(pelaksanaan)

        self.repository.save(
            idguru=idguru,
            idmapel=idmapel,
            namaUjian=namaUjian, 
            jumlahSoal=jumlahSoal, 
            durasi=durasi,
            status_ujian=status_ujian,
            pelaksanaan_ujian=pelaksanaan_ujian
        )

        list_ujian = self.repository.findAll()
        return json.dumps({'list': list_ujian }, cls=AlchemyEncoder), 201, {'Content-Type': 'application/json'}
   
    def put(self, idujian):
        '''
        Mengubah Data Ujian
        '''
        data_Ujian = request.get_json()
        namaUjian = data_Ujian['namaUjian']
        jumlahSoal = data_Ujian['jumlahSoal']
        durasi = data_Ujian['durasi']
        idguru = data_Ujian['idguru']
        idmapel = data_Ujian['idmapel']
        status_ujian = data_Ujian['status_ujian']

        pelaksanaan_ujian = []
        listpelaksanaan = data_Ujian['pelaksanaan_ujian']
        if listpelaksanaan:
            for p in listpelaksanaan:
                pelaksanaan = Pelaksanaanujian()
                pelaksanaan.idkelas = p['idkelas']
                pelaksanaan.status_pelaksanaan = 0
                pelaksanaan_ujian.append(pelaksanaan)

        self.repository.update(
            idujian,
            idguru=idguru,
            idmapel=idmapel,
            namaUjian=namaUjian, 
            jumlahSoal=jumlahSoal, 
            durasi=durasi,
            status_ujian=status_ujian,
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