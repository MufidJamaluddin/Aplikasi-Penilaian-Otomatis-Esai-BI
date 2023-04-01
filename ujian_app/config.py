import os
from configparser import SafeConfigParser
from sqlalchemy.pool import QueuePool

class Config:
    
    _config = None

    @staticmethod
    def get_config(config_file = None):
        '''
        Membaca File Konfigurasi (config_file : config.ini)
        '''
        if Config._config != None:
            return Config._config

        if config_file is None:
            raise Exception('Configuration file, which is an make_app argument, is not found. Please specify it!')

        config = {}

        parser = SafeConfigParser(os.environ)
        parser.read(config_file)

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