from ujian_app import make_app

#
#   Dua Command yg Harus Dieksekusi
#   di Dua Terminal
#   1. Jalankan Aplikasi
#      python run_app.py run
#   2. Jalankan Celery Worker : 
#      python run_cworker.py

if __name__ == "__main__":
    config_file = 'config.ini'
    app = make_app(config_file)
    app.app_context().push()
    app.run(port=5000)