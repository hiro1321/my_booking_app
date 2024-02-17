import React, { useContext, useEffect } from 'react';
import { Route, Switch, RouteComponentProps, Redirect } from 'react-router-dom';
import DashboardPage from '../pages/Admn/DashBoard';
import AdminLogin from '../pages/Admn/AdminLogin';
import RoomsPage from '../pages/Admn/RoomsPage';
import RoomsAddPage from '../pages/Admn/RoomsAddPage';
import RoomsEditPage from '../pages/Admn/RoomsEditPage';

const AdminRoutes: React.FC<RouteComponentProps> = ({ match }) => {
  // const { isLoggedIn } = useContext(AuthContext);
  // useEffect(() => {
  //   console.log('isLoggedInの値が変更');
  //   console.log(isLoggedIn);
  // }, [isLoggedIn]);

  return (
    <Switch>
      <Route path={`${match.url}/login`} component={AdminLogin} />
      <Route path={`${match.url}/dashboard`} component={DashboardPage} />
      <Route exact path={`${match.url}/rooms`} component={RoomsPage} />
      <Route exact path={`${match.url}/rooms/add`} component={RoomsAddPage} />
      <Route path={`${match.url}/rooms/edit/:id`} component={RoomsEditPage} />
    </Switch>
  );
};

export default AdminRoutes;
