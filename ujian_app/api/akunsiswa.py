from flask.views import MethodView
from ujian_app.utils import json_output

class AkunSiswaAPI(MethodView):
    
    @json_output
    def get(self):
        return {'message':'get akun siswa', 'status':'sukses'}

    def post(self):
        return 'post akun siswa'
    
    def put(self):
        return 'put akun siswa'