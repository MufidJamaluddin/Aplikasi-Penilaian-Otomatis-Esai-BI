from setuptools import setup, find_packages
from Cython.Build import cythonize
from vendor_build import build_py, get_ext_paths

EXCLUDE_FILES = [
]

setup(
    name='PenilaianUjianEsaiOtomatis',
    author='Lucky, Mufid, Nurindah',
    version='0.1.0',
    packages=find_packages(),
    long_description=open('README.md').read(),
    include_package_data=True,
    package_data={
        'ujian_app': ['static/*', '*.txt'],
    },
    ext_modules = cythonize(        
        get_ext_paths('ujian_app', EXCLUDE_FILES),
        compiler_directives={'language_level': 3}
    ),
    cmdclass={
        'build_py': build_py
    },
    installed_reqs=[
        'celery>=4.3,<4.4',
        'Flask>=1.0,<1.1',
        'Flask-SQLAlchemy>=2.4,<2.5',
        'PySastrawi>=1,<2',
        'pyexcel-xlsx>=0.5,<1',
        'flask-continuum>=1.0,<1.1',
        'flask-migrate>=1.0,<1.1',
    ],
)