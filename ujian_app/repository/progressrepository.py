import json
import os

class ProgressRepository:
    '''
    Menyimpan Progress Penilaian Otomatis
    '''

    def register_state(self, idujian):
        '''
        Register State
        '''
        self.idujian = idujian
        self.total_proses = 5 * 4
        self.total_proses_selesai = 0
        self.idsoal = None
        self.kode_proses = None
        self.idjawaban = None
        self.selesai = False
    
    def __toJson(self):
        return json.dumps({
            'idujian': self.idujian,
            'total_proses': self.total_proses,
            'total_proses_selesai': self.total_proses_selesai,
            'idsoal' : self.idsoal,
            'kode_proses' : self.kode_proses,
            'idjawaban' : self.idjawaban,
            'selesai': self.selesai
        })

    def load(self, idujian):
        '''
        Load State Data
        '''
        filename = "state/ujian_%s.json" % idujian

        if os.path.exists(filename):
            with open(filename) as json_file:  
                data = json.load(json_file)
                self.idujian = idujian
                self.total_proses = data.get('total_proses')
                self.total_proses_selesai = data.get('total_proses_selesai')
                self.idsoal = data.get('idsoal')
                self.kode_proses = data.get('kode_proses')
                self.idjawaban = data.get('idjawaban')
                self.selesai = data.get('selesai')
        else:
            self.register_state(idujian)

    def simpan(self):
        '''
        Simpan State
        '''
        with open("state/ujian_%s.json" % self.idujian, "w") as file:
            file.write(self.__toJson())
    
    def set_soal(self, idsoal):
        '''
        Set State Soal
        '''
        self.idsoal = idsoal
        self.kode_proses = None
        self.idjawaban = None
        self.simpan()
    
    def set_proses(self, kode_proses):
        '''
        Set State Proses
        '''
        self.kode_proses = kode_proses
        self.idjawaban = None
        if kode_proses is not None:
            self.total_proses_selesai += 1
        self.simpan()
    
    def set_jawaban(self, idjawaban):
        '''
        Set State idjawaban
        '''
        self.idjawaban = idjawaban
        self.simpan()
    
    def akhiri(self):
        self.selesai = True
    
    def get_progress(self):
        '''
        Mendapatkan progress dalam persentase
        '''
        return (self.total_proses_selesai * 100) / self.total_proses
    