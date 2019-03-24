from flask import Flask
from celery import Celery
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://ujian_app_user:majubersama@localhost:3306/ujian_app'

db = SQLAlchemy(app)

celery = Celery()

from ujian_app import routes