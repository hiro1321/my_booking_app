import { Route, Switch, RouteComponentProps } from 'react-router-dom';
import DashboardPage from '../pages/AdminDashBoard/AdminDashBoard';
import AdminLogin from '../pages/AdminLogin/AdminLogin';
import RoomsPage from '../pages/AdminRooms/AdminRooms';
import RoomsAddPage from '../pages/AdminRoomsAdd/AdminRoomsAdd';
import RoomsEditPage from '../pages/AdminRoomsEdit/AdminRoomsEdit';
import ReservationListPage from '../pages/AdminReservationList/AdminReservationList';
import ReservationDetailPage from '../pages/ReservationDetail/ReservationDetail';

import PrivateRoute from './PrivateRoutes';
import AdminNavbar from '../components/AdminNavbar/AdminNavbar';
import ReservationEdit from '../pages/AdminReservationEdit/AdminReservationEdit';

const AdminRoutes: React.FC<RouteComponentProps> = ({ match }) => {
  return (
    <>
      <AdminNavbar />
      <Switch>
        <Route path={`${match.url}/login`} component={AdminLogin} />
        <PrivateRoute
          path={`${match.url}/dashboard`}
          component={DashboardPage}
        />
        <PrivateRoute exact path={`${match.url}/rooms`} component={RoomsPage} />
        <PrivateRoute
          exact
          path={`${match.url}/rooms/add`}
          component={RoomsAddPage}
        />
        <PrivateRoute
          path={`${match.url}/rooms/edit/:id`}
          component={RoomsEditPage}
        />
        <PrivateRoute
          exact
          path={`${match.url}/reservations`}
          component={ReservationListPage}
        />
        <PrivateRoute
          exact
          path={`${match.url}/reservations/add`}
          component={ReservationDetailPage}
        />
        <PrivateRoute
          exact
          path={`${match.url}/reservations/edit/:id`}
          component={ReservationEdit}
        />
      </Switch>
    </>
  );
};

export default AdminRoutes;
