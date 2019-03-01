import React, { Component, Suspense } from 'react';
import { Redirect, Route, Switch, RouteComponentProps } from 'react-router-dom';
import { Container } from 'reactstrap';

// sidebar nav config
import navigation from '../../_nav';
// routes config
import routes from '../../routes';

var Template = require('@coreui/react/lib');

const DefaultAside = React.lazy(() => import('./DefaultAside'));
const DefaultFooter = React.lazy(() => import('./DefaultFooter'));
const DefaultHeader = React.lazy(() => import('./DefaultHeader'));

class DefaultLayout extends Component<RouteComponentProps<any>>
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
        <Template.AppHeader fixed>
          <Suspense  fallback={this.loading()}>
            <DefaultHeader onLogout={(e: any)=>this.signOut(e)}/>
          </Suspense>
        </Template.AppHeader>
        <div className="app-body">
          <Template.AppSidebar fixed display="lg">
            <Template.AppSidebarHeader />
              <Template.AppSidebarForm />
                <Suspense fallback={this.loading}>
                  <Template.AppSidebarNav navConfig={navigation} {...this.props} />
                </Suspense>
              <Template.AppSidebarFooter />
            <Template.AppSidebarMinimizer />
          </Template.AppSidebar>
          <main className="main">
            <Template.AppBreadcrumb appRoutes={routes}/>
            <Container fluid>
              <Suspense fallback={this.loading()}>
                <Switch>
                  {routes.map((route, idx) => {
                    return route.component ? (
                      <Route
                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        name={route.name}
                        component={route.component}
                        /*render={props => (
                          <route.component {...props} />
                        ) } */
                      />
                    ) : (null);
                  })}
                  <Redirect from="/" to="/login" />
                </Switch>
              </Suspense>
            </Container>
          </main>
          <Template.AppAside fixed>
            <Suspense fallback={this.loading()}>
              <DefaultAside />
            </Suspense>
          </Template.AppAside>
        </div>
        <Template.AppFooter>
          <Suspense fallback={this.loading()}>
            <DefaultFooter />
          </Suspense>
        </Template.AppFooter>
      </div>
    );
  }
}

export default DefaultLayout;