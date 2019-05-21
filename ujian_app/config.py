from configparser import ConfigParser

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

        config['ENV'] = parser['APP']['ENV']
        config['DEBUG'] = parser['APP']['DEBUG']

        config['SQLALCHEMY_DATABASE_URI'] = parser['DB']['URI']
        config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

        config['CELERY_BROKER_URL'] = parser['CELERY']['BROKER_URL']
        config['CELERY_RESULT_BACKEND'] = parser['CELERY']['RESULT_BACKEND']
        
        Config._config = config

        return Config._config