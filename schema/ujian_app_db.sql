/*==============================================================*/
/* DBMS name:      MySQL 5.0                                    */
/* Created on:     24/03/2019 19:38:21                          */
/*==============================================================*/


drop table if exists Akun;

drop table if exists DitujukkanUntuk;

drop table if exists Guru;

drop table if exists Jawaban;

drop table if exists Kelas;

drop table if exists Matapelajaran;

drop table if exists MengajarDi;

drop table if exists MengajarMapel;

drop table if exists Siswa;

drop table if exists Soal;

drop table if exists StateTerm;

drop table if exists Ujian;

drop table if exists fitur_term;

drop table if exists mengikuti_ujian;

/*==============================================================*/
/* Table: Akun                                                  */
/*==============================================================*/
create table Akun
(
   username             varchar(20) not null,
   kode_guru            char(3),
   nis                  char(20),
   password             varchar(40),
   role                 char(1),
   primary key (username)
);

/*==============================================================*/
/* Table: DitujukkanUntuk                                       */
/*==============================================================*/
create table DitujukkanUntuk
(
   kode_kelas           smallint not null,
   kode_ujian           int not null,
   primary key (kode_kelas, kode_ujian)
);

/*==============================================================*/
/* Table: Guru                                                  */
/*==============================================================*/
create table Guru
(
   kode_guru            char(3) not null,
   username             varchar(20) not null,
   nama_guru            varchar(100),
   primary key (kode_guru)
);

/*==============================================================*/
/* Table: Jawaban                                               */
/*==============================================================*/
create table Jawaban
(
   kode_jawaban         bigint not null,
   kode_soal            int not null,
   nis                  char(20) not null,
   skor                 int,
   huruf                char(1),
   esai                 text,
   primary key (kode_jawaban)
);

/*==============================================================*/
/* Table: Kelas                                                 */
/*==============================================================*/
create table Kelas
(
   kode_kelas           smallint not null,
   nama_kelas           varchar(20),
   primary key (kode_kelas)
);

/*==============================================================*/
/* Table: Matapelajaran                                         */
/*==============================================================*/
create table Matapelajaran
(
   kode_matapelajaran   int not null,
   nama_matapelajaran   varchar(50),
   primary key (kode_matapelajaran)
);

/*==============================================================*/
/* Table: MengajarDi                                            */
/*==============================================================*/
create table MengajarDi
(
   kode_guru            char(3) not null,
   kode_kelas           smallint not null,
   primary key (kode_guru, kode_kelas)
);

/*==============================================================*/
/* Table: MengajarMapel                                         */
/*==============================================================*/
create table MengajarMapel
(
   kode_matapelajaran   int not null,
   kode_guru            char(3) not null,
   primary key (kode_matapelajaran, kode_guru)
);

/*==============================================================*/
/* Table: Siswa                                                 */
/*==============================================================*/
create table Siswa
(
   nis                  char(20) not null,
   kode_kelas           smallint not null,
   username             varchar(20) not null,
   nama_siswa           varchar(100),
   primary key (nis)
);

/*==============================================================*/
/* Table: Soal                                                  */
/*==============================================================*/
create table Soal
(
   kode_soal            int not null,
   kode_ujian           int not null,
   teks_soal            text,
   primary key (kode_soal)
);

/*==============================================================*/
/* Table: StateTerm                                             */
/*==============================================================*/
create table StateTerm
(
   kode_soal            int not null,
   term                 varchar(100) not null,
   maks_tf_A            int,
   maks_tf_B            int,
   maks_tf_C            int,
   maks_tf_D            int,
   primary key (kode_soal, term)
);

/*==============================================================*/
/* Table: Ujian                                                 */
/*==============================================================*/
create table Ujian
(
   kode_ujian           int not null,
   kode_guru            char(3) not null,
   kode_matapelajaran   int not null,
   nama_ujian           varchar(50),
   durasi               time,
   primary key (kode_ujian)
);

