from ujian_app.penilaian import (
    PenilaianOtomatis, PenskoranManual
)
from . import celery

@celery.task
def penskoran_manual(idsoal, idkelas):
    """
    Melatih Aplikasi / Training
    Sebelum Aplikasi Memberikan Skor
    """
    pmanual = PenskoranManual()
    pmanual.skor_manual(idsoal, idkelas)

@celery.task
def penilaian_otomatis(idujian):
    '''
    Melakukan Task Penilaian Otomatis
    '''
    potomatis = PenilaianOtomatis(idujian)
    potomatis.nilai_otomatis()