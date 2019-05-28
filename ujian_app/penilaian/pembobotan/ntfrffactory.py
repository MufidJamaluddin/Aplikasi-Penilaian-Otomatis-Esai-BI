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
        self.__docnum_repository = DocNumRepository()
        self.__ntfrf_repository = NtfRfRepository()
        self.__ntfrflabelled = None
        self.__ntfrfunlabelled = None
    
    def __del__(self):
        del self.__docnum_repository
        del self.__ntfrf_repository
        del self.__ntfrflabelled
        del self.__ntfrfunlabelled    
    
    def create(self, training=True):
        if training:
            if self.__ntfrflabelled is None:
                self.__ntfrflabelled = NtfRfLabeledWeighter(
                    self.__docnum_repository, self.__ntfrf_repository
                )
            return self.__ntfrflabelled
        else:
            if self.__ntfrfunlabelled is None:
                self.__ntfrfunlabelled = NtfRfUnlabeledWeighter(
                    self.__docnum_repository, self.__ntfrf_repository
                )
            return self.__ntfrfunlabelled
