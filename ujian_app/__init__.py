from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from .config import Config
from .ncelery import make_celery
from flask_excel import init_excel
#from os import urandom
#from binascii import hexlify

app = None
db = None
celery = None

def make_db():
    global db
    if db is not None:
        return db
    db = SQLAlchemy()
    return db

def make_app():
    '''
    Creator objek app
    '''
    global app
    global celery

    if app is not None:
        return app

    app = Flask(__name__)
    
    # Secret Key untuk Session 
    # http://flask.pocoo.org/docs/1.0/quickstart
    app.secret_key = '228632004176512061657206875912910109'

    app.config.update(Config.get_config())
    celery = make_celery(app.import_name, app)
    db = make_db()

    db.init_app(app)
    init_excel(app)

    from .routes import define_api_routes, define_root_routes

    define_api_routes(app)
    define_root_routes(app)

    from .tasks import init_worker, penilaian_manual, penilaian_otomatis

#    SQLAlchemy Debug Queries
#    if app.config['DEBUG']:
#        import logging
#        logging.basicConfig()
#        logging.getLogger('sqlalchemy.engine').setLevel(logging.INFO)

    return app