from ujian_app import app

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def hello(path):
    return app.send_static_file('index.html')