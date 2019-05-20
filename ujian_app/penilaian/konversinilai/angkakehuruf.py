class SkorAngkaKeHuruf(object) :
    """
    Kelas yag bertugas untuk konversi skor angka ke 
    skor huruf

    rumus : Skor maksimum - skor minimum / 4
    """

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

    def get_nilai_huruf(self, skor_angka, ascii_skor, batas_atas, interval):
        '''
        Mendapatkan skor huruf
        '''
        batas_bawah = batas_atas - interval
        if batas_bawah <= skor_angka <= batas_atas:
            return chr(ascii_skor)
        elif skor_angka > self.skorMin:
            batas_atas = batas_bawah - 1
            ascii_skor = ascii_skor + 1
            # REKURSIF !
            return self.get_nilai_huruf(skor_angka, ascii_skor, batas_atas, interval)
        else:
            return chr(ascii_skor)

    def konversi(self, nilai_angka):
        '''
        Melakukan konversi nilai
        '''
        interval = self.get_interval_predikal()
        ascii_skor_tertinggi = ord('A')
        return self.get_nilai_huruf(nilai_angka, ascii_skor_tertinggi, self.skorMax, interval)