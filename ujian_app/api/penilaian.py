from flask.views import MethodView

class PenilaianAPI(MethodView):
    
    def get(self):
        return 'get penilaian'

    def post(self):
        return 'post penilaian'
    
    def put(self):
        return 'put penilaian'