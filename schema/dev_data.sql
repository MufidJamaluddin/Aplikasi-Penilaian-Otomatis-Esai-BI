--
-- Dumping data for table `guru`
--

INSERT INTO `guru` (`idguru`, `nip`, `nuptk`, `namaGuru`, `username`, `password`) VALUES
(1, '199312221992031003', '', 'Hendra Darmawan', 'hendra', 'hendra'),
(2, '', '8543747649200003', 'Harry Kusuma', 'harrykus', 'harrykus');

-- --------------------------------------------------------
--
-- Dumping data for table `kelas`
--

INSERT INTO `kelas` (`idkelas`, `namaKelas`, `status_ujian`) VALUES
(1, 'XI-IPA-1', NULL),
(2, 'XI-IPA-2', NULL),
(3, 'XI-IPA-3', NULL),
(4, 'XI-IPA-4', NULL),
(5, 'XI-IPA-5', NULL),
(6, 'XI-IPS-1', NULL),
(7, 'XI-IPS-2', NULL),
(8, 'XI-IPS-3', NULL),
(9, 'XI-IPS-4', NULL),
(10, 'XI-BAHASA-1', NULL),
(11, 'XI-BAHASA-2', NULL);

-- --------------------------------------------------------
--
-- Dumping data for table `matapelajaran`
--

INSERT INTO `matapelajaran` (`idmapel`, `namaMapel`, `KKM`) VALUES
(1, 'Pendidikan Kewarganegaraan', '76'),
(2, 'Biologi', '73');

-- --------------------------------------------------------
--
-- Dumping data for table `pengampu`
--

INSERT INTO `pengampu` (`idpengampu`, `idmapel`, `idkelas`, `idguru`) VALUES
(1, 1, 1, 1),
(2, 1, 2, 1),
(3, 1, 3, 1),
(4, 1, 6, 1),
(5, 1, 7, 1),
(6, 1, 8, 1),
(7, 2, 2, 2),
(8, 2, 3, 2),
(9, 2, 5, 2),
(10, 2, 4, 2),
(11, 2, 1, 2);

-- --------------------------------------------------------
--
-- Dumping data for table `siswa`
--

INSERT INTO `siswa` (`nis`, `idkelas`, `nama`, `password`) VALUES
('161511001', 1, 'Adhitya Noor Muslim', '161511001'),
('161511002', 1, 'Agit Prasetya', '161511002'),
('161511003', 1, 'Agustina Bau', '161511003'),
('161511004', 1, 'Akmal Kristanto', '161511004'),
('161511005', 2, 'Khrisna Widjaya', '161511005');

-- --------------------------------------------------------
--
-- Dumping data for table `staftu`
--

INSERT INTO `staftu` (`nama`, `username`, `password`) VALUES
('Euis', 'euis', 'majubersama');

-- --------------------------------------------------------