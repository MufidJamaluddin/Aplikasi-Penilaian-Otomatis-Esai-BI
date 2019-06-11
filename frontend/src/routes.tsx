/**
 * Routes dalam Admin Panel
 */

import React from 'react';

/**
 * Lazy Loading View
 * Diload Jika Ada Permintaan
 */
const Guru = React.lazy(() => import('./views/datamaster/Guru'));
const Siswa = React.lazy(() => import('./views/datamaster/Siswa'));
const Kelas = React.lazy(() => import('./views/datamaster/Kelas'));
const Matapelajaran = React.lazy(() => import('./views/datamaster/Matapelajaran'));

/**
 * Pelaksanaan Ujian
 */
const Ujian = React.lazy(() => import('./views/ujianesai/DaftarUjian'));
const DetailUjian = React.lazy(() => import('./views/ujianesai/DetailUjian'));
const TambahUjian = React.lazy(() => import('./views/ujianesai/TambahUjian'));
const UpdateUjian = React.lazy(() => import('./views/ujianesai/UpdateUjian'));

const BuatSoal = React.lazy(() => import('./views/ujianesai/BuatSoal'));
const LihatSoal = React.lazy(() => import('./views/ujianesai/LihatSoal'));

const UjianEsai = React.lazy(() => import('./views/ujianesai/UjianEsai'));
const PersiapanUjian = React.lazy(() => import('./views/ujianesai/PersiapanUjian'));


/**
 * Penilaian Ujian
 */
const Penilaian = React.lazy(() => import('./views/penilaian/Penilaian'));
const NilaiUjian = React.lazy(() => import('./views/penilaian/NilaiUjian'));
const NilaiManual = React.lazy(() => import('./views/penilaian/NilaiManual'));

/**
 * Laporan Ujian
 */
const HasilUjian = React.lazy(() => import('./views/laporan/HasilUjian'));
const DetailHasilUjian = React.lazy(() => import('./views/laporan/DetailHasilUjian'));

/**
 * Routes yang Dapat Diakses oleh Guru
 */
const GURU_ROUTES = [
  { path: '/soal/:idujian/detail', name: 'Lihat Soal', component: LihatSoal },
  { path: '/soal/:idujian/update', name: 'Update Soal', component: BuatSoal },
  { path: '/soal/:idujian/tambah', name: 'Buat Soal', component: BuatSoal },

  { path: '/ujian/detail/:idujian', name: 'Detail Ujian', component: DetailUjian },
  { path: '/ujian/update/:idujian', name: 'Update Ujian', component: UpdateUjian },
  { path: '/ujian/tambah', name: 'Tambah Ujian', component: TambahUjian },
  { path: '/ujian', name: 'Ujian', component: Ujian },

  { path: '/penilaian/:idujian', name: 'Nilai Ujian', component: NilaiUjian },
  { path: '/nilaimanual', name: 'Nilai Manual', component: NilaiManual },
  { path: '/penilaian', name: 'Penilaian Ujian', component: Penilaian },

  { path: '/hasilujian/:idujian', name: 'Detail Hasil Ujian', component: DetailHasilUjian },
  { path: '/hasilujian', name: 'Hasil Ujian', component: HasilUjian }
];

const STAF_TU_ROUTES = [
  { path: '/kelas', name: 'Kelas', component: Kelas },
  { path: '/matapelajaran', name: 'Mata Pelajaran', component: Matapelajaran },
  
  { path: '/guru', name: 'Guru', component: Guru },
  { path: '/siswa', name: 'Siswa', component: Siswa }
];

const SISWA_ROUTES = [
  { path: '/ujian/:idujian', name: 'ujianesai', component: UjianEsai },
  { path: '/persiapan', name: 'persiapanujian', component: PersiapanUjian }
];

export { GURU_ROUTES, STAF_TU_ROUTES, SISWA_ROUTES };