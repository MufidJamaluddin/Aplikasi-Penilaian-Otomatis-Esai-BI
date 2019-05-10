from datetime import datetime, timedelta

## CEK UJIAN ATAU ENGGANYA (WAKTU UJIAN 30 MENIT) ###
def saatUjian(sekarang, waktu_ujian, **kwargs):
    waktu_selesai_ujian = waktu_ujian + timedelta(minutes=30)
    waktu_sekarang = sekarang + timedelta(**kwargs)

    if(waktu_ujian < waktu_sekarang < waktu_selesai_ujian):
        print("Ujian Sedang Berlangsung!")
    elif(waktu_sekarang > waktu_ujian):
        print("Ujian Telah Dilaksanakan")    
    else:
        print("Ujian Belum Dilaksanakan")

# WAKTU SEKARANG (LOKAL)
waktu_skr = datetime.now()
print(waktu_skr)

# DURASI UJIAN 1 JAM 30 MENIT KEMUDIAN
waktu_ujian = waktu_skr + timedelta(hours=1, minutes=30)
print(waktu_ujian)

# BILA AKSES 5 MENIT SEBELUMNYA
print('\n5 Menit Sebelumnya :')
saatUjian(waktu_skr, waktu_ujian, minutes=5)

# BILA AKSES 0 MENIT KEMUDIAN
print('\nSaat Ini :')
saatUjian(waktu_skr, waktu_ujian, minutes=0)

# BILA AKSES 1 JAM 40 MENIT KEMUDIAN
print('\n1 Jam 40 Menit Kemudian :')
saatUjian(waktu_skr, waktu_ujian, hours=1, minutes=40)

# BILA AKSES 1 JAM 59 MENIT KEMUDIAN
print('\n1 Jam 59 Menit Kemudian :')
saatUjian(waktu_skr, waktu_ujian, hours=1, minutes=59)

# BILA AKSES 2 JAM KEMUDIAN
print('\n2 Jam Kemudian :')
saatUjian(waktu_skr, waktu_ujian, hours=2)

# BILA AKSES 2 JAM 30 MENIT KEMUDIAN
print('\n2 Jam 30 Menit Kemudian :')
saatUjian(waktu_skr, waktu_ujian, hours=2, minutes=30)