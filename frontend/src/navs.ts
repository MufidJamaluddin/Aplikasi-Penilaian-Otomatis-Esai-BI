const GURU_NAV = {
      items: [
            {
                  name: 'Ujian',
                  url: '/ujian',
                  icon: 'icon-book-open',
            },            
            {
                  name: 'Penilaian Ujian',
                  url: '/penilaian',
                  icon: 'icon-calculator',
            },
            {
                  name: 'Laporan Ujian',
                  url: '/#',
                  icon: 'icon-notebook',
                  children: [
                        {
                              name: 'Laporan Nilai Satu Ujian',
                              url: '/hasilujian',
                              icon: 'icon-chart',
                        },
                        {
                              name: 'Laporan Nilai Setiap Ujian',
                              url: '/laporanujian',
                              icon: 'icon-graph',
                        },
                  ]
            },
            {
                  name: 'Ganti Password',
                  url: '/gantipassword',
                  icon: 'icon-key',
            },
      ]
}

const STAF_TU_NAV = {
      items: [{
                  name: 'Kelas',
                  url: '/kelas',
                  icon: 'icon-note',
            },
            {
                  name: 'Mata Pelajaran',
                  url: '/Matapelajaran',
                  icon: 'icon-book-open',
            },
            {
                  name: 'Guru',
                  url: '/guru',
                  icon: 'icon-people',
            },
            {
                  name: 'Siswa',
                  url: '/siswa',
                  icon: 'icon-people',
            }
      ]
};

export { GURU_NAV, STAF_TU_NAV };