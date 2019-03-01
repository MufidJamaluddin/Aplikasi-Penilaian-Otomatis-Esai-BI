import React, { Component } from 'react';

/**
 * Default Footer
 */
class DefaultFooter extends Component 
{
  public render() : JSX.Element
  {
    return (
      <React.Fragment>
        <span><a href="">Automated Essay Scoring</a> &copy; 2019 Jurusan Teknik Komputer dan Informatika Politeknik Negeri Bandung.</span>
        <span className="ml-auto">Powered by <a href="">KoPL9</a></span>
      </React.Fragment>
    );
  }
}

export default DefaultFooter;