from flask import Flask
from celery import Celery
from flask_sqlalchemy import SQLAlchemy
from .config import Config
from .celery import make_celery, init_celery
from flask_excel import init_excel
#from os import urandom
#from binascii import hexlify

db = SQLAlchemy()
celery = make_celery('ujian_app', Config.get_config())

from .tasks import penskoran_manual, penilaian_otomatis

def make_app():
    '''
    Creator objek app
    '''
    app = Flask(__name__)
    
    # Secret Key untuk Session 
    # http://flask.pocoo.org/docs/1.0/quickstart
    app.secret_key = '228632004176512061657206875912910109'

    app.config.update(Config.get_config())

    db.init_app(app)
    init_celery(celery, app)
    init_excel(app)

    from .routes import define_api_routes, define_root_routes

    define_api_routes(app)
    define_root_routes(app)

#    SQLAlchemy Debug Queries
#    if app.config['DEBUG']:
#        import logging
#        logging.basicConfig()
#        logging.getLogger('sqlalchemy.engine').setLevel(logging.INFO)

    return app