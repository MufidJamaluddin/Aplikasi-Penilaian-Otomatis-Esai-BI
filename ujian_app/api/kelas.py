from flask.views import MethodView
from flask import json
from ujian_app.utils import AlchemyEncoder
from ujian_app.models import Kelas

class KelasAPI(MethodView):
    
    def get(self):
        list_kelas = Kelas.query.all()
        return json.dumps(list_kelas, cls=AlchemyEncoder), 200

    def post(self):
        return 'post kelas'
    
    def put(self):
        return 'put kelas'