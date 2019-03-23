from flask.views import MethodView

class AuthAPI(MethodView):
    
    def get(self):
        return 'get akun auth'

    def post(self):
        return 'post akun auth'
    
    def put(self):
        return 'put akun auth'