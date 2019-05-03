from flask import Flask
from celery import Celery
from flask_sqlalchemy import SQLAlchemy
from .config import get_config

app = Flask(__name__)
app.config.update(get_config())

db = SQLAlchemy(app)

celery = Celery()

from ujian_app import routes