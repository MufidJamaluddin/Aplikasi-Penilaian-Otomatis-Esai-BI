import React, { Component } from 'react';

/**
 * Default Footer
 */
class Footer extends Component 
{
  public render() : JSX.Element
  {
    return (
      <React.Fragment>
        <span>Aplikasi Penilaian Otomatis Ujian Esai Berbahasa Indonesia &copy; 2019 Jurusan Teknik Komputer dan Informatika Politeknik Negeri Bandung.</span>
        <span className="ml-auto">Powered by <b>KoTA-109</b></span>
      </React.Fragment>
    );
  }
}

export default Footer;