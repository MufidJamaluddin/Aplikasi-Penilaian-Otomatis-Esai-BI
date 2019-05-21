from flask.views import MethodView
from flask import json, request, session
from ujian_app.utils import AlchemyEncoder
from ujian_app.repository import UjianRepository, GuruRepository
from ujian_app.models import PelaksanaanUjian, Soal

class UjianEsaiAPI(MethodView):
   
    def __init__(self):
        '''
        Inisialisasi Ujian
        '''
        self.repository = UjianRepository()

    def get(self, idujian = None):
        '''
        Mendapatkan semua Ujian / berasarkan page
        '''
        if idujian:
            ujian =self.repository.findById(idujian)
            
            dtujian = {}
            dtujian['namaUjian'] = ujian.namaUjian
            dtujian['namaMapel'] = ujian.matapelajaran.namaMapel
            dtujian['durasi'] = ujian.durasi

            return json.dumps({'data': dtujian }), 200, {'Content-Type': 'application/json'}

        cur_user = session.get('user')

        if cur_user is None:
            return 'Tidak Ditemukan', 404

        listujian = self.repository.getUjianByUsername(cur_user['username'])

        tlistujian = []
        for ujian in listujian:
            p = {}
            p['idmapel'] = ujian.idmapel
            p['idujian'] = ujian.idujian
            p['jumlahSoal'] = ujian.jumlahSoal
            p['namaUjian'] = ujian.namaUjian
            p['namaMapel'] = ujian.matapelajaran.namaMapel
            p['durasi'] = str(ujian.durasi)
            p['status_ujian'] = ujian.status_ujian
            tlistujian.append(p)

        return json.dumps({'list': tlistujian }), 200, {'Content-Type': 'application/json'}

    def post(self):
        '''
        Menyimpan data Ujian
        '''
        gururepo = GuruRepository()
        cur_user = session.get('user')

        if cur_user is None:
            return 'Tidak Diizinkan', 405
        
        idguru = gururepo.getGuruByUsername(cur_user['username']).idguru
        data_Ujian = request.get_json()
        namaUjian = data_Ujian['namaUjian']
        jumlahSoal = data_Ujian['jumlahSoal']
        durasi = data_Ujian['durasi']
        idmapel = data_Ujian['idmapel']
        status_ujian = 0

        pelaksanaan_ujian = []
        listpelaksanaan = data_Ujian['pelaksanaan_ujian']
        if listpelaksanaan:
            for p in listpelaksanaan:
                pelaksanaan = PelaksanaanUjian()
                pelaksanaan.idkelas = p['idkelas']
                pelaksanaan.status_pelaksanaan = 0
                pelaksanaan_ujian.append(pelaksanaan)

        listsoal = []
        for i in range(jumlahSoal):
            soal = Soal()
            soal.soalEsai = ''
            listsoal.append(soal)
        
        ujian = self.repository.save(
            idguru=idguru,
            idmapel=idmapel,
            namaUjian=namaUjian, 
            jumlahSoal=jumlahSoal, 
            durasi=durasi,
            status_ujian=status_ujian,
            pelaksanaan_ujian=pelaksanaan_ujian,
            listsoal=listsoal
        )
        return json.dumps({'idujian':ujian.idujian }), 201, {'Content-Type': 'application/json'}
   
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
                pelaksanaan = PelaksanaanUjian()
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
        self.repository.deleteUjian(idujian)

        return self.get()