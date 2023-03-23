-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 15, 2019 at 11:51 AM
-- Server version: 10.1.39-MariaDB
-- PHP Version: 7.3.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ujian_app`
--

DELIMITER $$
--
-- Procedures
--
CREATE PROCEDURE `hitung_nilai_ujian_latih` (IN `idujian` INT, IN `namaKelas` VARCHAR(12))  REPLACE INTO `daftarnilaiujian`
(`nis`, `idujian`, `nilai`, `namaKelas`)  
  
SELECT   
  jawaban.nis AS nis,
  soal.idujian AS idujian,
  sum(jawaban.skorAngka) AS nilai,
  jawaban.namaKelas AS namaKelas
  
FROM 
  jawaban
  
JOIN 
  soal
  ON soal.idsoal = jawaban.idsoal
  AND soal.idujian = idujian

WHERE
  jawaban.namaKelas = namaKelas
  AND soal.idujian = idujian

GROUP BY soal.idujian, jawaban.nis$$

CREATE PROCEDURE `hitung_nilai_ujian_uji` (IN `idujian` INT)  REPLACE INTO `daftarnilaiujian`
(`nis`, `idujian`, `nilai`, `namaKelas`)  
  
SELECT   
  jawaban.nis AS nis,
  soal.idujian AS idujian,
  sum(jawaban.skorAngka) AS nilai,
  jawaban.namaKelas AS namaKelas
  
FROM 
  jawaban
  
JOIN 
  soal
  ON soal.idsoal = jawaban.idsoal
  AND soal.idujian = idujian

WHERE
  jawaban.nilaiOtomatis = 1
  AND soal.idujian = idujian

GROUP BY soal.idujian, jawaban.nis$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Stand-in structure for view `akun`
-- (See below for the actual view)
--
CREATE TABLE `akun` (
`nama` varchar(50)
,`username` varchar(30)
,`password` varchar(40)
,`role` varchar(6)
);

-- --------------------------------------------------------

--
-- Table structure for table `daftarnilaiujian`
--

CREATE TABLE `daftarnilaiujian` (
  `iddaftarnilai` bigint(20) NOT NULL,
  `nis` char(10) NOT NULL,
  `idujian` int(11) NOT NULL,
  `nilai` char(3) DEFAULT NULL,
  `namaKelas` varchar(12) DEFAULT NULL,
  `flag` tinyint(1) DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `fiturobjekpenilaian`
--

CREATE TABLE `fiturobjekpenilaian` (
  `idjawaban` bigint(20) NOT NULL,
  `term` varchar(50) NOT NULL,
  `tf` float DEFAULT NULL,
  `ntf_rf` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


-- --------------------------------------------------------

--
-- Table structure for table `fiturreferensipenilaian`
--

CREATE TABLE `fiturreferensipenilaian` (
  `idjawaban` bigint(20) NOT NULL,
  `skorHuruf` char(1) NOT NULL,
  `term` char(50) NOT NULL,
  `tf` float DEFAULT NULL,
  `rf` float DEFAULT NULL,
  `ntf_rf` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


-- --------------------------------------------------------

--
-- Table structure for table `guru`
--

CREATE TABLE `guru` (
  `idguru` int(11) NOT NULL,
  `nip` varchar(20) DEFAULT NULL,
  `nuptk` varchar(20) DEFAULT NULL,
  `namaGuru` varchar(50) NOT NULL,
  `username` varchar(30) NOT NULL,
  `password` varchar(40) NOT NULL,
  `flag` tinyint(1) DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


-- --------------------------------------------------------

--
-- Table structure for table `jawaban`
--

CREATE TABLE `jawaban` (
  `idjawaban` bigint(20) NOT NULL,
  `idsoal` bigint(20) NOT NULL,
  `nis` char(10) NOT NULL,
  `jawabanEsai` text,
  `skorHuruf` char(1) DEFAULT NULL,
  `skorAngka` char(3) DEFAULT NULL,
  `nilaiOtomatis` tinyint(1) DEFAULT NULL,
  `namaKelas` varchar(12) DEFAULT NULL,
  `panjangVektor` float DEFAULT NULL,
  `kode_proses` char(1) DEFAULT NULL,
  `sample` tinyint(1) DEFAULT NULL,
  `skorHurufS` char(1) DEFAULT NULL,
  `skorAngkaS` char(3) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


-- --------------------------------------------------------

--
-- Table structure for table `kelas`
--

CREATE TABLE `kelas` (
  `idkelas` int(11) NOT NULL,
  `namaKelas` varchar(12) NOT NULL,
  `flag` tinyint(1) DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


-- --------------------------------------------------------

--
-- Table structure for table `matapelajaran`
--

CREATE TABLE `matapelajaran` (
  `idmapel` int(11) NOT NULL,
  `namaMapel` varchar(30) NOT NULL,
  `KKM` char(2) NOT NULL,
  `flag` tinyint(1) DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Stand-in structure for view `nilaiujian`
-- (See below for the actual view)
--
CREATE TABLE `nilaiujian` (
`idujian` int(11)
,`namaKelas` varchar(12)
,`nis` char(10)
,`nilai` double
);

-- --------------------------------------------------------

--
-- Table structure for table `pelaksanaanujian`
--

CREATE TABLE `pelaksanaanujian` (
  `idpelaksanaan` bigint(20) NOT NULL,
  `idkelas` int(11) NOT NULL,
  `idujian` int(11) NOT NULL,
  `waktu_mulai` datetime DEFAULT NULL,
  `status_pelaksanaan` char(1) DEFAULT '0',
  `status_penilaian` char(1) DEFAULT '0',
  `flag` tinyint(1) DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `pelaksanaanujian`
--

INSERT INTO `pelaksanaanujian` (`idpelaksanaan`, `idkelas`, `idujian`, `waktu_mulai`, `status_pelaksanaan`, `status_penilaian`, `flag`) VALUES
(1, 10, 1, '2019-05-21 15:15:38', '2', '1', 1),
(2, 11, 1, '2019-05-21 15:15:42', '2', '1', 1),
(3, 12, 1, '2019-05-21 15:15:38', '2', '1', 1),
(17, 20, 5, '2019-07-07 14:55:11', '2', '1', 1),
(18, 4, 5, '2019-07-07 14:55:13', '2', '1', 1),
(19, 5, 5, '2019-07-07 14:55:15', '2', '1', 1),
(20, 14, 6, '2019-07-09 16:16:35', '2', '1', 1),
(21, 15, 6, '2019-07-09 16:16:40', '2', '1', 1),
(22, 16, 6, '2019-07-09 16:16:45', '2', '1', 1),
(23, 17, 6, NULL, '2', '1', 1),
(24, 18, 6, NULL, '2', '1', 1);

-- --------------------------------------------------------

--
-- Table structure for table `pengampu`
--

CREATE TABLE `pengampu` (
  `idpengampu` int(11) NOT NULL,
  `idmapel` int(11) NOT NULL,
  `idkelas` int(11) NOT NULL,
  `idguru` int(11) NOT NULL,
  `flag` tinyint(1) DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


-- --------------------------------------------------------

--
-- Stand-in structure for view `similarity`
-- (See below for the actual view)
--
CREATE TABLE `similarity` (
`idsoal` bigint(20)
,`idjawaban_uji` bigint(20)
,`idjawaban_latih` bigint(20)
,`cosinesimilarity` double
,`skorHuruf` char(1)
,`skorAngka` char(3)
);

-- --------------------------------------------------------

--
-- Table structure for table `siswa`
--

CREATE TABLE `siswa` (
  `nis` char(10) NOT NULL,
  `idkelas` int(11) NOT NULL,
  `nama` varchar(20) NOT NULL,
  `angkatan` char(4) NOT NULL,
  `password` varchar(40) NOT NULL,
  `flag` tinyint(1) DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


-- --------------------------------------------------------

--
-- Table structure for table `soal`
--

CREATE TABLE `soal` (
  `idsoal` bigint(20) NOT NULL,
  `idujian` int(11) NOT NULL,
  `soalEsai` text NOT NULL,
  `skorMin` char(3) DEFAULT NULL,
  `skorMax` char(3) DEFAULT NULL,
  `kompetensiDasar` varchar(100) DEFAULT NULL,
  `materiPokok` varchar(100) DEFAULT NULL,
  `flag` tinyint(1) DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


-- --------------------------------------------------------

--
-- Table structure for table `staftu`
--

CREATE TABLE `staftu` (
  `nama` varchar(50) NOT NULL,
  `username` varchar(30) NOT NULL,
  `password` varchar(40) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;


-- --------------------------------------------------------

--
-- Table structure for table `statepotomatis`
--

CREATE TABLE `statepotomatis` (
  `idujian` int(11) NOT NULL,
  `idsoal` int(11) DEFAULT NULL,
  `kode_proses` char(1) DEFAULT NULL,
  `pesan_progress_penilaian` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `ujian`
--

CREATE TABLE `ujian` (
  `idujian` int(11) NOT NULL,
  `idguru` int(11) NOT NULL,
  `idmapel` int(11) NOT NULL,
  `namaUjian` varchar(30) NOT NULL,
  `jumlahSoal` smallint(6) NOT NULL,
  `durasi` smallint(6) DEFAULT NULL,
  `status_ujian` char(1) DEFAULT '0',
  `progress_penilaian` char(3) DEFAULT NULL,
  `pesan_progress_penilaian` varchar(100) DEFAULT NULL,
  `flag` tinyint(1) DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


-- --------------------------------------------------------

--
-- Structure for view `akun`
--
DROP TABLE IF EXISTS `akun`;

CREATE VIEW `akun`  AS  select `guru`.`namaGuru` AS `nama`,`guru`.`username` AS `username`,`guru`.`password` AS `password`,'guru' AS `role` from `guru` where (`guru`.`flag` = 1) union all select `siswa`.`nama` AS `nama`,`siswa`.`nis` AS `username`,`siswa`.`password` AS `password`,'siswa' AS `role` from `siswa` where (`siswa`.`flag` = 1) union all select `staftu`.`nama` AS `nama`,`staftu`.`username` AS `username`,`staftu`.`password` AS `password`,'staftu' AS `role` from `staftu` ;

-- --------------------------------------------------------

--
-- Structure for view `nilaiujian`
--
DROP TABLE IF EXISTS `nilaiujian`;

CREATE VIEW `nilaiujian`  AS  select `soal`.`idujian` AS `idujian`,`jawaban`.`namaKelas` AS `namaKelas`,`jawaban`.`nis` AS `nis`,sum(`jawaban`.`skorAngka`) AS `nilai` from (`jawaban` join `soal` on((`soal`.`idsoal` = `jawaban`.`idsoal`))) group by `soal`.`idujian`,`jawaban`.`nis` order by `soal`.`idujian`,`jawaban`.`namaKelas`,`jawaban`.`nis` ;

-- --------------------------------------------------------

--
-- Structure for view `similarity`
--
DROP TABLE IF EXISTS `similarity`;

CREATE VIEW `similarity`  AS  select `uji`.`idsoal` AS `idsoal`,`a`.`idjawaban` AS `idjawaban_uji`,`b`.`idjawaban` AS `idjawaban_latih`,(sum((`a`.`ntf_rf` * `b`.`ntf_rf`)) / (`uji`.`panjangVektor` * `latih`.`panjangVektor`)) AS `cosinesimilarity`,`latih`.`skorHuruf` AS `skorHuruf`,`latih`.`skorAngka` AS `skorAngka` from (((`fiturobjekpenilaian` `a` join `fiturreferensipenilaian` `b` on((`a`.`term` = `b`.`term`))) join `jawaban` `uji` on((`uji`.`idjawaban` = `a`.`idjawaban`))) join `jawaban` `latih` on((`latih`.`idjawaban` = `b`.`idjawaban`))) group by `a`.`idjawaban`,`b`.`idjawaban` order by `a`.`idjawaban`,(sum((`a`.`ntf_rf` * `b`.`ntf_rf`)) / (`uji`.`panjangVektor` * `latih`.`panjangVektor`)) desc ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `daftarnilaiujian`
--
ALTER TABLE `daftarnilaiujian`
  ADD PRIMARY KEY (`iddaftarnilai`),
  ADD UNIQUE KEY `unik` (`nis`,`idujian`),
  ADD KEY `FK_MEMILIKI` (`nis`),
  ADD KEY `FK_MENDAPATKAN` (`idujian`);

--
-- Indexes for table `fiturobjekpenilaian`
--
ALTER TABLE `fiturobjekpenilaian`
  ADD PRIMARY KEY (`idjawaban`,`term`);

--
-- Indexes for table `fiturreferensipenilaian`
--
ALTER TABLE `fiturreferensipenilaian`
  ADD PRIMARY KEY (`idjawaban`,`skorHuruf`,`term`);

--
-- Indexes for table `guru`
--
ALTER TABLE `guru`
  ADD PRIMARY KEY (`idguru`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `jawaban`
--
ALTER TABLE `jawaban`
  ADD PRIMARY KEY (`idjawaban`),
  ADD UNIQUE KEY `unik` (`idsoal`,`nis`),
  ADD KEY `FK_DIJAWAB_DENGAN` (`idsoal`),
  ADD KEY `FK_MENGISI` (`nis`);

--
-- Indexes for table `kelas`
--
ALTER TABLE `kelas`
  ADD PRIMARY KEY (`idkelas`);

--
-- Indexes for table `matapelajaran`
--
ALTER TABLE `matapelajaran`
  ADD PRIMARY KEY (`idmapel`);

--
-- Indexes for table `pelaksanaanujian`
--
ALTER TABLE `pelaksanaanujian`
  ADD PRIMARY KEY (`idpelaksanaan`),
  ADD KEY `FK_DILAKSANAAN_DI` (`idkelas`),
  ADD KEY `FK_DILAKSANAKAN_PADA` (`idujian`);

--
-- Indexes for table `pengampu`
--
ALTER TABLE `pengampu`
  ADD PRIMARY KEY (`idpengampu`),
  ADD KEY `FK_MELAKSANAKAN_TUGAS` (`idguru`),
  ADD KEY `FK_MENGAJAR` (`idmapel`),
  ADD KEY `FK_MENGAJAR_DI` (`idkelas`);

--
-- Indexes for table `siswa`
--
ALTER TABLE `siswa`
  ADD PRIMARY KEY (`nis`),
  ADD KEY `FK_MENGIKUTI` (`idkelas`);

--
-- Indexes for table `soal`
--
ALTER TABLE `soal`
  ADD PRIMARY KEY (`idsoal`),
  ADD KEY `FK_TERDIRI_DARI` (`idujian`);

--
-- Indexes for table `staftu`
--
ALTER TABLE `staftu`
  ADD PRIMARY KEY (`username`);

--
-- Indexes for table `statepotomatis`
--
ALTER TABLE `statepotomatis`
  ADD PRIMARY KEY (`idujian`);

--
-- Indexes for table `ujian`
--
ALTER TABLE `ujian`
  ADD PRIMARY KEY (`idujian`),
  ADD KEY `FK_MEMBUAT` (`idguru`),
  ADD KEY `FK_UNTUK_MEMENUHI` (`idmapel`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `daftarnilaiujian`
--
ALTER TABLE `daftarnilaiujian`
  MODIFY `iddaftarnilai` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `guru`
--
ALTER TABLE `guru`
  MODIFY `idguru` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jawaban`
