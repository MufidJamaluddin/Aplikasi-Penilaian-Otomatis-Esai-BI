from ujian_app import make_app
from celery import current_app
from celery.bin import worker

config_file = 'config.ini'
app = make_app(config_file)
app.app_context().push()