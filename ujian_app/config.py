from configparser import ConfigParser
from sqlalchemy.pool import QueuePool

class Config:
    
    _config = None

    @staticmethod
    def get_config():
        '''
        Membaca File Konfigurasi (config.ini)
        '''
        if Config._config != None:
            return Config._config

        config = {}

        parser = ConfigParser()
        parser.read('config.ini')

        parser.sections()

        config['ENV'] = str(parser['APP']['ENV']).strip()
        config['DEBUG'] = str(parser['APP']['DEBUG']).strip() == 'True'
        config['APP_PASS_HASH'] = str(parser['APP']['PASS_HASH']).strip() == 'True'

        config['SQLALCHEMY_DATABASE_URI'] = str(parser['DB']['URI']).strip()
        config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
        config['SQLALCHEMY_ENGINE_OPTIONS'] = {
            'poolclass': QueuePool,
            'pool_size': int(parser['DB']['POOL_SIZE']),
            'pool_recycle': int(parser['DB']['POOL_RECYCLE']),
            'pool_pre_ping': str(parser['DB']['POOL_PRE_PING']).strip() == 'True'
        }

        config['CELERY_BROKER_URL'] = str(parser['CELERY']['BROKER_URL']).strip()
        config['CELERY_RESULT_BACKEND'] = str(parser['CELERY']['RESULT_BACKEND']).strip()
        
        Config._config = config

        return Config._config