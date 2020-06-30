import os
import sys

from ujian_app import make_app

from sqlalchemy import exc
from sqlalchemy import event
from sqlalchemy.pool import Pool

sys.path.insert(0, os.path.dirname(__file__))

application = make_app('config.ini')
application.app_context().push()

@event.listens_for(Pool, "checkout")
def ping_connection(dbapi_connection, connection_record, connection_proxy):
    cursor = dbapi_connection.cursor()
    try:
        cursor.execute("SELECT 1")
    except:
        raise exc.DisconnectionError()
    cursor.close()