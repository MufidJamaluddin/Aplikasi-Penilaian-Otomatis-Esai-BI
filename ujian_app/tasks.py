from ujian_app.penilaian import PenilaianOtomatis, PenilaianManual
from . import celery

@celery.task
def penilaian_manual(idsoal, idkelas):
    """
    Melatih Aplikasi / Training
    Sebelum Aplikasi Siap Menilai
    """
    pmanual = PenilaianManual(idsoal, idkelas)
    pmanual.nilai_manual()

@celery.task
def penilaian_otomatis(idujian):
    '''
    Melakukan Task Penilaian Otomatis
    '''
    potomatis = PenilaianOtomatis(idujian)
    potomatis.nilai_otomatis()