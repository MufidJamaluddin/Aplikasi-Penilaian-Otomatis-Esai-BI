from .tfdata import TfMaxDataStore, DocNumberTermDataStore, RfMaxDataStore
from .ntfrf import NtfRfLabeledWeighter, NtfRfUnlabeledWeighter

class NtfRfWeighterFactory(object):

    def __init__(self, max_tf_data: TfMaxDataStore, doc_rf_term_data: DocNumberTermDataStore | RfMaxDataStore):
        self.max_tf_data = max_tf_data
        self.doc_rf_term_data = doc_rf_term_data

    def create(self, training=True):
        '''
        training : data yang dinilai guru atau bukan
        
        '''
        if training:
            ntf_rf_weighter = NtfRfLabeledWeighter(self.max_tf_data, self.doc_rf_term_data)
        else:
            ntf_rf_weighter = NtfRfUnlabeledWeighter(self.max_tf_data, self.doc_rf_term_data)
        return ntf_rf_weighter