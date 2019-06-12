from flask import Flask
from celery import Celery
from flask_sqlalchemy import SQLAlchemy

def make_celery(name, config):
    '''
    Membuat Objek Celery
    '''
    celery = Celery(
        name,
        broker=config['CELERY_BROKER_URL']
    )

    # Menambahkan konfigurasi tambahan
    celery.conf.update({
        'result_backend': config['CELERY_RESULT_BACKEND']
    })

    return celery

def init_celery(celery, app):
    '''
    Menambahkan Konteks Aplikasi ke Celery
    sumber : http://flask.pocoo.org/docs/1.0/patterns/celery
    '''
    class ContextTask(celery.Task):
        # Inherit untuk menambahkan konteks
        # aplikasi Flask
        def __call__(self, *args, **kwargs):
            with app.app_context():
                return self.run(*args, **kwargs)
    
    celery.Task = ContextTask

    return celery