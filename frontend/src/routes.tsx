import React from 'react';
import DefaultLayout from './containers/DefaultLayout';

const Guru = React.lazy(() => import('./views/Guru/Guru'));
const Profil = React.lazy(() => import('./views/Profil/Profil'));
const Siswa = React.lazy(() => import('./views/Siswa/Siswa'));
const Kelas = React.lazy(() => import('./views/Kelas/Kelas'));
const Ujian = React.lazy(() => import('./views/Ujian/Ujian'));
const Soal = React.lazy(() => import('./views/Soal/Soal'));
const Matapelajaran = React.lazy(() => import('./views/Matapelajaran/Matapelajaran'));
const Users = React.lazy(() => import('./views/Users/Users'));
const User = React.lazy(() => import('./views/Users/User'));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home', component: DefaultLayout },
  { path: '/guru', name: 'Guru', component: Guru },
  { path: '/profil', name: 'Profil', component: Profil },
  { path: '/siswa', name: 'Siswa', component: Siswa },
  { path: '/kelas', name: 'Kelas', component: Kelas },
  { path: '/ujian', name: 'Ujian', component: Ujian },
  { path: '/soal', name: 'Soal', component: Soal },
  { path: '/matapelajaran', name: 'Matapelajaran', component: Matapelajaran },
  { path: '/users', exact: true,  name: 'Users', component: Users },
  { path: '/users/:id', exact: true, name: 'User Details', component: User },
];

export default routes;
