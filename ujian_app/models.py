from sqlalchemy import ( 
    Boolean, Column, Date, DateTime, Float, 
    ForeignKey, ForeignKeyConstraint, Index, 
    Integer, SmallInteger, BigInteger, String, 
    Table, Text, Time, text
)
from sqlalchemy.orm import relationship

# Dev Command: 
# flask-sqlacodegen --outfile models.py mysql://ujian_app_user:majubersama@localhost:3306/ujian_app
# Hrs Di Ubah 

from . import db

Base = db.Model
metadata = Base.metadata


class Akun(Base):
    '''
    Akun dari pengguna aplikasi ini
    '''
    __tablename__ = 'akun'

    nama = Column(String(50))
    username = Column(String(30), primary_key=True)
    password = Column(String(40))
    role = Column(String(6))


class Guru(Base):
    __tablename__ = 'guru'

    idguru = Column(Integer, primary_key=True)
    nip = Column(String(20))
    nuptk = Column(String(20))
    namaGuru = Column(String(50), nullable=False)
    username = Column(String(30), nullable=False, unique=True)
    password = Column(String(40), nullable=False)
    flag = Column(String(1), server_default=text("'0'"))

    listpengampu = relationship('Pengampu')
    listujian = relationship('Ujian')


class Kelas(Base):
    __tablename__ = 'kelas'

    idkelas = Column(Integer, primary_key=True, autoincrement=True)
    namaKelas = Column(String(12), nullable=False)
    flag = Column(String(1), server_default=text("'0'"))

    siswa = relationship('Siswa', lazy='select')


class Matapelajaran(Base):
    __tablename__ = 'matapelajaran'

    idmapel = Column(Integer, primary_key=True)
    namaMapel = Column(String(30), nullable=False)
    KKM = Column(String(2), nullable=False)
    flag = Column(String(1), server_default=text("'0'"))


class Staftu(Base):
    __tablename__ = 'staftu'

    nama = Column(String(50), nullable=False)
    username = Column(String(30), primary_key=True)
    password = Column(String(40), nullable=False)



class Pengampu(Base):
    __tablename__ = 'pengampu'

    idpengampu = Column(Integer, primary_key=True)
    idmapel = Column(ForeignKey('matapelajaran.idmapel'), nullable=False, index=True)
    idkelas = Column(ForeignKey('kelas.idkelas'), nullable=False, index=True)
    idguru = Column(ForeignKey('guru.idguru'), nullable=False, index=True)
    flag = Column(String(1), server_default=text("'0'"))

    guru = relationship('Guru')
    kelas = relationship('Kelas')
    matapelajaran = relationship('Matapelajaran')


class Siswa(Base):
    __tablename__ = 'siswa'

    nis = Column(String(10), primary_key=True)
    idkelas = Column(ForeignKey('kelas.idkelas'), nullable=False, index=True)
    nama = Column(String(20), nullable=False)
    angkatan = Column(String(4), nullable=False)
    password = Column(String(40), nullable=False)
    flag = Column(String(1), server_default=text("'0'"))

    kelas = relationship('Kelas')
    daftarnilaiujian = relationship('DaftarNilaiUjian')
    jawaban = relationship('Jawaban')


class Ujian(Base):
    __tablename__ = 'ujian'

    idujian = Column(Integer, primary_key=True)
    idguru = Column(ForeignKey('guru.idguru'), nullable=False, index=True)
    idmapel = Column(ForeignKey('matapelajaran.idmapel'), nullable=False, index=True)
    namaUjian = Column(String(30), nullable=False)
    jumlahSoal = Column(SmallInteger, nullable=False)
    durasi = Column(SmallInteger)
    status_ujian = Column(String(1), server_default=text("'0'"))
    flag = Column(String(1), server_default=text("'0'"))

    guru = relationship('Guru')
    matapelajaran = relationship('Matapelajaran')
    listsoal = relationship('Soal')


class DaftarNilaiUjian(Base):
    __tablename__ = 'daftarnilaiujian'

    iddaftarnilai = Column(BigInteger, primary_key=True)
    nis = Column(ForeignKey('siswa.nis'), nullable=False, index=True)
    idujian = Column(ForeignKey('ujian.idujian'), nullable=False, index=True)
    nilai = Column(String(3))
    namaKelas = Column(String(12))
    flag = Column(String(1), server_default=text("'0'"))

    ujian = relationship('Ujian')
    siswa = relationship('Siswa')


class PelaksanaanUjian(Base):
    __tablename__ = 'pelaksanaanujian'

    idpelaksanaan = Column(BigInteger, primary_key=True)
    idkelas = Column(ForeignKey('kelas.idkelas'), nullable=False, index=True)
    idujian = Column(ForeignKey('ujian.idujian'), nullable=False, index=True)
    waktu_mulai = Column(DateTime)
    status_pelaksanaan = Column(String(1), server_default=text("'0'"))
    status_penilaian = Column(String(1), server_default=text("'0'"))
    progress_penilaian = Column(String(3))
    pesan_progress_penilaian = Column(String(50))
    flag = Column(String(1), server_default=text("'0'"))

    kelas = relationship('Kelas')
    ujian = relationship('Ujian')


class Soal(Base):
    __tablename__ = 'soal'

    idsoal = Column(BigInteger, primary_key=True)
    idujian = Column(ForeignKey('ujian.idujian'), nullable=False, index=True)
    soalEsai = Column(Text, nullable=False)
    skorMin = Column(String(3))
    skorMax = Column(String(3))
    kompetensiDasar = Column(String(100))
    materiPokok = Column(String(100))
    flag = Column(String(1), server_default=text("'0'"))

    ujian = relationship('Ujian')


class Jawaban(Base):
    __tablename__ = 'jawaban'

    idjawaban = Column(BigInteger, primary_key=True)
    idsoal = Column(ForeignKey('soal.idsoal'), nullable=False, index=True)
    nis = Column(ForeignKey('siswa.nis'), nullable=False, index=True)
    jawabanEsai = Column(Text)
    skorHuruf = Column(String(1))
    skorAngka = Column(SmallInteger)
    nilaiOtomatis = Column(SmallInteger)
    namaKelas = Column(String(12))
    panjangVektor = Column(Float)

    soal = relationship('Soal')
    siswa = relationship('Siswa')


class FiturObjekPenilaian(Base):
    __tablename__ = 'fiturobjekpenilaian'

    idjawaban = Column(ForeignKey('jawaban.idjawaban'), primary_key=True, nullable=False)
    term = Column(String(50), primary_key=True, nullable=False)
    tf = Column(Float)
    ntf_rf = Column(Float)

    jawaban = relationship('Jawaban')


class FiturReferensiPenilaian(Base):
    __tablename__ = 'fiturreferensipenilaian'

    idjawaban = Column(ForeignKey('jawaban.idjawaban'), primary_key=True, nullable=False)
    skorHuruf = Column(String(1), primary_key=True, nullable=False)
    term = Column(String(1), primary_key=True, nullable=False)
    tf = Column(Float)
    rf = Column(Float)
    ntf_rf = Column(Float)

    jawaban = relationship('Jawaban')