--
ALTER TABLE `jawaban`
  MODIFY `idjawaban` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `kelas`
--
ALTER TABLE `kelas`
  MODIFY `idkelas` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `matapelajaran`
--
ALTER TABLE `matapelajaran`
  MODIFY `idmapel` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pelaksanaanujian`
--
ALTER TABLE `pelaksanaanujian`
  MODIFY `idpelaksanaan` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pengampu`
--
ALTER TABLE `pengampu`
  MODIFY `idpengampu` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `soal`
--
ALTER TABLE `soal`
  MODIFY `idsoal` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ujian`
--
ALTER TABLE `ujian`
  MODIFY `idujian` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `daftarnilaiujian`
--
ALTER TABLE `daftarnilaiujian`
  ADD CONSTRAINT `FK_MEMILIKI` FOREIGN KEY (`nis`) REFERENCES `siswa` (`nis`),
  ADD CONSTRAINT `FK_MENDAPATKAN` FOREIGN KEY (`idujian`) REFERENCES `ujian` (`idujian`);

--
-- Constraints for table `fiturobjekpenilaian`
--
ALTER TABLE `fiturobjekpenilaian`
  ADD CONSTRAINT `FK_SEBAGAI_OBJ_PENILAIAN` FOREIGN KEY (`idjawaban`) REFERENCES `jawaban` (`idjawaban`);

--
-- Constraints for table `fiturreferensipenilaian`
--
ALTER TABLE `fiturreferensipenilaian`
  ADD CONSTRAINT `FK_SEBAGAI_REF_PENILAIAN` FOREIGN KEY (`idjawaban`) REFERENCES `jawaban` (`idjawaban`);

--
-- Constraints for table `jawaban`
--
ALTER TABLE `jawaban`
  ADD CONSTRAINT `FK_DIJAWAB_DENGAN` FOREIGN KEY (`idsoal`) REFERENCES `soal` (`idsoal`),
  ADD CONSTRAINT `FK_MENGISI` FOREIGN KEY (`nis`) REFERENCES `siswa` (`nis`);

--
-- Constraints for table `pelaksanaanujian`
--
ALTER TABLE `pelaksanaanujian`
  ADD CONSTRAINT `FK_DILAKSANAAN_DI` FOREIGN KEY (`idkelas`) REFERENCES `kelas` (`idkelas`),
  ADD CONSTRAINT `FK_DILAKSANAKAN_PADA` FOREIGN KEY (`idujian`) REFERENCES `ujian` (`idujian`);

--
-- Constraints for table `pengampu`
--
ALTER TABLE `pengampu`
  ADD CONSTRAINT `FK_MELAKSANAKAN_TUGAS` FOREIGN KEY (`idguru`) REFERENCES `guru` (`idguru`),
  ADD CONSTRAINT `FK_MENGAJAR` FOREIGN KEY (`idmapel`) REFERENCES `matapelajaran` (`idmapel`),
  ADD CONSTRAINT `FK_MENGAJAR_DI` FOREIGN KEY (`idkelas`) REFERENCES `kelas` (`idkelas`);

--
-- Constraints for table `siswa`
--
ALTER TABLE `siswa`
  ADD CONSTRAINT `FK_MENGIKUTI` FOREIGN KEY (`idkelas`) REFERENCES `kelas` (`idkelas`);

--
-- Constraints for table `soal`
--
ALTER TABLE `soal`
  ADD CONSTRAINT `FK_TERDIRI_DARI` FOREIGN KEY (`idujian`) REFERENCES `ujian` (`idujian`);

--
-- Constraints for table `ujian`
--
ALTER TABLE `ujian`
  ADD CONSTRAINT `FK_MEMBUAT` FOREIGN KEY (`idguru`) REFERENCES `guru` (`idguru`),
  ADD CONSTRAINT `FK_UNTUK_MEMENUHI` FOREIGN KEY (`idmapel`) REFERENCES `matapelajaran` (`idmapel`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
