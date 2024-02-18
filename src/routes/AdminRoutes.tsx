import React, { useContext, useEffect } from 'react';
import { Route, Switch, RouteComponentProps, Redirect } from 'react-router-dom';
import DashboardPage from '../pages/Admn/DashBoard';
import AdminLogin from '../pages/Admn/AdminLogin';
import RoomsPage from '../pages/Admn/RoomsPage';
import RoomsAddPage from '../pages/Admn/RoomsAddPage';
import RoomsEditPage from '../pages/Admn/RoomsEditPage';
import PrivateRoute from './PrivateRoutes';
import AdminNavbar from '../pages/Admn/AdminNavbar';

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
      </Switch>
    </>
  );
};

export default AdminRoutes;
