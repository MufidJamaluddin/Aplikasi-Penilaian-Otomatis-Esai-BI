/**
 * Routes dalam Admin Panel
 */

import React from 'react';

/**
 * Lazy Loading View
 * Diload Jika Ada Permintaan
 */
const Guru = React.lazy(() => import('./Guru/GuruView'));
const Siswa = React.lazy(() => import('./Siswa/SiswaView'));
const Kelas = React.lazy(() => import('./Kelas/KelasView'));
const Ujian = React.lazy(() => import('./Ujian/Ujian'));
const TambahUjian = React.lazy(() => import('./Ujian/TambahUjian'));
const UpdateUjian = React.lazy(() => import('./Ujian/UpdateUjian'));
const UpdateSoal = React.lazy(() => import('./Ujian/UpdateSoal'));
const BuatSoal = React.lazy(() => import('./Ujian/BuatSoal'));
const LihatSoal = React.lazy(() => import('./Ujian/LihatSoal'));
const DetailUjian = React.lazy(() => import('./Ujian/DetailUjian'));
const Soal = React.lazy(() => import('./Soal/Soal'));
const HasilUjian = React.lazy(() => import('./Hasil/HasilUjian'));
const Penilaian = React.lazy(() => import('./Penilaian/Penilaian'));
const NilaiUjian = React.lazy(() => import('./Penilaian/NilaiUjian'));
const DetailHasilUjian = React.lazy(() => import('./Hasil/DetailHasilUjian'));
const Matapelajaran = React.lazy(() => import('./Matapelajaran/Matapelajaran'));
const Users = React.lazy(() => import('./Users/Users'));
const User = React.lazy(() => import('./Users/User'));

/**
 * Routes yang Dapat Diakses oleh Guru
 */
const GURU_ROUTES = [
  { path: '/soal/:idujian/detail/:idsoal', name: 'Lihat Soal', component: LihatSoal },
  { path: '/soal/:idujian/update/:idsoal', name: 'Update Soal', component: UpdateSoal },
  { path: '/soal/:idujian/tambah', name: 'Buat Soal', component: BuatSoal },
  { path: '/soal/:idujian', name: 'Soal', component: Soal },

  { path: '/ujian/detail/:idujian', name: 'Detail Ujian', component: DetailUjian },
  { path: '/ujian/update/:idujian', name: 'Update Ujian', component: UpdateUjian },
  { path: '/ujian/tambah', name: 'Tambah Ujian', component: TambahUjian },
  { path: '/ujian', name: 'Ujian', component: Ujian },

  { path: '/penilaian/:idujian', name: 'Nilai Ujian', component: NilaiUjian },
  { path: '/penilaian', name: 'Penilaian Ujian', component: Penilaian },

  { path: '/hasilujian/:idujian', name: 'Detail Hasil Ujian', component: DetailHasilUjian },
  { path: '/hasilujian', name: 'Hasil Ujian', component: HasilUjian },
];

const STAF_TU_ROUTES = [
  { path: '/kelas', name: 'Kelas', component: Kelas },
  { path: '/matapelajaran', name: 'Mata Pelajaran', component: Matapelajaran },
  
  { path: '/guru', name: 'Guru', component: Guru },
  { path: '/siswa', name: 'Siswa', component: Siswa },

  { path: '/users', exact: true,  name: 'Users', component: Users },
  { path: '/users/:id', exact: true, name: 'User Details', component: User },
];

export { GURU_ROUTES, STAF_TU_ROUTES };