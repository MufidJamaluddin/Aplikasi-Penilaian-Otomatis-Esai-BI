import json
import os
from ujian_app.models import Ujian, db

class ProgressRepository:
    '''
    Menyimpan Progress Penilaian Otomatis
    '''
    def __del__(self):
        if self.__file is not None:
            self.__file.close()
            del self.__file
        del self.__ujian
        del self.__kprogress
        
    def __init__(self):
        self.__kprogress = {
            '1': 'Pemrosesan Jawaban Esai Siswa',
            '2': 'Pembobotan Kata dan Frasa Kunci',
            '3': 'Pembobotan Kata dan Frasa Jawaban Esai Siswa',
            '4': 'Klasifikasi Jawaban Esai Siswa'
        }
        self.__ujian = None
        self.__file = None

    def register_state(self, idujian, jumlah_soal):
        '''
        Register State
        '''
        self.idujian = idujian
        self.jumlah_soal = jumlah_soal
        self.total_proses = 5 * int(jumlah_soal) + 2
        self.total_proses_selesai = 0
        self.idsoal = None
        self.kode_proses = None
        self.idjawaban = None
        self.selesai = False
        self.selesai_potomatis = False
        self.__file = None
        self.__ujian = None
        self.nama_soal = ''
    
    def __toJson(self):
        return json.dumps({
            'idujian': self.idujian,
            'total_proses': self.total_proses,
            'total_proses_selesai': self.total_proses_selesai,
            'idsoal' : self.idsoal,
            'kode_proses' : self.kode_proses,
            'idjawaban' : self.idjawaban,
            'selesai': self.selesai,
            'selesai_potomatis': self.selesai_potomatis
        })

    def load(self, idujian, jumlah_soal):
        '''
        Load State Data
        '''
        if self.__file is None:
            filename = "state/ujian_%s.json" % idujian

            if os.path.exists(filename):
                with open(filename, "r") as read_file:
                    data = json.load(read_file)
                    self.idujian = idujian
                    self.jumlah_soal = jumlah_soal
                    self.total_proses = data.get('total_proses')
                    self.total_proses_selesai = data.get('total_proses_selesai')
                    self.idsoal = data.get('idsoal')
                    self.kode_proses = data.get('kode_proses')
                    self.idjawaban = data.get('idjawaban')
                    self.selesai = data.get('selesai')
                    self.selesai_potomatis = data.get('selesai_potomatis')

            else:
                self.register_state(idujian, jumlah_soal)


    def simpan(self):
        '''
        Simpan State
        '''
        if self.__file is None:
            self.__file = open("state/ujian_%s.json" % self.idujian, "w")
        self.__file.write(self.__toJson())
    
    def set_soal(self, idsoal, nama_soal = ''):
        '''
        Set State Soal
        '''
        self.idsoal = idsoal
        self.kode_proses = None
        self.idjawaban = None
        self.nama_soal = nama_soal
        self.simpan()
    
    def set_proses(self, kode_proses):
        '''
        Set State Proses
        '''
        self.kode_proses = kode_proses
        self.idjawaban = None
        if kode_proses is not None:
            self.total_proses_selesai += 1
            self.simpan_progress()
        self.simpan()
    
    def set_jawaban(self, idjawaban):
        '''
        Set State idjawaban
        '''
        self.idjawaban = idjawaban
        self.simpan()
    
    def akhiri(self):
        self.selesai = True
        self.total_proses_selesai += 1
        self.simpan_progress()
    
    def akhiri_potomatis(self):
        self.selesai_potomatis = True
        self.total_proses_selesai += 1
    
    def get_progress(self):
        '''
        Mendapatkan progress dalam persentase
        '''
        return (self.total_proses_selesai * 100) / self.total_proses
    
    def simpan_progress(self):
        if self.__ujian is None:
            self.__ujian = Ujian.query.get(self.idujian)
        self.__ujian.progress_penilaian = self.get_progress()
        self.__ujian.pesan_progress_penilaian = self.__kprogress.get(
            str(self.kode_proses),
            'Menunggu Antrian '
        ) + self.nama_soal

        db.session.add(self.__ujian)
        db.session.commit()