from flask.views import MethodView
from ujian_app.utils import json_output

class MatapelajaranAPI(MethodView):
    
    @json_output
    def get(self):
        return ['Matematika', 'Fisika', 'Kimia', 'Biologi', 'Sejarah', 'Bahasa Indonesia', 'Pendidikan Agama']

    def post(self):
        return 'post matapelajaran'
    
    def put(self):
        return 'put matapelajaran'