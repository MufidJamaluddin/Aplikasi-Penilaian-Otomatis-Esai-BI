import os
import tempfile

import pytest

from ujian_app import make_app_by_config, Config
from ujian_app.models import db


@pytest.fixture
def client():
    config = Config.get_config('config.ini')

    config['TESTING'] = True
    config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(os.getcwd() + '/test_ujian_app.db')
    
    del config['SQLALCHEMY_ENGINE_OPTIONS']

    app = make_app_by_config(config=config, forced=True)
    app.app_context().push()

    with app.test_client() as client:
        with app.app_context():
            db.create_all()
        yield client