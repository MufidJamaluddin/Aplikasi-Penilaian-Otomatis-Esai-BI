from .tfdata import TfMaxDataStore, DocNumberTermDataStore
from .ntfrf import NtfRfWeighter

class NtfRfWeighterFactory(object):

    def __init__(self, max_tf_data: TfMaxDataStore, doc_term_data: DocNumberTermDataStore):
        self.max_tf_data = max_tf_data
        self.doc_term_data = doc_term_data

    def create(self):
        ntf_rf_weighter = NtfRfWeighter(self.max_tf_data, self.doc_term_data)
        return ntf_rf_weighter