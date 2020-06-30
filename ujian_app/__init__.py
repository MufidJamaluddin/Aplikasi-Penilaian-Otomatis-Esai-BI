from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_continuum import Continuum

from .config import Config
from .ncelery import make_celery

app = None
db = None
db_continuum = None 
celery = None
migrator = None


def make_db(forced:bool = False):
    global db
    global db_continuum
    if db is not None and forced is False:
        return db
    db = SQLAlchemy()
    db_continuum = Continuum(db=db)
    return db
    

def make_migrator(forced:bool = False):
    global migrator
    if migrator is not None and forced is False:
        return migrator
    migrator = Migrate()
    return migrator


def make_app(config_file: str, forced:bool = False):
    config = Config.get_config(config_file)
    return make_app_by_config(config=config, forced=forced)


def make_app_by_config(config, forced:bool = False):
    '''
    Creator objek app
    '''
    global app
    global celery
    global migrator

    if app is not None and forced is False:
        return app

    app = Flask(__name__)
    
    # Secret Key untuk Session 
    # http://flask.pocoo.org/docs/1.0/quickstart
    app.secret_key = '228632004176512061657206875912910109'

    app.config.update(config)

    celery = make_celery(app.import_name, app)
    db = make_db(forced=forced)
    migrator = make_migrator(forced=forced)

    db.init_app(app)
    migrator.init_app(app, db)
    db_continuum.init_app(app)

    from .routes import define_api_routes, define_root_routes

    define_api_routes(app)
    define_root_routes(app)

    from .tasks import init_worker, penilaian_manual, penilaian_otomatis

#    SQLAlchemy Debug Queries
    if app.config['DEBUG']:
        import logging
        logging.basicConfig()
        logging.getLogger('sqlalchemy.engine').setLevel(logging.INFO)

    return app