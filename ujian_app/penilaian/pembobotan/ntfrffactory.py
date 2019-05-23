from ujian_app.repository import DocNumRepository, NtfRfRepository
from sqlalchemy.sql.expression import and_
from .ntfrflabelled import NtfRfLabeledWeighter
from .ntfrfunlabelled import NtfRfUnlabeledWeighter

class NtfRfFactory(object):
    '''
    Kelas untuk pembobotan term
    data latih dan data uji
    pada tiap soal
    '''

    def __init__(self):
        self.docnum_repository = DocNumRepository()
        self.ntfrf_repository = NtfRfRepository()
        self.ntfrflabelled = None
        self.ntfrfunlabelled = None
    
    def create(self, training=True):
        if training:
            if self.ntfrflabelled is None:
                self.ntfrflabelled = NtfRfLabeledWeighter(
                    self.docnum_repository, self.ntfrf_repository
                )
            return self.ntfrflabelled
        else:
            if self.ntfrfunlabelled is None:
                self.ntfrfunlabelled = NtfRfUnlabeledWeighter(
                    self.docnum_repository, self.ntfrf_repository
                )
            return self.ntfrfunlabelled
