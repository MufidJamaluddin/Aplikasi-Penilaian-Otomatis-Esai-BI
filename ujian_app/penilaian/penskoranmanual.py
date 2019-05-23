from ujian_app.penilaian.pemrosesan_jawaban import (
    PemrosesanDataLatih
)

class PenskoranManual(object):
    '''
    Kelas yang bertugas menghandle aksi
    penskoran manual
    '''

    def __init__(self):
        self.pemroses = PemrosesanDataLatih()
    
    def skor_manual(self, idsoal:int, idkelas:int):
        '''
        Menghandle skor manual
        '''
        self.pemroses.proses_dan_simpan(idsoal, idkelas)