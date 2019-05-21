from flask import Flask
from celery import Celery
from flask_sqlalchemy import SQLAlchemy
from .config import Config
from .celery import make_celery, init_celery
from flask_excel import init_excel
from os import urandom
from binascii import hexlify

db = SQLAlchemy()
celery = make_celery('ujian_app', Config.get_config())

def make_app():
    '''
    Creator objek app
    '''
    app = Flask(__name__)
    
    # Secret Key untuk Session 
    # http://flask.pocoo.org/docs/1.0/quickstart
    app.secret_key = hexlify(urandom(24))

    app.config.update(Config.get_config())

    db.init_app(app)
    init_celery(celery, app)
    init_excel(app)

    from .routes import define_api_routes, define_root_routes

    define_api_routes(app)
    define_root_routes(app)

    return app