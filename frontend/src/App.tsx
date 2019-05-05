import React, { Component } from 'react';
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';
import Loadable from 'react-loadable';
import '@coreui/icons/css/coreui-icons.min.css';
import 'font-awesome/css/font-awesome.min.css';
import 'simple-line-icons/scss/simple-line-icons.scss';
import './App.scss';
import { LayoutAdmin } from './layout';
import { GURU_ROUTES, STAF_TU_ROUTES } from './admin_views/routes';
import { GURU_NAV, STAF_TU_NAV } from './admin_views/nav';
import API from './ApiResource';

/**
 * Deklarasi Komponen
 */
const loading = () => 
<div className="spinner-border spinner-lg text-success text-center" role="status">
  <span className="sr-only">Loading...</span>
</div>;

const Login = Loadable({
  loader: () => import('./page_views/Login/Login'),
  loading
});

const UjianEsai = Loadable({
  loader: () => import('./page_views/UjianEsai/UjianEsai'),
  loading
});

const PersiapanUjian = Loadable({
  loader: () => import('./page_views/PersiapanUjian/PersiapanUjian'),
  loading
});

const Gantipassword = Loadable({
  loader: () => import('./page_views/Gantipassword/Gantipassword'),
  loading
});

/**
 * Aplikasi
 */
interface AppModel { role: string; }

class App extends Component<{}, AppModel>
{

  /**
   * Konstruktor
   * Inisialisasi State
   */
  constructor(props: any)
  {
    super(props);
    this.state = {
      role: ''
    };
  }

  /**
   * Mengambil Role Saat Ini dari API
   */
  public componentWillMount() : void
  {
    let url = '/api/auth';
    
    API<AppModel>(url).then(value => {
      this.setState({ role: value.role });
    });
  }

  /**
   * Mendapatkan Komponen Routes by Role
   */
  private getRoutesByRole() : JSX.Element
  {
    switch(this.state.role)
    {    
      case 'staftu':
        return(
          <Route path="/" render={props => <LayoutAdmin 
            admin_routes={ STAF_TU_ROUTES } 
            admin_nav={ STAF_TU_NAV }
            redirect_root_to="/kelas"
            {...props}
            />}
          />
        );

      case 'guru':
        return(
          <Route path="/" render={props => <LayoutAdmin 
            admin_routes={ GURU_ROUTES } 
            admin_nav={ GURU_NAV }
            redirect_root_to="/profil"
            {...props}
            />}
          />
        );
      
      case 'siswa':
        return(
          <div>
            <Route path="/ujianesai" name="Ujian Esai" component={UjianEsai} />
            <Route path="/" name="Persiapan Ujian" component={PersiapanUjian} />
          </div>
        );
      
      default:
        return(
          <Route exact path="/login" name="Login Page" component={Login} />
        );
    }
  }

  /**
   * Render Aplikasi
   */
  public render() : JSX.Element
  {
    return (
      <BrowserRouter>
          <Switch>
            <Route exact path="/login" name="Login Page" component={Login} />
            <Route exact path="/gantipassword" name="Ganti Password" component={Gantipassword} />
            { this.getRoutesByRole() }
          </Switch>
      </BrowserRouter>
    );
  }
}

export default App;