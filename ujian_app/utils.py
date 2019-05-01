from flask import jsonify, json
from sqlalchemy.ext.declarative import DeclarativeMeta

class AlchemyEncoder(json.JSONEncoder):

    def default(self, obj):
        if isinstance(obj.__class__, DeclarativeMeta):
            # an SQLAlchemy class
            fields = {}
            for field in [x for x in dir(obj) if not x.startswith('_') and x != 'metadata']:
                data = obj.__getattribute__(field)
                try:
                    json.dumps(data) # this will fail on non-encodable values, like other classes
                    fields[field] = data
                except TypeError:
                    fields[field] = None
            # a json-encodable dict
            return fields

        return super.JSONEncoder.default(self, obj)

def json_output(func):
    """
    Wrapper untuk Return JSON
    """
    def wrapper(*args, **kwargs):
        output = func(*args, **kwargs)
        if isinstance(output, dict) or isinstance(output, list):
            return jsonify(output)
        else:
            return jsonify(list(output))

    return wrapper