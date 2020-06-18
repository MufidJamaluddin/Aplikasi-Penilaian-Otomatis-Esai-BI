from distutils.core import setup
from Cython.Build import cythonize

setup(
    name='PenilaianUjianEsaiOtomatis',
    author='Lucky, Mufid, Nurindah',
    packages=['ujian_app'],
    long_description=open('README.md').read(),
    package_data={
        '': ['data/*.txt', 'static/*'],
    },
    ext_modules = cythonize([
        "ujian_app/*.py",
        "ujian_app/api/*.py",
        "ujian_app/penilaian/*.py",
        "ujian_app/penilaian/konversiskor/*.py",
        "ujian_app/penilaian/pembobotan/*.py",
        "ujian_app/penilaian/pemrosesan_jawaban/*.py",
        "ujian_app/penilaian/pemrosesan_teks/*.py",
        "ujian_app/repository/*.py",
    ]),
)