import React, { Component } from 'react';
import { Nav } from 'reactstrap';

var Template = require('@coreui/react/lib');

const logo = "assets/img/brand/logo.svg";
const sygnet = "assets/img/brand/sygnet.svg";

interface DefaultHeaderPropsModel { onLogout: (e:any)=>void; }

class DefaultHeader extends Component<DefaultHeaderPropsModel> 
{
  public render() : JSX.Element
  {
    return (
      <React.Fragment>
        <Template.AppSidebarToggler className="d-lg-none" display="md" mobile />
        <Template.AppNavbarBrand
          full={{ src: logo, width: 89, height: 25, alt: 'CoreUI Logo' }}
          minimized={{ src: sygnet, width: 30, height: 30, alt: 'CoreUI Logo' }}
        />
        <Template.AppSidebarToggler className="d-md-down-none" display="lg" />

        <Nav className="ml-auto" navbar></Nav>
        
      </React.Fragment>
    );
  }
}

export default DefaultHeader;