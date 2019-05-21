/*==============================================================*/
/* DBMS name:      MySQL 5.0                                    */
/* Created on:     20/05/2019 20:30:26                          */
/*==============================================================*/

drop table if exists StafTU;

drop table if exists DaftarNilaiUjian;

drop table if exists FiturObjekPenilaian;

drop table if exists FiturReferensiPenilaian;

drop table if exists Guru;

drop table if exists Jawaban;

drop table if exists Kelas;

drop table if exists Matapelajaran;

drop table if exists PelaksanaanUjian;

drop table if exists Pengampu;

drop table if exists Siswa;

drop table if exists Soal;

drop table if exists Ujian;

/*==============================================================*/
/* Table: StafTU                                                */
/* Tambahan u/ Pengelolaan Data Master				*/
/*==============================================================*/
CREATE TABLE StafTU (
  nama varchar(50) NOT NULL,
  username varchar(30) NOT NULL,
  password varchar(40) NOT NULL,
  primary key (username)
) ENGINE=MyISAM;

/*==============================================================*/
/* Table: DaftarNilaiUjian                                      */
/*==============================================================*/
create table DaftarNilaiUjian
(
   iddaftarnilai        bigint not null auto_increment,
   nis                  char(10) not null,
   idujian              int not null,
   nilai                char(3),
   namaKelas            varchar(12),
   flag                 bool default 1,
   primary key (iddaftarnilai)
);

/*==============================================================*/
/* Table: FiturObjekPenilaian                                   */
/*==============================================================*/
create table FiturObjekPenilaian
(
   idjawaban            bigint not null,
   term                 varchar(50) not null,
   tf                   float,
   ntf_rf               float,
   primary key (idjawaban, term)
);

/*==============================================================*/
/* Table: FiturReferensiPenilaian                               */
/*==============================================================*/
create table FiturReferensiPenilaian
(
   idjawaban            bigint not null,
   skorHuruf            char(1) not null,
   term                 char(50) not null,
   tf                   float,
   rf                   float,
   ntf_rf               float,
   primary key (idjawaban, skorHuruf, term)
);

/*==============================================================*/
/* Table: Guru                                                  */
/*==============================================================*/
create table Guru
(
   idguru               int not null auto_increment,
   nip                  varchar(20),
   nuptk                varchar(20),
   namaGuru             varchar(50) not null,
   username             varchar(30) not null,
   password             varchar(40) not null,
   flag                 bool default 1,
   primary key (idguru)
);

/*==============================================================*/
/* Table: Jawaban                                               */
/*==============================================================*/
create table Jawaban
(
   idjawaban            bigint not null auto_increment,
   idsoal               bigint not null,
   nis                  char(10) not null,
   jawabanEsai          text,
   skorHuruf            char(1),
   skorAngka            char(3),
   nilaiOtomatis        bool,
   namaKelas            varchar(12),
   panjangVektor        float,
   primary key (idjawaban)
);

/*==============================================================*/
/* Table: Kelas                                                 */
/*==============================================================*/
create table Kelas
(
   idkelas              int not null auto_increment,
   namaKelas            varchar(12) not null,
   flag                 bool default 1,
   primary key (idkelas)
);

/*==============================================================*/
/* Table: Matapelajaran                                         */
/*==============================================================*/
create table Matapelajaran
(
   idmapel              int not null auto_increment,
   namaMapel            varchar(30) not null,
   KKM                  char(2) not null,
   flag                 bool default 1,
   primary key (idmapel)
);

/*==============================================================*/
/* Table: PelaksanaanUjian                                      */
/*==============================================================*/
create table PelaksanaanUjian
(
   idpelaksanaan        bigint not null auto_increment,
   idkelas              int not null,
   idujian              int not null,
   waktu_mulai          datetime,
   status_pelaksanaan   char(1) default '0',
   status_penilaian     char(1) default '0',
   progress_penilaian   char(3),
   pesan_progress_penilaian varchar(50),
   flag                 bool,
   primary key (idpelaksanaan)
);

/*==============================================================*/
/* Table: Pengampu                                              */
/*==============================================================*/
create table Pengampu
(
   idpengampu           int not null auto_increment,
   idmapel              int not null,
   idkelas              int not null,
   idguru               int not null,
   flag                 bool default 1,
   primary key (idpengampu)
);

