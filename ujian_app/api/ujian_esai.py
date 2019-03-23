from flask.views import MethodView

class UjianEsaiAPI(MethodView):
    
    def get(self):
        return 'get ujian esai'

    def post(self):
        return 'post ujian esai'
    
    def put(self):
        return 'put ujian esai'