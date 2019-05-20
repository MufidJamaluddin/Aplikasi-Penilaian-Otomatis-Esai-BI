'''
ambil nilai maks dan nilai min dari setiap soal 
buat tabel konversi dengan rumus max-min/4
ambil seluruh skor huruf pada soal tertentu
hitung jumlah kemunculan tiap hurufnya
ambil skor huruf tertentu
rentang skor huruf pada tabel konversi dibagi jumlah kemunculan skor huruf tertentu
ambil nilai cosine similarity dari skor huruf tersebut
urutkan descending
beri masing2 skor huruf dengan nilai angka
looping
'''

class SkorHurufKeAngka(object):
    def __init__(self, skorMax, skorMin, jumlahKelas=4):
        self.skorMax = skorMax
        self.skorMin = skorMin
        self.jumlahKelas = jumlahKelas

    def get_interval_predikal(self):
        '''
        Mendapatkan interval predikat pada 4 kelas
        '''
        interval = (self.skorMax - self.skorMin) / self.jumlahKelas
        return interval
    
    def jumlah_skor_huruf(self, skorHuruf):
        '''
        Mendapatkan jumlah kemunculan skor A/B/C/D pada jawaban siswa
        '''
    
    def konversi(self):
        '''
        
        '''
        rentang = 
