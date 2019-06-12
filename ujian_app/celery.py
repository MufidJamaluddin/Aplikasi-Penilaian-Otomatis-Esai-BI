from flask import Flask
from celery import Celery
from flask_sqlalchemy import SQLAlchemy
from .config import Config

def make_celery(name, app):
    '''
    Membuat Objek Celery
    '''
    config = Config.get_config()

    celery = Celery(
        name,
        broker=config.get('CELERY_BROKER_URL')
    )

    # Menambahkan konfigurasi tambahan
    celery.conf.update({
        'result_backend': config.get('CELERY_RESULT_BACKEND')
    })

    # Menambahkan Konteks Aplikasi ke Celery
    # sumber : http://flask.pocoo.org/docs/1.0/patterns/celery
    class ContextTask(celery.Task):
        # Inherit untuk menambahkan konteks
        # aplikasi Flask
        def __call__(self, *args, **kwargs):
            with app.app_context():
                return self.run(*args, **kwargs)
    
    celery.Task = ContextTask

    return celery