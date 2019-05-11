import React, { Component, Suspense } from 'react';
import { Redirect, Route, Switch, RouteComponentProps } from 'react-router-dom';
import { Container, Nav, NavItem, Button } from 'reactstrap';

/**
 * Template CoreUI
 */
var Template = require('@coreui/react/lib');

/**
 * Komponen Header dan Footer
 */
const Footer = React.lazy(() => import('../layout/admin/Footer'));

/**
 * Model Cust KoPL 9
 */
interface RouteConfigItem
{
    path: string;
    exact?: boolean;
    name: string;
    component: any;
}

interface SiswaLayoutModel
{
    routes: Array<RouteConfigItem>;
    redirect_root_to: string;
    onLogout: any;
    nama: string;
}

/**
 * Header
 */
interface DefaultHeaderAttribute { nama: string; onLogout:any; }

class Header extends Component<DefaultHeaderAttribute> 
{
  public render() : JSX.Element
  {
    return (
      <React.Fragment>
        
        <Nav className="ml-auto">
          <NavItem className="px-3">
              <i className="icon-user"></i> {this.props.nama}
          </NavItem>

          <NavItem className="px-3">
            <Button size="sm" color="primary" onClick={this.props.onLogout}>
              <i className="icon-logout"></i> Logout
            </Button>
          </NavItem>
        </Nav>

      </React.Fragment>
    );
  }
}

/**
 * Layout Siswa
 */
class SiswaLayout extends Component<RouteComponentProps<any> & SiswaLayoutModel>
{

  public loading() : JSX.Element
  {
    return(
      <div className="animated fadeIn pt-1 text-center">Loading...</div>
    );
  }

  public render() : JSX.Element 
  {
    return (
      <div className="app">

        {/* HEADER */}
        <Template.AppHeader fixed>
          <Suspense  fallback={this.loading()}>
            <Header nama={this.props.nama} onLogout={this.props.onLogout} />
          </Suspense>
        </Template.AppHeader>

        {/* BODY APLIKASI KoPL 9 */}
        <div className="app-body">

          {/* PAGE UTAMA */}
          <main className="main">
            <Container fluid>
              <Suspense fallback={this.loading()}>
                
                {/* Melakukan Root dari Route */}
                <Switch>
                  {
                    this.props.routes.map((route, idx) => {
                      return route.component ? (
                        <Route
                          key={idx}
                          path={route.path}
                          exact={route.exact}
                          name={route.name}
                          component={route.component}
                        />
                      ) : (null);
                    })
                  }
                  <Redirect from="/" to={ this.props.redirect_root_to } />
                </Switch>
              </Suspense>
            </Container>
          </main>
          {/* END PAGE UTAMA */}

        </div>
        {/* END BODY */}

        {/* FOOTER APLIKASI KoTA 109 */}
        <Template.AppFooter>
          <Suspense fallback={this.loading()}>
            <Footer />
          </Suspense>
        </Template.AppFooter>
        {/* END FOOTER */}

      </div>
    );
  }
}

export default SiswaLayout;