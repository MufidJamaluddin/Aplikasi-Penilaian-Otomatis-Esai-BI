/*==============================================================*/
/* DBMS name:      MySQL 5.0                                    */
/* Created on:     08/05/2019 19:35:33                          */
/*==============================================================*/


drop table if exists DaftarNilaiUjian;

drop table if exists FiturReferensiPenilaian;

drop table if exists Guru;

drop table if exists Jawaban;

drop table if exists Kelas;

drop table if exists Matapelajaran;

drop table if exists PelaksanaanUjian;

drop table if exists Pengampu;

drop table if exists Siswa;

drop table if exists Soal;

drop table if exists Term;

drop table if exists Ujian;

/*==============================================================*/
/* Table: DaftarNilaiUjian                                      */
/*==============================================================*/
create table DaftarNilaiUjian
(
   nis                  char(10) not null,
   idujian              int not null,
   nilai                char(3),
   primary key (nis, idujian)
);

/*==============================================================*/
/* Table: FiturReferensiPenilaian                               */
/*==============================================================*/
create table FiturReferensiPenilaian
(
   idjawaban            int not null,
   skorHuruf            char(1) not null,
   term                 varchar(50) not null,
   idsoal               int not null,
   tf                   float,
   ntf_rf               float,
   primary key (idjawaban, skorHuruf, term, idsoal)
);

/*==============================================================*/
/* Table: FiturObjekPenilaian                                   */
/*==============================================================*/
create table FiturObjekPenilaian
(
   idsoal               int not null,
   idjawaban            int not null,
   term                 varchar(50) not null,
   skorHuruf            char(1),
   tf                   float,
   ntf_rf               float,
   primary key (idjawaban, term, idsoal)
);

/*==============================================================*/
/* Table: Guru                                                  */
/*==============================================================*/
create table Guru
(
   idguru               int not null auto_increment,
   nip                  varchar(20),
   nuptk                varchar(20),
   namaGuru             varchar(50),
   username             varchar(30) not null,
   password             varchar(40),
   primary key (idguru)
);

/*==============================================================*/
/* Table: Jawaban                                               */
/*==============================================================*/
create table Jawaban
(
   idjawaban            int not null auto_increment,
   idsoal               int not null,
   nis                  char(10) not null,
   jawabanEsai          text,
   skorAngka            char(3),
   nilaiOtomatis        bool,
   primary key (idjawaban)
);

/*==============================================================*/
/* Table: Kelas                                                 */
/*==============================================================*/
create table Kelas
(
   idkelas              int not null auto_increment,
   namaKelas            varchar(12),
   status_ujian         bool,
   primary key (idkelas)
);

/*==============================================================*/
/* Table: Matapelajaran                                         */
/*==============================================================*/
create table Matapelajaran
(
   idmapel              int not null auto_increment,
   namaMapel            varchar(30),
   KKM                  char(2),
   primary key (idmapel)
);

/*==============================================================*/
/* Table: PelaksanaanUjian                                      */
/*==============================================================*/
create table PelaksanaanUjian
(
   idkelas              int not null,
   idujian              int not null,
   waktu_mulai          datetime,
   status_pelaksanaan   char(1),
   status_penilaian     char(1),
   progress_penilaian   char(3),
   primary key (idkelas, idujian)
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
   primary key (idpengampu)
);

/*==============================================================*/
/* Table: Siswa                                                 */
/*==============================================================*/
create table Siswa
(
   nis                  char(10) not null,
   idkelas              int not null,
   nama                 varchar(20),
   password             varchar(40),
   primary key (nis)
);

/*==============================================================*/
/* Table: Soal                                                  */
/*==============================================================*/
create table Soal
(
   idsoal               int not null auto_increment,
   idujian              int not null,
   soalEsai             text,
   skorMin              char(3),
   skorMax              char(3),
   kompetensiDasar      varchar(100),
   materiPokok          varchar(100),
   primary key (idsoal)
);

/*==============================================================*/
/* Table: StafTU                                                */
/*==============================================================*/
CREATE TABLE `staftu` (
  `nama` varchar(50) NOT NULL,
  `username` varchar(30) NOT NULL,
  `password` varchar(40) NOT NULL,
  primary key (username)
) ENGINE=MyISAM;

/*==============================================================*/
/* Table: Term                                                  */
/*==============================================================*/
create table Term
(
   idsoal               int not null,
   term                 varchar(50) not null,
   max_tf               float,
   max_rf_A             float,
   max_rf_B             float,
   max_rf_C             float,
   max_rf_D             float,
   primary key (term, idsoal)
);

/*==============================================================*/
/* Table: Ujian                                                 */
/*==============================================================*/
create table Ujian
(
   idujian              int not null auto_increment,
   idguru               int not null,
   idmapel              int not null,
   namaUjian            varchar(30),
   jumlahSoal           smallint,
   durasi               time,
   status_ujian         char(1),
   primary key (idujian)
);

/*==============================================================*/
/* View: Akun                                                   */
/*==============================================================*/
CREATE VIEW `akun`  
AS  
   select `namaGuru` AS `nama`,`username`,`password`,'guru' AS `role` from `guru` 
   union all
   select `nama`,`nis` AS `username`,`password`, 'siswa' AS `role` from `siswa` 
   union all
   select `nama`,`username`,`password`,'staftu' AS `role` from `staftu` ;

/*==============================================================*/
/* Foreign Key                                                  */
/*==============================================================*/
alter table DaftarNilaiUjian add constraint FK_MEMILIKI foreign key (nis)
      references Siswa (nis) on delete restrict on update restrict;

alter table DaftarNilaiUjian add constraint FK_MENDAPATKAN foreign key (idujian)
      references Ujian (idujian) on delete restrict on update restrict;

alter table FiturReferensiPenilaian add constraint FK_MEMILIKI_BANYAK foreign key (term, idsoal)
      references Term (term, idsoal) on delete restrict on update restrict;

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

alter table Term add constraint FK_MEMILIKI_FITUR foreign key (idsoal)
      references Soal (idsoal) on delete restrict on update restrict;

alter table Ujian add constraint FK_MEMBUAT foreign key (idguru)
      references Guru (idguru) on delete restrict on update restrict;

alter table Ujian add constraint FK_UNTUK_MEMENUHI foreign key (idmapel)
      references Matapelajaran (idmapel) on delete restrict on update restrict;

/*==============================================================*/
/* Unique Key                                                   */
/*==============================================================*/
ALTER TABLE `guru` ADD UNIQUE(`username`);