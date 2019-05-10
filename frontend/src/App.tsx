import React, { Component } from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Loadable from 'react-loadable';
import '@coreui/icons/css/coreui-icons.min.css';
import 'font-awesome/css/font-awesome.min.css';
import 'simple-line-icons/scss/simple-line-icons.scss';
import './App.scss';
import { LayoutAdmin } from './layout';
import { GURU_ROUTES, STAF_TU_ROUTES } from './admin_views/routes';
import { GURU_NAV, STAF_TU_NAV } from './admin_views/nav';
import API from './models/api';
import { SISWA_ROUTES } from './page_views/routes';
import SiswaLayout from './page_views/Layout';

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

const Gantipassword = Loadable({
  loader: () => import('./page_views/Gantipassword/Gantipassword'),
  loading
});

/**
 * Aplikasi
 */
interface AppModel { 
  role: string; 
  unchecked_role: boolean; 
  pesan_login?:string; 
  auth:boolean; 
  username?:string;
  nama?:string;
}

interface LoginResponse { role:string; pesan?:string; nama:string; username:string; }

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
      role: '',
      unchecked_role: true,
      auth: false
    };

    this.onLoginSubmit = this.onLoginSubmit.bind(this);
    this.onLogout = this.onLogout.bind(this);
  }

  /**
   * Mengambil Role Saat Ini dari API
   */
  public componentDidMount() : void
  {
    let url = '/api/auth';
    
    API<AppModel>(url).then(value => {
      var auth = value.role === 'guru' || value.role === 'siswa' || value.role === 'staftu';
      this.setState({ 
        role: value.role, 
        unchecked_role:false, 
        auth: auth, 
        nama: value.nama,
        username: value.username
      });
    });
  }


  /**
   * Handle Login
   */
  onLoginSubmit(event:any)
  {
    event.preventDefault();

    var fdata = new FormData(event.target);
    var data = {
      username: fdata.get('username'),
      password: fdata.get('password')
    };

    API<LoginResponse>('api/auth', { 
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    })
    .then((value)=>{
      console.log(value);
      var auth = value.role === 'guru' || value.role === 'siswa' || value.role === 'staftu';
      this.setState({ 
        role: value.role, 
        unchecked_role:false, 
        auth: auth, 
        nama: value.nama,
        username: value.username,
        pesan_login: value.pesan
      });
    });
  }

  /**
   * Logout
   */
  onLogout(event: any)
  {
    var username = this.state.username;
    if(username === undefined) return;

    API<LoginResponse>('/api/auth/'+ username, { 
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'},
      body: "{}"
    })
    .then((val)=>{
      this.setState({ 
        role: '',
        auth: false,
        nama: '',
        username: ''
      });
    });
  }

  /**
   * Mendapatkan Komponen Routes by Role
   */
  private getRoutesByRole()
  {
    switch(this.state.role)
    {    
      case 'staftu':
        return(
          <Route path="/" render={props => <LayoutAdmin 
            admin_routes={ STAF_TU_ROUTES } 
            admin_nav={ STAF_TU_NAV }
            onLogout={ this.onLogout }
            nama = { this.state.nama || ''}
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
            onLogout={ this.onLogout }
            nama = { this.state.nama || ''}
            redirect_root_to="/ujian"
            {...props}
            />}
          />
        );
      
      case 'siswa':
        return(
          <Route path="/" render={props => <SiswaLayout 
            routes={ SISWA_ROUTES } 
            onLogout={ this.onLogout }
            nama = { this.state.nama || ''}
            redirect_root_to="/persiapan"
            {...props}
            />}
          />
        );
    }
  }

  /**
   * Render Aplikasi
   */
  public render()
  {
    if (this.state.unchecked_role) return(
      <div className="d-flex justify-content-center">
        <div className="spinner-border text-success" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
    
    if(this.state.auth) return (
      <BrowserRouter>
          <Switch>
            <Route exact path="/gantipassword" name="Ganti Password" component={Gantipassword} />
            { this.getRoutesByRole() }
          </Switch>
      </BrowserRouter>
    );
    else return(
      <Login onLoginSubmit={this.onLoginSubmit} pesan={this.state.pesan_login}></Login>
    );
  }
}

export default App;