/*==============================================================*/
/* Table: Siswa                                                 */
/*==============================================================*/
create table Siswa
(
   nis                  char(10) not null,
   idkelas              int not null,
   nama                 varchar(20) not null,
   angkatan             char(4) not null,
   password             varchar(40) not null,
   flag                 bool default 1,
   primary key (nis)
);

/*==============================================================*/
/* Table: Soal                                                  */
/*==============================================================*/
create table Soal
(
   idsoal               bigint not null auto_increment,
   idujian              int not null,
   soalEsai             text not null,
   skorMin              char(3),
   skorMax              char(3),
   kompetensiDasar      varchar(100),
   materiPokok          varchar(100),
   flag                 bool default 1,
   primary key (idsoal)
);

/*==============================================================*/
/* Table: Ujian                                                 */
/*==============================================================*/
create table Ujian
(
   idujian              int not null auto_increment,
   idguru               int not null,
   idmapel              int not null,
   namaUjian            varchar(30) not null,
   jumlahSoal           smallint not null,
   durasi               smallint,
   status_ujian         char(1) default '0',
   flag                 bool default 1,
   primary key (idujian)
);


/*==============================================================*/
/* View: Akun                                                   */
/*==============================================================*/
CREATE VIEW Akun  
AS  
   select namaGuru AS nama, username, password,'guru' AS role from Guru where flag=1
   union all
   select nama, nis AS username, password, 'siswa' AS role from Siswa where flag=1
   union all
   select nama, username, password, 'staftu' AS role from StafTU ;



/*==============================================================*/
/* Foreign Key                                                  */
/*==============================================================*/

alter table DaftarNilaiUjian add constraint FK_MEMILIKI foreign key (nis)
      references Siswa (nis) on delete restrict on update restrict;

alter table DaftarNilaiUjian add constraint FK_MENDAPATKAN foreign key (idujian)
      references Ujian (idujian) on delete restrict on update restrict;

alter table FiturObjekPenilaian add constraint FK_SEBAGAI_OBJ_PENILAIAN foreign key (idjawaban)
      references Jawaban (idjawaban) on delete restrict on update restrict;

alter table FiturReferensiPenilaian add constraint FK_SEBAGAI_REF_PENILAIAN foreign key (idjawaban)
      references Jawaban (idjawaban) on delete restrict on update restrict;

alter table Jawaban add constraint FK_DIJAWAB_DENGAN foreign key (idsoal)
      references Soal (idsoal) on delete restrict on update restrict;

alter table Jawaban add constraint FK_MENGISI foreign key (nis)
      references Siswa (nis) on delete restrict on update restrict;

alter table PelaksanaanUjian add constraint FK_DILAKSANAAN_DI foreign key (idkelas)
      references Kelas (idkelas) on delete restrict on update restrict;

alter table PelaksanaanUjian add constraint FK_DILAKSANAKAN_PADA foreign key (idujian)
      references Ujian (idujian) on delete restrict on update restrict;

alter table Pengampu add constraint FK_MELAKSANAKAN_TUGAS foreign key (idguru)
      references Guru (idguru) on delete restrict on update restrict;

alter table Pengampu add constraint FK_MENGAJAR foreign key (idmapel)
      references Matapelajaran (idmapel) on delete restrict on update restrict;

alter table Pengampu add constraint FK_MENGAJAR_DI foreign key (idkelas)
      references Kelas (idkelas) on delete restrict on update restrict;

alter table Siswa add constraint FK_MENGIKUTI foreign key (idkelas)
      references Kelas (idkelas) on delete restrict on update restrict;

alter table Soal add constraint FK_TERDIRI_DARI foreign key (idujian)
      references Ujian (idujian) on delete restrict on update restrict;

alter table Ujian add constraint FK_MEMBUAT foreign key (idguru)
      references Guru (idguru) on delete restrict on update restrict;

alter table Ujian add constraint FK_UNTUK_MEMENUHI foreign key (idmapel)
      references Matapelajaran (idmapel) on delete restrict on update restrict;


/*==============================================================*/
/* Unique Key                                                   */
/*==============================================================*/
ALTER TABLE Guru ADD UNIQUE(username);