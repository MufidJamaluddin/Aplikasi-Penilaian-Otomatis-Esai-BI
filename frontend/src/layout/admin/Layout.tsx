import React, { Component, Suspense } from 'react';
import { Redirect, Route, Switch, RouteComponentProps } from 'react-router-dom';
import { Container } from 'reactstrap';

/**
 * Template CoreUI
 */
var Template = require('@coreui/react/lib');

/**
 * Komponen Header dan Footer
 */
const Footer = React.lazy(() => import('./Footer'));
const Header = React.lazy(() => import('./Header'));

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

interface NavigationItem
{
    name: string;
    url: string;
    icon: string;
    badge?: any; 
}

interface SidebarNavConfig { items: Array<NavigationItem>; }

interface AdminLayoutModel
{
    admin_routes: Array<RouteConfigItem>;
    admin_nav: SidebarNavConfig;
    redirect_root_to: string;
    onLogout: (e:any) => void;
    nama: string;
}

/**
 * Layout Admin
 */
class Layout extends Component<RouteComponentProps<any> & AdminLayoutModel>
{

  public loading() : JSX.Element
  {
    return(
      <div className="d-flex justify-content-center">
        <div className="spinner-border text-success" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
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

          {/* MENU SIDEBAR */}
          <Template.AppSidebar fixed display="lg">
            <Template.AppSidebarHeader />
              <Template.AppSidebarForm />
                <Suspense fallback={this.loading}>
                  <Template.AppSidebarNav navConfig={ this.props.admin_nav } {...this.props} />
                </Suspense>
              <Template.AppSidebarFooter />
            <Template.AppSidebarMinimizer />
          </Template.AppSidebar>
          {/* END SIDEBAR */}

          {/* PAGE UTAMA */}
          <main className="main">
            <Template.AppBreadcrumb appRoutes={ this.props.admin_routes }/>
              <Container fluid>
                <Suspense fallback={this.loading()}>
                  
                  {/* Melakukan Root dari Route */}
                  <Switch>
                    {
                      this.props.admin_routes.map((route, idx) => {
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

        {/* FOOTER APLIKASI KoPL 9 */}
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

export default Layout;