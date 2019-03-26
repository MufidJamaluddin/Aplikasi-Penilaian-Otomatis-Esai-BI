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
        <span><a href="">Aplikasi Penilaian Otomatis Ujian Esai</a> &copy; 2019 Jurusan Teknik Komputer dan Informatika Politeknik Negeri Bandung.</span>
        <span className="ml-auto">Powered by <a href="">KoPL9</a></span>
      </React.Fragment>
    );
  }
}

export default Footer;