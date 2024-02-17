import React, { FC, ReactNode, createContext, useState } from 'react';

type Props = {
  children: ReactNode;
};

export const AuthContext = createContext(
  {} as {
    isLoggedIn: boolean;
    login: () => void;
    logout: () => void;
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  }
);

export const AuthProvider: FC<Props> = (props) => {
  const { children } = props;
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};
