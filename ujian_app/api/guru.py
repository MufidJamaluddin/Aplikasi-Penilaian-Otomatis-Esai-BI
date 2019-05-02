from flask.views import MethodView
from ujian_app.utils import json_output

class GuruAPI(MethodView):
    
def __init__(self):
        self.repository = GuruRepository()

    def get(self):
        list_guru = self.repository.findAll()
        dt_guru = json.dumps(list_guru, cls=AlchemyEncoder)
        return json.dumps({'list': dt_guru }), 200, {'Content-Type': 'application/json'}

    def post(self):
        data_guru = request.get_json()
        nip = data_guru['nip']
        nuptk = data_siswa['nuptk']
        namaGuru = data_siswa['namaGuru']
        username = data_guru['username']
        password = data_guru['password']
        self.repository.save(nip, nuptk, namaGuru, username, password)

        list_guru = self.repository.findAll()
        dt_guru = json.dumps(list_guru, cls=AlchemyEncoder)
        return json.dumps({'list': dt_guru }), 201, {'Content-Type': 'application/json'}
    
    def put(self, idguru):
        data_guru = request.get_json()
        nip = data_guru['nip']
        nuptk = data_siswa['nuptk']
        namaGuru = data_siswa['namaGuru']
        username = data_guru['username']
        password = data_guru['password']
        self.repository.update(nip, nuptk, namaGuru, username, password)

        list_guru = self.repository.findAll()
        dt_guru = json.dumps(list_guru, cls=AlchemyEncoder)
        return json.dumps({'list': dt_guru }), 301, {'Content-Type': 'application/json'}
    
    def delete(self, idguru):
        self.repository.delete(idguru)

        list_guru = self.repository.findAll()
        dt_guru = json.dumps(list_guru, cls=AlchemyEncoder)
        return json.dumps({'list': dt_guru }), 301, {'Content-Type': 'application/json'}
