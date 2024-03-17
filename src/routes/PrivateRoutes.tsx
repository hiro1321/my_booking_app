import React, { useEffect, useState } from 'react';
import { Route, RouteProps, Redirect } from 'react-router-dom';
import { verifyTokenApi } from '../services/api';

interface PrivateRouteProps extends RouteProps {
  component: React.ComponentType<any>;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component: Component,
  ...rest
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const varifyToken = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error();
        }
        await verifyTokenApi(token);
        setIsLoggedIn(true);
      } catch (error: any) {
        // ログイン情報の認証に失敗した場合
        setIsLoggedIn(false);
      } finally {
        // 非同期処理が完了したらisLoadingをfalseに設定する
        setIsLoading(false);
      }
    };

    varifyToken();
  }, []);

  // isLoadingがtrueの間はローディング中とみなしてレンダリングしない
  if (isLoading) {
    return null;
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn ? <Component {...props} /> : <Redirect to='/admin/login' />
      }
    />
  );
};

export default PrivateRoute;
