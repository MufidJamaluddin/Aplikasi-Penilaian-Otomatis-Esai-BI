from ujian_app.penilaian import (
    PenilaianOtomatis, PenilaianManual
)
from ujian_app.models import db
from celery import task
from celery.signals import (
    worker_process_init,
    worker_process_shutdown
)

@worker_process_init.connect
def init_worker(**kwargs):
    """
    Tutup Session yg Ada
    Buat Session yg 'Fresh'
    """
    db.session.remove()

@worker_process_shutdown.connect
def shutdown_worker(**kwargs):
    if db:
        db.session.close()

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