import React, { Component } from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Loadable from 'react-loadable';
import '@coreui/icons/css/coreui-icons.min.css';
import 'font-awesome/css/font-awesome.min.css';
import 'simple-line-icons/scss/simple-line-icons.scss';
import './App.scss';

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

// Containers
const DefaultLayout = Loadable({
  loader: () => import('./containers/DefaultLayout'),
  loading
});

// Pages
const Login = Loadable({
  loader: () => import('./views/Pages/Login/Login'),
  loading
});

const UjianEsai = Loadable({
  loader: () => import('./views/Pages/UjianEsai/UjianEsai'),
  loading
});

const BukanUjian = Loadable({
  loader: () => import('./views/Pages/BukanUjian/BukanUjian'),
  loading
});


const Gantipassword = Loadable({
  loader: () => import('./views/Pages/Gantipassword/Gantipassword'),
  loading
});

class App extends Component 
{
  render() 
  {
    return (
      <BrowserRouter>
          <Switch>
            <Route exact path="/login" name="Login Page" component={Login} />
            <Route exact path="/gantipassword" name="Ganti Password" component={Gantipassword} />
            <Route exact path="/ujianesai" name="Ujian Esai" component={UjianEsai} />
            <Route exact path="/bukanujian" name="Bukan Ujian" component={BukanUjian} />
            <Route path="/" name="Home" component={DefaultLayout} />
          </Switch>
      </BrowserRouter>
    );
  }
}

export default App;