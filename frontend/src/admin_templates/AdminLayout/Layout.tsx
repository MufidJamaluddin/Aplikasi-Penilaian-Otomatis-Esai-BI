import React, { Component, Suspense } from 'react';
import { Redirect, Route, Switch, RouteComponentProps } from 'react-router-dom';
import { Container } from 'reactstrap';

/**
 * Mendapatkan Navigasi untuk Menu Sidebar
 */
import navigation from '../../_nav';

/**
 * Mendapatkan Konfigurasi Route 
 */
import routes from '../../routes';

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
 * Layout Admin
 */
class Layout extends Component<RouteComponentProps<any>>
{

  public loading() : JSX.Element
  {
    return(
      <div className="animated fadeIn pt-1 text-center">Loading...</div>
    );
  } 

  public signOut(e: Event) : void
  {
    e.preventDefault()
    this.props.history.push('/login')
  }

  public render() : JSX.Element 
  {
    return (
      <div className="app">

        {/* HEADER */}
        <Template.AppHeader fixed>
          <Suspense  fallback={this.loading()}>
            <Header onLogout={(e: any)=>this.signOut(e)}/>
          </Suspense>
        </Template.AppHeader>

        {/* BODY APLIKASI KoPL 9 */}
        <div className="app-body">

          {/* MENU SIDEBAR */}
          <Template.AppSidebar fixed display="lg">
            <Template.AppSidebarHeader />
              <Template.AppSidebarForm />
                <Suspense fallback={this.loading}>
                  <Template.AppSidebarNav navConfig={navigation} {...this.props} />
                </Suspense>
              <Template.AppSidebarFooter />
            <Template.AppSidebarMinimizer />
          </Template.AppSidebar>
          {/* END SIDEBAR */}

          {/* PAGE UTAMA */}
          <main className="main">
            <Template.AppBreadcrumb appRoutes={routes}/>
              <Container fluid>
                <Suspense fallback={this.loading()}>
                  
                  {/* Melakukan Root dari Route */}
                  <Switch>
                    {
                      routes.map((route, idx) => {
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
                    <Redirect from="/" to="/login" />
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