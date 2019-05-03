# coding: utf-8
from sqlalchemy import CHAR, Column, Date, Float, ForeignKey, ForeignKeyConstraint, Index, Integer, SmallInteger, String, Table, Text, Time
from sqlalchemy.orm import relationship

# Dev Command: 
# flask-sqlacodegen --outfile models.py mysql://ujian_app_user:majubersama@localhost:3306/ujian_app
# Hrs Di Ubah 

from . import db

Base = db.Model
metadata = Base.metadata

class Daftarnilaiujian(Base):
    __tablename__ = 'daftarnilaiujian'

    nis = Column(ForeignKey('siswa.nis'), primary_key=True, nullable=False)
    idujian = Column(ForeignKey('ujian.idujian'), primary_key=True, nullable=False, index=True)
    nilai = Column(String(3))

    ujian = relationship('Ujian', primaryjoin='Daftarnilaiujian.idujian == Ujian.idujian', backref='daftarnilaiujians')
    siswa = relationship('Siswa', primaryjoin='Daftarnilaiujian.nis == Siswa.nis', backref='daftarnilaiujians')


class Fiturreferensipenilaian(Base):
    __tablename__ = 'fiturreferensipenilaian'
    __table_args__ = (
        ForeignKeyConstraint(['term', 'idsoal'], ['term.term', 'term.idsoal']),
        Index('FK_MEMILIKI_BANYAK', 'term', 'idsoal')
    )

    idjawaban = Column(ForeignKey('jawaban.idjawaban'), primary_key=True, nullable=False)
    skorHuruf = Column(String(1), primary_key=True, nullable=False)
    term = Column(String(50), primary_key=True, nullable=False)
    idsoal = Column(Integer, primary_key=True, nullable=False)
    tf = Column(Float)
    ntf_rf = Column(Float)

    jawaban = relationship('Jawaban', primaryjoin='Fiturreferensipenilaian.idjawaban == Jawaban.idjawaban', backref='fiturreferensipenilaians')
    term1 = relationship('Term', primaryjoin='and_(Fiturreferensipenilaian.term == Term.term, Fiturreferensipenilaian.idsoal == Term.idsoal)', backref='fiturreferensipenilaians')


class Guru(Base):
    __tablename__ = 'guru'

    idguru = Column(Integer, primary_key=True, autoincrement=True)
    nip = Column(String(20))
    nuptk = Column(String(20))
    namaGuru = Column(String(50))
    username = Column(String(30))
    password = Column(String(40))


class Jawaban(Base):
    __tablename__ = 'jawaban'

    idjawaban = Column(Integer, primary_key=True, autoincrement=True)
    idsoal = Column(ForeignKey('soal.idsoal'), nullable=False, index=True)
    nis = Column(ForeignKey('siswa.nis'), nullable=False, index=True)
    jawabanEsai = Column(Text)
    skorAngka = Column(String(3))

    soal = relationship('Soal', primaryjoin='Jawaban.idsoal == Soal.idsoal', backref='jawabans')
    siswa = relationship('Siswa', primaryjoin='Jawaban.nis == Siswa.nis', backref='jawabans')


class Kelas(Base):
    __tablename__ = 'kelas'

    idkelas = Column(Integer, primary_key=True, autoincrement=True)
    namaKelas = Column(String(12))


class Matapelajaran(Base):
    __tablename__ = 'matapelajaran'

    idmapel = Column(Integer, primary_key=True, autoincrement=True)
    namaMapel = Column(String(30))
    KKM = Column(String(2))


class Pelaksanaanujian(Base):
    __tablename__ = 'pelaksanaanujian'

    idkelas = Column(ForeignKey('kelas.idkelas'), primary_key=True, nullable=False)
    idujian = Column(ForeignKey('ujian.idujian'), primary_key=True, nullable=False, index=True)
    tanggal_mulai = Column(Date)
    status_pelaksanaan = Column(String(1))
    status_penilaian = Column(String(1))
    progress_penilaian = Column(String(3))

    kelas = relationship('Kelas', primaryjoin='Pelaksanaanujian.idkelas == Kelas.idkelas', backref='pelaksanaanujians')
    ujian = relationship('Ujian', primaryjoin='Pelaksanaanujian.idujian == Ujian.idujian', backref='pelaksanaanujians')


class Pengampu(Base):
    __tablename__ = 'pengampu'

    idpengampu = Column(Integer, primary_key=True, autoincrement=True)
    idmapel = Column(ForeignKey('matapelajaran.idmapel'), nullable=False, index=True)
    idkelas = Column(ForeignKey('kelas.idkelas'), nullable=False, index=True)
    idguru = Column(ForeignKey('guru.idguru'), nullable=False, index=True)

    guru = relationship('Guru', primaryjoin='Pengampu.idguru == Guru.idguru', backref='pengampus')
    kelas = relationship('Kelas', primaryjoin='Pengampu.idkelas == Kelas.idkelas', backref='pengampus')
    matapelajaran = relationship('Matapelajaran', primaryjoin='Pengampu.idmapel == Matapelajaran.idmapel', backref='pengampus')


class Siswa(Base):
    __tablename__ = 'siswa'

    nis = Column(String(10), primary_key=True)
    idkelas = Column(ForeignKey('kelas.idkelas'), nullable=False, index=True)
    nama = Column(String(20))
    password = Column(String(40))

    kelas = relationship('Kelas', primaryjoin='Siswa.idkelas == Kelas.idkelas', backref='siswas')


class Soal(Base):
    __tablename__ = 'soal'

    idsoal = Column(Integer, primary_key=True, autoincrement=True)
    idujian = Column(ForeignKey('ujian.idujian'), nullable=False, index=True)
    soalEsai = Column(Text)
    skorMin = Column(String(3))
    skorMax = Column(String(3))
    kompetensiDasar = Column(String(100))
    materiPokok = Column(String(100))

    ujian = relationship('Ujian', primaryjoin='Soal.idujian == Ujian.idujian', backref='soals')


class Term(Base):
    __tablename__ = 'term'

    idsoal = Column(ForeignKey('soal.idsoal'), primary_key=True, nullable=False, index=True)
    term = Column(String(50), primary_key=True, nullable=False)
    max_tf = Column(Float)
    max_rf_A = Column(Float)
    max_rf_B = Column(Float)
    max_rf_C = Column(Float)
    max_rf_D = Column(Float)

    soal = relationship('Soal', primaryjoin='Term.idsoal == Soal.idsoal', backref='terms')


class Ujian(Base):
    __tablename__ = 'ujian'

    idujian = Column(Integer, primary_key=True)
    idpengampu = Column(ForeignKey('pengampu.idpengampu'), nullable=False, index=True)
    namaUjian = Column(String(30))
    jumlahSoal = Column(SmallInteger)
    durasi = Column(Time)

    pengampu = relationship('Pengampu', primaryjoin='Ujian.idpengampu == Pengampu.idpengampu', backref='ujians')
    pelaksanaan_ujian = relationship('Pelaksanaanujian', primaryjoin='Ujian.idujian == Pelaksanaanujian.idujian', backref='ujians')