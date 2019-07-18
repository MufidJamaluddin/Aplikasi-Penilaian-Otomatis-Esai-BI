class SkorAngkaKeHuruf(object) :
    """
    Kelas yang bertugas untuk konversi skor angka ke 
    skor huruf

    rumus interval predikat: (skor maksimum - skor minimum) / 4
    """

    def __init__(self, skor_max:int, skor_min:int, jumlah_kelas=4):
        self.__skor_max = skor_max
        self.__skor_min = skor_min
        interval = (skor_max - skor_min) / jumlah_kelas
        self.__selisih = interval - 0.1

    def __get_skor_huruf(self, skor_angka:int, ascii_skor:int, batas_atas:int):
        '''
        Mendapatkan skor huruf
        '''
        batas_bawah = batas_atas - self.__selisih
        if batas_bawah <= skor_angka <= batas_atas:
            return chr(ascii_skor)
        elif batas_bawah <= self.__skor_min + 0.1:
            return chr(ascii_skor)
        elif skor_angka >= self.__skor_min:
            batas_atas = batas_bawah - 0.1
            ascii_skor = ascii_skor + 1
            # REKURSIF !
            return self.__get_skor_huruf(skor_angka, ascii_skor, batas_atas)
        else:
            return None

    def konversi(self, skor_angka:int):
        '''
        Melakukan konversi nilai
        '''
        ascii_skor_tertinggi = int(ord('A'))
        return self.__get_skor_huruf(
            skor_angka, 
            ascii_skor_tertinggi, 
            self.__skor_max
        )