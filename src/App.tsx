import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Reservation from './pages/Reservation';
import Navbar from './pages/Navbar';
import AdminRoutes from './routes/AdminRoutes';
import { CsrfTokenProvider } from './components/CsrfTokenProvider';
import { RoomContextProvider } from './contexts/RoomContext';

const App: React.FC = () => {
  return (
    <Router>
      <CsrfTokenProvider>
        <RoomContextProvider>
          <div>
            <Navbar />
            <div className='container'>
              <Switch>
                <Route exact path='/' component={Home} />
                <Route path='/about' component={About} />
                <Route path='/contact' component={Contact} />
                <Route path='/reservation' component={Reservation} />
                <Route
                  path='/admin'
                  render={(props) => <AdminRoutes {...props} />}
                />
              </Switch>
            </div>
          </div>
        </RoomContextProvider>
      </CsrfTokenProvider>
    </Router>
  );
};

export default App;
