import json
import os
from ujian_app.models import Ujian, db
from flask import current_app


class ProgressRepository:
    '''
    Menyimpan Progress Penilaian Otomatis
    '''
     
    def __init__(self):
        self.__kprogress = {
            '1': 'Pemrosesan Jawaban Esai Siswa',
            '2': 'Pembobotan Kata dan Frasa Kunci',
            '3': 'Pembobotan Kata dan Frasa Jawaban Esai Siswa',
            '4': 'Klasifikasi Jawaban Esai Siswa'
        }
        self.__ujian = None
        self.__file = None
    
    def __del__(self):
        if self.__file:
            self.__file.close()
            del self.__file
        del self.__ujian
        del self.__kprogress


    def register_state(self, idujian, jumlah_soal):
        '''
        Register State
        '''
        self.idujian = idujian
        self.jumlah_soal = jumlah_soal
        self.total_proses = 5 * int(jumlah_soal)
        self.total_proses_selesai = 0
        self.idsoal = None
        self.kode_proses = None
        self.idjawaban = None
        self.selesai = False
        self.selesai_potomatis = False
        self.nama_soal = ''
        self.jumlah_jawaban = 0
        self.jawaban_ke = 0
        self.hitung_jawaban = True

        self.__file = None
        self.__ujian = None
    

    def __toJson(self):
        return json.dumps({
            'idujian': self.idujian,
            'total_proses': self.total_proses,
            'total_proses_selesai': self.total_proses_selesai,
            'nama_soal': self.nama_soal,
            'idsoal' : self.idsoal,
            'kode_proses' : self.kode_proses,
            'idjawaban' : self.idjawaban,
            'selesai': self.selesai,
            'selesai_potomatis': self.selesai_potomatis,
            'jumlah_jawaban': self.jumlah_jawaban,
            'hitung_jawaban': self.hitung_jawaban,
            'jawaban_ke': self.jawaban_ke
        })

    def load(self, idujian, jumlah_soal):
        '''
        Load State Data
        '''
        filename = "state/ujian_{}.json".format(idujian)

        if os.path.exists(filename):
            with open(filename, "r") as read_file:
                read_file.seek(0)
                json_string = read_file.read()

                data = json.loads(json_string.strip())

                self.idujian = idujian
                self.jumlah_soal = jumlah_soal
                self.total_proses = data.get('total_proses')
                self.total_proses_selesai = data.get('total_proses_selesai')
                self.idsoal = data.get('idsoal')
                self.nama_soal = data.get('nama_soal')
                self.kode_proses = data.get('kode_proses')
                self.idjawaban = data.get('idjawaban')
                self.selesai = data.get('selesai')
                self.selesai_potomatis = data.get('selesai_potomatis')
                self.hitung_jawaban = data.get('hitung_jawaban')
                self.jumlah_jawaban = data.get('jumlah_jawaban')
                self.jawaban_ke = data.get('jawaban_ke')
        else:
            self.register_state(idujian, jumlah_soal)


    def simpan(self):
        '''
        Simpan State
        '''
        if self.__file is None:
            self.__file = open("state/ujian_{}.json".format(self.idujian), "w")
        
        # 'w' nya ga jalan
        self.__file.seek(0)
        self.__file.write('                                        ' * 20)
        self.__file.truncate()
        self.__file.flush()

        self.__file.seek(0)
        # simpan state terbaru
        self.__file.write(self.__toJson())
        self.__file.flush()
    
    def set_soal(self, idsoal, nama_soal):
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
    
    def clear_jawaban(self):
        self.idjawaban = None
    
    def set_jawaban(self, idjawaban):
        '''
        Set State idjawaban
        '''
        self.idjawaban = idjawaban
        if idjawaban:
            self.jawaban_ke += 1
            if self.hitung_jawaban:
                self.jumlah_jawaban += 1
            else:
                self.total_proses_selesai += 1
            if self.jawaban_ke % 10 == 1:
                self.simpan_progress()
        else:
            self.hitung_jawaban = False
            self.total_proses = (self.total_proses * self.jumlah_jawaban) + 2
            self.total_proses_selesai = self.total_proses_selesai * self.jumlah_jawaban

        self.simpan()
    
    def akhiri(self):
        self.selesai = True
        self.total_proses_selesai = self.total_proses
        self.simpan_progress()
    
    def akhiri_potomatis(self):
        self.selesai_potomatis = True
        self.total_proses_selesai += 1
    
    def get_progress(self):
        '''
        Mendapatkan progress dalam persentase
        '''
        progress = int((self.total_proses_selesai * 100) / self.total_proses)
        return progress
    
    def simpan_progress(self):
        
        if self.__ujian is None:
            self.__ujian = Ujian.query.get(self.idujian)
        
        prog = self.get_progress()

        if prog < 100:
            self.__ujian.progress_penilaian = prog
            pesan_prog = self.__kprogress.get(
                str(self.kode_proses),
                'Menunggu Eksekusi '
            )
            self.__ujian.pesan_progress_penilaian = '{} {}'.format(pesan_prog, self.nama_soal)
        else:
            self.__ujian.progress_penilaian = '100'
            self.__ujian.pesan_progress_penilaian = 'Penilaian Otomatis Telah Selesai'

        db.session.add(self.__ujian)
        db.session.commit()