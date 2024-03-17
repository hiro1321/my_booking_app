import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home/Home';
import Reservation from './pages/Reservation/Reservation';
import Navbar from './components/Navbar/Navbar';
import AdminRoutes from './routes/AdminRoutes';
import ReservationDetailPage from './pages/ReservationDetail/ReservationDetail';
import ReservationSelectRoomPage from './pages/ReservationSelectRoom/ReservationSelectRoom';

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <div className='container'>
          <Switch>
            <Route exact path='/' component={Home} />
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
