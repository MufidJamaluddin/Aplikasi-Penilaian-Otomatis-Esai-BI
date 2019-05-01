/*==============================================================*/
/* DBMS name:      MySQL 5.0                                    */
/* Created on:     01/05/2019 16:53:30                          */
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
/* Table: Guru                                                  */
/*==============================================================*/
create table Guru
(
   idguru               int not null AUTO_INCREMENT,
   nip                  varchar(20),
   nuptk                varchar(20),
   namaGuru             varchar(50),
   username             varchar(30),
   password             varchar(40),
   primary key (idguru)
);

/*==============================================================*/
/* Table: Jawaban                                               */
/*==============================================================*/
create table Jawaban
(
   idjawaban            int not null AUTO_INCREMENT,
   idsoal               int not null,
   nis                  char(10) not null,
   jawabanEsai          text,
   skorAngka            char(3),
   primary key (idjawaban)
);

/*==============================================================*/
/* Table: Kelas                                                 */
/*==============================================================*/
create table Kelas
(
   idkelas              int not null AUTO_INCREMENT,
   namaKelas            varchar(12),
   primary key (idkelas)
);

/*==============================================================*/
/* Table: Matapelajaran                                         */
/*==============================================================*/
create table Matapelajaran
(
   idmapel              int not null AUTO_INCREMENT,
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
   tanggal_mulai        date,
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
   idpengampu           int not null AUTO_INCREMENT,
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
   idsoal               int not null AUTO_INCREMENT,
   idujian              int not null,
   soalEsai             text,
   skorMin              char(3),
   skorMax              char(3),
   kompetensiDasar      varchar(100),
   materiPokok          varchar(100),
   primary key (idsoal)
);

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
   idujian              int not null AUTO_INCREMENT,
   idpengampu           int not null,
   namaUjian            varchar(30),
   jumlahSoal           smallint,
   durasi               time,
   primary key (idujian)
);

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

alter table Pengampu add constraint FK_MENGAJAR_DI foreign key (idkelas)
      references Kelas (idkelas) on delete restrict on update restrict;

alter table Pengampu add constraint FK_UNTUK foreign key (idmapel)
      references Matapelajaran (idmapel) on delete restrict on update restrict;

alter table Siswa add constraint FK_MENGIKUTI foreign key (idkelas)
      references Kelas (idkelas) on delete restrict on update restrict;

alter table Soal add constraint FK_TERDIRI_DARI foreign key (idujian)
      references Ujian (idujian) on delete restrict on update restrict;

alter table Term add constraint FK_MEMILIKI_FITUR foreign key (idsoal)
      references Soal (idsoal) on delete restrict on update restrict;

alter table Ujian add constraint FK_DILAKSANAKAN_UNTUK foreign key (idpengampu)
      references Pengampu (idpengampu) on delete restrict on update restrict;

