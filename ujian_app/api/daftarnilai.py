from flask.views import MethodView

class DaftarNilaiAPI(MethodView):
    
    def get(self):
        return 'get akun daftar nilai'

    def post(self):
        return 'post akun daftar nilai'
    
    def put(self):
        return 'put akun daftar nilai'