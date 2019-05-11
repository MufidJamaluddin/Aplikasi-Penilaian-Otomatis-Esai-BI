/**
 * Routes dalam Siswa Panel
 */

import React from 'react';

/**
 * Lazy Loading View
 * Diload Jika Ada Permintaan
 */
const UjianEsai = React.lazy(() => import('./UjianEsai/UjianEsai'));
const PersiapanUjian = React.lazy(() => import('./PersiapanUjian/PersiapanUjian'));

const SISWA_ROUTES = [
    { path: '/ujian/:idujian', name: 'ujianesai', component: UjianEsai },
    { path: '/persiapan', name: 'persiapanujian', component: PersiapanUjian }
];

export { SISWA_ROUTES };