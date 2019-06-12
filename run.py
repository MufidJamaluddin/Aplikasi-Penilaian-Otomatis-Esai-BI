from ujian_app import make_app
from celery import current_app
from celery.bin import worker

#
#   Dua Command yg Harus Dieksekusi
#   di Dua Terminal
#   1. Jalankan Aplikasi
#      python run.py run
#   2. Jalankan Celery Worker : 
#      celery -A ujian_app.celery worker

if __name__ == "__main__":
    app = make_app()
    app.run(port=5000)