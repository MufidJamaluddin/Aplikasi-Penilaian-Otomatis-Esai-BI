-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 05, 2019 at 03:47 PM
-- Server version: 10.1.38-MariaDB
-- PHP Version: 7.3.3

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
  `nis` char(10) NOT NULL,
  `idujian` int(11) NOT NULL,
  `nilai` char(3) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `fiturreferensipenilaian`
--

CREATE TABLE `fiturreferensipenilaian` (
  `idjawaban` int(11) NOT NULL,
  `skorHuruf` char(1) NOT NULL,
  `term` varchar(50) NOT NULL,
  `idsoal` int(11) NOT NULL,
  `tf` float DEFAULT NULL,
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
  `namaGuru` varchar(50) DEFAULT NULL,
  `username` varchar(30) DEFAULT NULL,
  `password` varchar(40) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `guru`
--

INSERT INTO `guru` (`idguru`, `nip`, `nuptk`, `namaGuru`, `username`, `password`) VALUES
(1, '196712221992031003', NULL, 'Hendra Dharmawan', 'majubersama', 'majubersama'),
(2, NULL, '8543747649200003', 'Ariyadhi Huda', 'ariyadhi', 'majubersama');

-- --------------------------------------------------------

--
-- Table structure for table `jawaban`
--

CREATE TABLE `jawaban` (
  `idjawaban` int(11) NOT NULL,
  `idsoal` int(11) NOT NULL,
  `nis` char(10) NOT NULL,
  `jawabanEsai` text,
  `skorAngka` char(3) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `kelas`
--

CREATE TABLE `kelas` (
  `idkelas` int(11) NOT NULL,
  `namaKelas` varchar(12) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `kelas`
--

INSERT INTO `kelas` (`idkelas`, `namaKelas`) VALUES
(1, 'XI-IPA-1'),
(2, 'XI-IPA-2'),
(3, 'XI-IPA-3'),
(4, 'XI-IPA-4'),
(5, 'XI-IPS-1'),
(6, 'XI-IPS-2'),
(7, 'XI-IPS-3'),
(8, 'XI-IPS-4');

-- --------------------------------------------------------

--
-- Table structure for table `matapelajaran`
--

CREATE TABLE `matapelajaran` (
  `idmapel` int(11) NOT NULL,
  `namaMapel` varchar(30) DEFAULT NULL,
  `KKM` char(2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `pelaksanaanujian`
--

CREATE TABLE `pelaksanaanujian` (
  `idkelas` int(11) NOT NULL,
  `idujian` int(11) NOT NULL,
  `tanggal_mulai` date DEFAULT NULL,
  `status_pelaksanaan` char(1) DEFAULT NULL,
  `status_penilaian` char(1) DEFAULT NULL,
  `progress_penilaian` char(3) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `pengampu`
--

CREATE TABLE `pengampu` (
  `idpengampu` int(11) NOT NULL,
  `idmapel` int(11) NOT NULL,
  `idkelas` int(11) NOT NULL,
  `idguru` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `siswa`
--

CREATE TABLE `siswa` (
  `nis` char(10) NOT NULL,
  `idkelas` int(11) NOT NULL,
  `nama` varchar(20) DEFAULT NULL,
  `password` varchar(40) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `siswa`
--

INSERT INTO `siswa` (`nis`, `idkelas`, `nama`, `password`) VALUES
('161511001', 1, 'Adhitya Noor Muslim', '161511001'),
('161511019', 1, 'Mufid Jamaluddin', '161511019');

-- --------------------------------------------------------

--
-- Table structure for table `soal`
--

CREATE TABLE `soal` (
  `idsoal` int(11) NOT NULL,
  `idujian` int(11) NOT NULL,
  `soalEsai` text,
  `skorMin` char(3) DEFAULT NULL,
  `skorMax` char(3) DEFAULT NULL,
  `kompetensiDasar` varchar(100) DEFAULT NULL,
  `materiPokok` varchar(100) DEFAULT NULL
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

--
-- Dumping data for table `staftu`
--

INSERT INTO `staftu` (`nama`, `username`, `password`) VALUES
('Euis', 'euis', 'majubersama');

-- --------------------------------------------------------

--
-- Table structure for table `term`
--

CREATE TABLE `term` (
  `idsoal` int(11) NOT NULL,
  `term` varchar(50) NOT NULL,
  `max_tf` float DEFAULT NULL,
  `max_rf_A` float DEFAULT NULL,
  `max_rf_B` float DEFAULT NULL,
  `max_rf_C` float DEFAULT NULL,
  `max_rf_D` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tfiturobjekpenilaian`
--

CREATE TABLE `tfiturobjekpenilaian` (
  `idjawaban` int(11) NOT NULL,
  `skorHuruf` char(1) DEFAULT NULL,
  `term` varchar(50) NOT NULL,
  `idsoal` int(11) NOT NULL,
  `tf` float DEFAULT NULL,
  `ntf_rf` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `ujian`
--

CREATE TABLE `ujian` (
  `idujian` int(11) NOT NULL,
  `idpengampu` int(11) NOT NULL,
  `namaUjian` varchar(30) DEFAULT NULL,
  `jumlahSoal` smallint(6) DEFAULT NULL,
  `durasi` time DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure for view `akun`
--
DROP TABLE IF EXISTS `akun`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `akun`  AS  select `guru`.`namaGuru` AS `nama`,`guru`.`username` AS `username`,`guru`.`password` AS `password`,'guru' AS `role` from `guru` union all select `siswa`.`nama` AS `nama`,`siswa`.`nis` AS `username`,`siswa`.`password` AS `password`,'siswa' AS `role` from `siswa` union all select `staftu`.`nama` AS `nama`,`staftu`.`username` AS `username`,`staftu`.`password` AS `password`,'staftu' AS `role` from `staftu` ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `daftarnilaiujian`
--
ALTER TABLE `daftarnilaiujian`
  ADD PRIMARY KEY (`nis`,`idujian`),
  ADD KEY `FK_MENDAPATKAN` (`idujian`);

--
-- Indexes for table `fiturreferensipenilaian`
--
ALTER TABLE `fiturreferensipenilaian`
  ADD PRIMARY KEY (`idjawaban`,`skorHuruf`,`term`,`idsoal`),
  ADD KEY `FK_MEMILIKI_BANYAK` (`term`,`idsoal`);

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
  ADD PRIMARY KEY (`idkelas`,`idujian`),
  ADD KEY `FK_DILAKSANAKAN_PADA` (`idujian`);

--
-- Indexes for table `pengampu`
--
ALTER TABLE `pengampu`
  ADD PRIMARY KEY (`idpengampu`),
  ADD KEY `FK_MELAKSANAKAN_TUGAS` (`idguru`),
  ADD KEY `FK_MENGAJAR_DI` (`idkelas`),
  ADD KEY `FK_UNTUK` (`idmapel`);

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
-- Indexes for table `term`
--
ALTER TABLE `term`
  ADD PRIMARY KEY (`term`,`idsoal`),
  ADD KEY `FK_MEMILIKI_FITUR` (`idsoal`);

--
-- Indexes for table `tfiturobjekpenilaian`
--
ALTER TABLE `tfiturobjekpenilaian`
  ADD PRIMARY KEY (`idjawaban`,`term`,`idsoal`);

--
-- Indexes for table `ujian`
--
ALTER TABLE `ujian`
  ADD PRIMARY KEY (`idujian`),
  ADD KEY `FK_DILAKSANAKAN_UNTUK` (`idpengampu`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `guru`
--
ALTER TABLE `guru`
  MODIFY `idguru` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `jawaban`
--
ALTER TABLE `jawaban`
  MODIFY `idjawaban` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `kelas`
--
ALTER TABLE `kelas`
  MODIFY `idkelas` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `matapelajaran`
--
ALTER TABLE `matapelajaran`
  MODIFY `idmapel` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pengampu`
--
ALTER TABLE `pengampu`
  MODIFY `idpengampu` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `soal`
--
ALTER TABLE `soal`
  MODIFY `idsoal` int(11) NOT NULL AUTO_INCREMENT;

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
-- Constraints for table `fiturreferensipenilaian`
--
ALTER TABLE `fiturreferensipenilaian`
  ADD CONSTRAINT `FK_MEMILIKI_BANYAK` FOREIGN KEY (`term`,`idsoal`) REFERENCES `term` (`term`, `idsoal`),
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
  ADD CONSTRAINT `FK_MENGAJAR_DI` FOREIGN KEY (`idkelas`) REFERENCES `kelas` (`idkelas`),
  ADD CONSTRAINT `FK_UNTUK` FOREIGN KEY (`idmapel`) REFERENCES `matapelajaran` (`idmapel`);

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
-- Constraints for table `term`
--
ALTER TABLE `term`
  ADD CONSTRAINT `FK_MEMILIKI_FITUR` FOREIGN KEY (`idsoal`) REFERENCES `soal` (`idsoal`);

--
-- Constraints for table `ujian`
--
ALTER TABLE `ujian`
  ADD CONSTRAINT `FK_DILAKSANAKAN_UNTUK` FOREIGN KEY (`idpengampu`) REFERENCES `pengampu` (`idpengampu`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
