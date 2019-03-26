import React from 'react';
import AdminLayout from './admin_templates/AdminLayout';

/**
 * Lazy Loading View
 * Diload Jika Ada Permintaan
 */
const Guru = React.lazy(() => import('./admin_views/Guru/Guru'));
const Profil = React.lazy(() => import('./admin_views/Profil/Profil'));
const Siswa = React.lazy(() => import('./admin_views/Siswa/Siswa'));
const Kelas = React.lazy(() => import('./admin_views/Kelas/Kelas'));
const Ujian = React.lazy(() => import('./admin_views/Ujian/Ujian'));
const TambahUjian = React.lazy(() => import('./admin_views/Ujian/TambahUjian'));
const UpdateUjian = React.lazy(() => import('./admin_views/Ujian/UpdateUjian'));
const UpdateSoal = React.lazy(() => import('./admin_views/Ujian/UpdateSoal'));
const BuatSoal = React.lazy(() => import('./admin_views/Ujian/BuatSoal'));
const LihatSoal = React.lazy(() => import('./admin_views/Ujian/LihatSoal'));
const DetailUjian = React.lazy(() => import('./admin_views/Ujian/DetailUjian'));
const Soal = React.lazy(() => import('./admin_views/Soal/Soal'));
const HasilUjian = React.lazy(() => import('./admin_views/Hasil/HasilUjian'));
const DetailHasilUjian = React.lazy(() => import('./admin_views/Hasil/DetailHasilUjian'));
const Matapelajaran = React.lazy(() => import('./admin_views/Matapelajaran/Matapelajaran'));
const Users = React.lazy(() => import('./admin_views/Users/Users'));
const User = React.lazy(() => import('./admin_views/Users/User'));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home', component: AdminLayout },
  { path: '/guru', name: 'Guru', component: Guru },
  { path: '/profil', name: 'Profil', component: Profil },
  { path: '/siswa', name: 'Siswa', component: Siswa },
  { path: '/kelas', name: 'Kelas', component: Kelas },
  { path: '/ujian', name: 'Ujian', component: Ujian },
  { path: '/hasilujian', name: 'Hasil Ujian', component: HasilUjian },
  { path: '/detailhasilujian', name: 'Detail Hasil Ujian', component: DetailHasilUjian },
  { path: '/buatsoal', name: 'Buat Soal', component: BuatSoal },
  { path: '/lihatsoal', name: 'Lihat Soal', component: LihatSoal },
  { path: '/detailujian', name: 'Detail Ujian', component: DetailUjian },
  { path: '/tambahujian', name: 'Tambah Ujian', component: TambahUjian },
  { path: '/updateujian', name: 'Update Ujian', component: UpdateUjian },
  { path: '/updatesoal', name: 'Update Soal', component: UpdateSoal },
  { path: '/soal', name: 'Soal', component: Soal },
  { path: '/matapelajaran', name: 'Mata Pelajaran', component: Matapelajaran },
  { path: '/users', exact: true,  name: 'Users', component: Users },
  { path: '/users/:id', exact: true, name: 'User Details', component: User },
];

export default routes;