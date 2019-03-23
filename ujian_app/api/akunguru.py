from flask.views import MethodView
from ujian_app.utils import json_output

class AkunGuruAPI(MethodView):
    
    @json_output
    def get(self):
        return {'message':'get akun guru', 'status':'sukses'}

    def post(self):
        return 'post akun guru'
    
    def put(self):
        return 'put akun guru'