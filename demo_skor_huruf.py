list_skor_huruf = ['A', 'B', 'C', 'D']

# Konversi Huruf ke ASCII
for skor in list_skor_huruf:
    print('Skor %s dalam ASCII %d' % (skor, ord(skor)))

angka = 65

for i in range(5):
    print('Increment ASCII %d Yaitu %s' % (angka, chr(angka)))
    angka += 1

#### ARTINYA HURUF A, B, C, D, DST BISA DILAKUKAN LOOP ####