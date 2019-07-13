from ujian_app import make_app
from celery import current_app
from celery.bin import worker

if __name__ == "__main__":

    app = make_app()
    app.app_context().push()

    celery_app = current_app._get_current_object()
    worker = worker.worker(app=celery_app)
    options = {
        'loglevel':'INFO',
        'traceback': True,
        'task_always_eager': True,
        'pool': 'solo'
    }
    worker.run(**options)