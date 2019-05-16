from flask.views import MethodView
from ujian_app import excel
from ujian_app.models import Jawaban, db
from pyexcel import get_book

class PenilaianAPI(MethodView):
    
    def get(self):

        template = get_book(file_name="template/penilaian_manual.xlsx")

        return excel.make_response(template, "xlsx")