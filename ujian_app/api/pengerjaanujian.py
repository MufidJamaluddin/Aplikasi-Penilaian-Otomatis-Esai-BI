from flask.views import MethodView

class PengerjaanUjianAPI(MethodView):
    
    def get(self):
        return 'get pengerjaanujian'

    def post(self):
        return 'post pengerjaanujian'
    
    def put(self):
        return 'put pengerjaanujian'