from ujian_app import make_app

config_file = 'config.ini'
app = make_app(config_file)
app.app_context().push()
