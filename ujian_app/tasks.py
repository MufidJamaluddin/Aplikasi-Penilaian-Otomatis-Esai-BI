from . import celery
from celery.utils.log import get_task_logger

logger = get_task_logger(__name__)

@celery.task
def penilaian_esai():
    """
    Menilai Aplikasi
    """
    pass

@celery.task
def pelatihan_aplikasi():
    """
    Melatih Aplikasi / Training
    Sebelum Aplikasi Siap Menilai
    """
    pass