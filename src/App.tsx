// App.tsx

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Reservation from './pages/Reservation';
import Navbar from './pages/Navbar';
import AdminLogin from './pages/Admn/AdminLogin';
import { CsrfTokenProvider } from './components/CsrfTokenProvider';
import DashboardPage from './pages/Admn/DashBoard';

const App: React.FC = () => {
  return (
    <Router>
      <CsrfTokenProvider>
        <div>
          <Navbar />
          <div className='container'>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route path='/about' component={About} />
              <Route path='/contact' component={Contact} />
              <Route path='/reservation' component={Reservation} />
              <Route path='/admin/login' component={AdminLogin} />
              <Route path='/admin/dashboard' component={DashboardPage} />
            </Switch>
          </div>
        </div>
      </CsrfTokenProvider>
    </Router>
  );
};

export default App;
