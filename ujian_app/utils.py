from flask import jsonify

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