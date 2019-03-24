# coding: utf-8
from sqlalchemy import CHAR, Column, Date, Float, ForeignKey, ForeignKeyConstraint, Index, String, Table, Text, Time
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.mysql import BIGINT, INTEGER, SMALLINT

# flask-sqlacodegen --outfile models.py 
# mysql://ujian_app_user:majubersama@localhost:3306/ujian_app
# Hrs Di Ubah 

from . import db

Base = db.Model
metadata = Base.metadata


class Akun(Base):
    __tablename__ = 'akun'

    username = Column(String(20), primary_key=True)
    kode_guru = Column(ForeignKey('guru.kode_guru'), index=True)
    nis = Column(ForeignKey('siswa.nis'), index=True)
    password = Column(String(40))
    role = Column(CHAR(1))

    guru = relationship('Guru', primaryjoin='Akun.kode_guru == Guru.kode_guru')
    siswa = relationship('Siswa', primaryjoin='Akun.nis == Siswa.nis')


t_ditujukkanuntuk = Table(
    'ditujukkanuntuk', metadata,
    Column('kode_kelas', ForeignKey('kelas.kode_kelas'), primary_key=True, nullable=False),
    Column('kode_ujian', ForeignKey('ujian.kode_ujian'), primary_key=True, nullable=False, index=True)
)


class FiturTerm(Base):
    __tablename__ = 'fitur_term'
    __table_args__ = (
        ForeignKeyConstraint(['kode_soal', 'term'], ['stateterm.kode_soal', 'stateterm.term']),
        Index('FK_terhadap_term', 'kode_soal', 'term')
    )

    kode_jawaban = Column(ForeignKey('jawaban.kode_jawaban'), primary_key=True, nullable=False, index=True)
    kode_soal = Column(INTEGER(11), primary_key=True, nullable=False)
    term = Column(String(100), primary_key=True, nullable=False)
    tf = Column(INTEGER(11))
    ntf_rf = Column(Float)

    jawaban = relationship('Jawaban')
    stateterm = relationship('Stateterm')


class Guru(Base):
    __tablename__ = 'guru'

    kode_guru = Column(CHAR(3), primary_key=True)
    username = Column(ForeignKey('akun.username'), nullable=False, index=True)
    nama_guru = Column(String(100))

    akun = relationship('Akun', primaryjoin='Guru.username == Akun.username')
    kelas = relationship('Kelas', secondary='mengajardi')
    matapelajaran = relationship('Matapelajaran', secondary='mengajarmapel')


class Jawaban(Base):
    __tablename__ = 'jawaban'

    kode_jawaban = Column(BIGINT(20), primary_key=True)
    kode_soal = Column(ForeignKey('soal.kode_soal'), nullable=False, index=True)
    nis = Column(ForeignKey('siswa.nis'), nullable=False, index=True)
    skor = Column(INTEGER(11))
    huruf = Column(CHAR(1))
    esai = Column(Text)

    soal = relationship('Soal')
    siswa = relationship('Siswa')


class Kelas(Base):
    __tablename__ = 'kelas'

    kode_kelas = Column(SMALLINT(6), primary_key=True)
    nama_kelas = Column(String(20))

    ujian = relationship('Ujian', secondary='ditujukkanuntuk')


class Matapelajaran(Base):
    __tablename__ = 'matapelajaran'

    kode_matapelajaran = Column(INTEGER(11), primary_key=True)
    nama_matapelajaran = Column(String(50))


t_mengajardi = Table(
    'mengajardi', metadata,
    Column('kode_guru', ForeignKey('guru.kode_guru'), primary_key=True, nullable=False),
    Column('kode_kelas', ForeignKey('kelas.kode_kelas'), primary_key=True, nullable=False, index=True)
)


t_mengajarmapel = Table(
    'mengajarmapel', metadata,
    Column('kode_matapelajaran', ForeignKey('matapelajaran.kode_matapelajaran'), primary_key=True, nullable=False),
    Column('kode_guru', ForeignKey('guru.kode_guru'), primary_key=True, nullable=False, index=True)
)


class MengikutiUjian(Base):
    __tablename__ = 'mengikuti_ujian'

    nis = Column(ForeignKey('siswa.nis'), primary_key=True, nullable=False)
    kode_ujian = Column(ForeignKey('ujian.kode_ujian'), primary_key=True, nullable=False, index=True)
    nilai = Column(INTEGER(11))
    waktu_pelaksanaan = Column(Date)

    ujian = relationship('Ujian')
    siswa = relationship('Siswa')


class Siswa(Base):
    __tablename__ = 'siswa'

    nis = Column(CHAR(20), primary_key=True)
    kode_kelas = Column(ForeignKey('kelas.kode_kelas'), nullable=False, index=True)
    username = Column(ForeignKey('akun.username'), nullable=False, index=True)
    nama_siswa = Column(String(100))

    kela = relationship('Kelas')
    akun = relationship('Akun', primaryjoin='Siswa.username == Akun.username')


class Soal(Base):
    __tablename__ = 'soal'

    kode_soal = Column(INTEGER(11), primary_key=True)
    kode_ujian = Column(ForeignKey('ujian.kode_ujian'), nullable=False, index=True)
    teks_soal = Column(Text)

    ujian = relationship('Ujian')


class Stateterm(Base):
    __tablename__ = 'stateterm'

    kode_soal = Column(ForeignKey('soal.kode_soal'), primary_key=True, nullable=False)
    term = Column(String(100), primary_key=True, nullable=False)
    maks_tf_A = Column(INTEGER(11))
    maks_tf_B = Column(INTEGER(11))
    maks_tf_C = Column(INTEGER(11))
    maks_tf_D = Column(INTEGER(11))

    soal = relationship('Soal')


class Ujian(Base):
    __tablename__ = 'ujian'

    kode_ujian = Column(INTEGER(11), primary_key=True)
    kode_guru = Column(ForeignKey('guru.kode_guru'), nullable=False, index=True)
    kode_matapelajaran = Column(ForeignKey('matapelajaran.kode_matapelajaran'), nullable=False, index=True)
    nama_ujian = Column(String(50))
    durasi = Column(Time)

    guru = relationship('Guru')
    matapelajaran = relationship('Matapelajaran')
