from flask import Flask
from celery import Celery

app = Flask(__name__)
celery = Celery()

from ujian_app import routes

celery.app = app