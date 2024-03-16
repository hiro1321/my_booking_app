import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Reservation from './pages/Reservation';
import Navbar from './components/Navbar/Navbar';
import AdminRoutes from './routes/AdminRoutes';
import ReservationDetailPage from './pages/ReservationDetailPage';
import ReservationSelectRoomPage from './pages/ReservationSelectRoomPage';

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <div className='container'>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/about' component={About} />
            <Route path='/contact' component={Contact} />
            <Route exact path='/reservation' component={Reservation} />
            <Route
              exact
              path='/reservation/:date'
              component={ReservationSelectRoomPage}
            />
            <Route
              path='/reservation/:date/:roomNumber'
              component={ReservationDetailPage}
            />
            <Route
              path='/admin'
              render={(props) => <AdminRoutes {...props} />}
            />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
