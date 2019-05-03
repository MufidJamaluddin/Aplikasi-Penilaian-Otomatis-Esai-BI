from flask.views import MethodView
import json

class AuthAPI(MethodView):
    
    def get(self):
        role = {"role": "staftu"}
        return json.dumps(role), 200

    def post(self):
        return 'post akun auth'
    
    def put(self):
        return 'put akun auth'