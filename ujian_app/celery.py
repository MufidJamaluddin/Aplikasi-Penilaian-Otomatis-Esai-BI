from flask import Flask
from celery import Celery
from flask_sqlalchemy import SQLAlchemy
from .config import get_config

def make_celery(app):
    '''
    Membuat objek Celery
    Asynchronous Task Queue
    sumber : http://flask.pocoo.org/docs/1.0/patterns/celery
    '''
    celery = Celery(
        app.import_name,
        backend=app.config['CELERY_RESULT_BACKEND'],
        broker=app.config['CELERY_BROKER_URL']
    )

    celery.conf.update(app.config)

    class ContextTask(celery.Task):
        # Inherit untuk menambahkan konteks
        # aplikasi Flask
        def __call__(self, *args, **kwargs):
            with app.app_context():
                return self.run(*args, **kwargs)
    
    celery.Task = ContextTask
    return celery