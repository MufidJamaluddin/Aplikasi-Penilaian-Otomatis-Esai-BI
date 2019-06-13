from ujian_app.penilaian import (
    PenilaianOtomatis, PenilaianManual
)
from celery import task

@task
def penilaian_manual(idujian, idkelas):
    """
    Melatih Aplikasi / Training
    Sebelum Aplikasi Memberikan Skor
    """
    pmanual = PenilaianManual()
    pmanual.nilai_manual(idujian, idkelas)

@task
def penilaian_otomatis(idujian):
    '''
    Melakukan Task Penilaian Otomatis
    '''
    potomatis = PenilaianOtomatis(idujian)
    potomatis.nilai_otomatis()