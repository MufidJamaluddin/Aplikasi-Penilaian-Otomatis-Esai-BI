from flask.views import MethodView
from ujian_app.utils import json_output

class KelasAPI(MethodView):
    
    @json_output
    def get(self):
        return ['IPA-1', 'IPA-2', 'IPA-3', 'IPA-4', 'IPA-5', 'IPS-1', 'IPS-2', 'IPS-3']

    def post(self):
        return 'post kelas'
    
    def put(self):
        return 'put kelas'