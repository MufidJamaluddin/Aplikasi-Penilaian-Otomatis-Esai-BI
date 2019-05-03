from configparser import ConfigParser

def get_config():
    config = {}

    parser = ConfigParser()
    parser.read('config.ini')

    parser.sections()

    config['ENV'] = parser['APP']['ENV']
    config['DEBUG'] = parser['APP']['DEBUG']
    config['SQLALCHEMY_DATABASE_URI'] = parser['DB']['URI']

    return config