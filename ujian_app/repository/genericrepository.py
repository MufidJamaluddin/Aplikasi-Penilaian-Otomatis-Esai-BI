from sqlalchemy import select, func
from ujian_app.models import db

class GenericRepository(object):
    '''
    Kelas generik untuk repository
    '''

    def __init__(self, model_class):
        '''
        Konstruktor
        model_class : Kelas model SQLAlchemy yang belum 
            dilakukan instansiasi
        '''
        self.model_class = model_class

    def count(self):
        '''
        Mendapatkan jumlah data
        '''
        return select([func.count()]).select_from(self.model_class)

    def find_all(self):
        '''
        Mendapatkan semua data
        '''
        return self.model_class.query.all()
    
    def find_by_id(self, primarykey):
        '''
        Mendapatkan data berdasarkan primary key
        '''
        return self.model_class.query.get(primarykey)
    
    def find_by_keys(self, **kwargs):
        '''
        Mendapatkan data berdasarkan key 
        '''
        return self.model_class.query.filter_by(**kwargs)

    def find_by_page(self, halaman, per_halaman, eksepsi = False):
        '''
        Mendapatkan data per halaman.
        halaman : Halaman mengakses situs
        per_halaman : jumlah item per halaman
        eksepsi : 
            True -> eksepsi 404 jika diluar range 
            False -> list kosong jika diluar range
        '''
        return self.model_class.query.paginate(halaman, per_halaman, eksepsi)

    def commit(self):
        db.session.commit()

    def save(self, **kwargs):
        '''
        Menyimpan satu data
        '''
        dt = self.model_class()

        for key, value in kwargs.items():
            setattr(dt, key, value)

        db.session.add(dt)
        db.session.commit()
        return dt

    def update(self, primarykey, **kwargs):
        '''
        Mengedit satu data berdasarkan primary key
        '''
        dt = self.model_class.query.get(primarykey)

        for key, value in kwargs.items():
            setattr(dt, key, value)

        db.session.merge(dt)
        db.session.commit()
    
    def delete(self, primarykey):
        '''
        Menghapus data berdasarkan primary key
        '''
        dt = self.model_class.query.get(primarykey)

        db.session.delete(dt)
        db.session.commit()