from flask import Flask
from celery import Celery
from flask_sqlalchemy import SQLAlchemy
from .config import get_config
from .celery import make_celery

app = Flask(__name__)
app.secret_key = '22863200417651206165720687591291010911123121111343'
app.config.update(get_config())

db = SQLAlchemy(app)

#celery = make_celery(app)

from ujian_app import routes