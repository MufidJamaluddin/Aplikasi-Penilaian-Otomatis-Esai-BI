from ujian_app.penilaian import (
    PenilaianOtomatis, PenskoranManual
)
from celery import task

@task
def penskoran_manual(idujian, idkelas):
    """
    Melatih Aplikasi / Training
    Sebelum Aplikasi Memberikan Skor
    """
    pmanual = PenskoranManual()
    pmanual.skor_manual(idujian, idkelas)

@task
def penilaian_otomatis(idujian):
    '''
    Melakukan Task Penilaian Otomatis
    '''
    potomatis = PenilaianOtomatis(idujian)
    potomatis.nilai_otomatis()