/*==============================================================*/
/* Table: fitur_term                                            */
/*==============================================================*/
create table fitur_term
(
   kode_jawaban         bigint not null,
   kode_soal            int not null,
   term                 varchar(100) not null,
   tf                   int,
   ntf_rf               float,
   primary key (kode_soal, kode_jawaban, term)
);

/*==============================================================*/
/* Table: mengikuti_ujian                                       */
/*==============================================================*/
create table mengikuti_ujian
(
   nis                  char(20) not null,
   kode_ujian           int not null,
   nilai                int,
   waktu_pelaksanaan    date,
   primary key (nis, kode_ujian)
);

alter table Akun add constraint FK_guru_menggunakan_akun foreign key (kode_guru)
      references Guru (kode_guru) on delete restrict on update restrict;

alter table Akun add constraint FK_siswa_memiliki_akun foreign key (nis)
      references Siswa (nis) on delete restrict on update restrict;

alter table DitujukkanUntuk add constraint FK_DitujukkanUntuk foreign key (kode_kelas)
      references Kelas (kode_kelas) on delete restrict on update restrict;

alter table DitujukkanUntuk add constraint FK_DitujukkanUntuk2 foreign key (kode_ujian)
      references Ujian (kode_ujian) on delete restrict on update restrict;

alter table Guru add constraint FK_guru_menggunakan_akun2 foreign key (username)
      references Akun (username) on delete restrict on update restrict;

alter table Jawaban add constraint FK_dijawab_oleh foreign key (nis)
      references Siswa (nis) on delete restrict on update restrict;

alter table Jawaban add constraint FK_soal_terdiri_dari_ujian foreign key (kode_soal)
      references Soal (kode_soal) on delete restrict on update restrict;

alter table MengajarDi add constraint FK_MengajarDi foreign key (kode_guru)
      references Guru (kode_guru) on delete restrict on update restrict;

alter table MengajarDi add constraint FK_MengajarDi2 foreign key (kode_kelas)
      references Kelas (kode_kelas) on delete restrict on update restrict;

alter table MengajarMapel add constraint FK_MengajarMapel foreign key (kode_matapelajaran)
      references Matapelajaran (kode_matapelajaran) on delete restrict on update restrict;

alter table MengajarMapel add constraint FK_MengajarMapel2 foreign key (kode_guru)
      references Guru (kode_guru) on delete restrict on update restrict;

alter table Siswa add constraint FK_belajar_di foreign key (kode_kelas)
      references Kelas (kode_kelas) on delete restrict on update restrict;

alter table Siswa add constraint FK_siswa_memiliki_akun2 foreign key (username)
      references Akun (username) on delete restrict on update restrict;

alter table Soal add constraint FK_ujian_terdiri_dari_soal foreign key (kode_ujian)
      references Ujian (kode_ujian) on delete restrict on update restrict;

alter table StateTerm add constraint FK_memiliki_list_term foreign key (kode_soal)
      references Soal (kode_soal) on delete restrict on update restrict;

alter table Ujian add constraint FK_MEMBUAT foreign key (kode_guru)
      references Guru (kode_guru) on delete restrict on update restrict;

alter table Ujian add constraint FK_ujian_mapel foreign key (kode_matapelajaran)
      references Matapelajaran (kode_matapelajaran) on delete restrict on update restrict;

alter table fitur_term add constraint FK_memiliki_fitur foreign key (kode_jawaban)
      references Jawaban (kode_jawaban) on delete restrict on update restrict;

alter table fitur_term add constraint FK_terhadap_term foreign key (kode_soal, term)
      references StateTerm (kode_soal, term) on delete restrict on update restrict;

alter table mengikuti_ujian add constraint FK_melaksanakan foreign key (nis)
      references Siswa (nis) on delete restrict on update restrict;

alter table mengikuti_ujian add constraint FK_subjek foreign key (kode_ujian)
      references Ujian (kode_ujian) on delete restrict on update restrict;

