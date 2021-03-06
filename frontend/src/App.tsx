import React, { Component } from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Loadable from 'react-loadable';
import '@coreui/icons/css/all.css';
import 'font-awesome/css/font-awesome.min.css';
import 'simple-line-icons/scss/simple-line-icons.scss';
import './App.scss';
import { LayoutAdmin, SiswaLayout, Loading } from './layout';
import { GURU_NAV, STAF_TU_NAV } from './navs';
import API from './models/api';
import { GURU_ROUTES, STAF_TU_ROUTES, SISWA_ROUTES } from './routes';

/**
 * Deklarasi Komponen
 */
const Login = Loadable({
  loader: () => import('./views/user/Login'),
  loading(){ return Loading }
});

const Gantipassword = Loadable({
  loader: () => import('./views/user/Gantipassword'),
  loading(){ return Loading }
});

/**
 * Aplikasi
 */
interface AppState { 
  role: string; 
  unchecked_role: boolean; 
  pesan_login?:string; 
  auth:boolean; 
  username?:string;
  nama?:string;
  pelaksanaanujian?:string;
}

interface LoginResponse { role:string; pesan?:string; nama:string; username:string; pelaksanaanujian?:string; }

class App extends Component<{}, AppState>
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
    
    API<AppState>(url).then(value => {
      var auth = value.role === 'guru' || value.role === 'siswa' || value.role === 'staftu';
      this.setState({ 
        role: value.role, 
        unchecked_role:false, 
        auth: auth, 
        nama: value.nama,
        username: value.username,
        pelaksanaanujian: value.pelaksanaanujian
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

    API<LoginResponse>('/api/auth', { 
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
        pesan_login: value.pesan,
        pelaksanaanujian: value.pelaksanaanujian
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
    var redirect_ujian = "/persiapan";

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
        
        if(this.state.pelaksanaanujian) 
          redirect_ujian = "/ujian/" + this.state.pelaksanaanujian

        return(
          <Route path="/" render={props => <SiswaLayout 
            routes={ SISWA_ROUTES } 
            onLogout={ this.onLogout }
            nama = { this.state.nama || ''}
            redirect_root_to={ redirect_ujian }
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
    if (this.state.unchecked_role) return(Loading);
    
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