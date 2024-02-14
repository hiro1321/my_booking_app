import React, { createContext, useContext, useState, useEffect } from 'react';

interface CsrfTokenContextType {
  csrfToken: string;
}

const CsrfTokenContext = createContext<CsrfTokenContextType | null>(null);

const CsrfTokenProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [csrfToken, setCsrfToken] = useState<string>('');

  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/csrf-token');
        if (!response.ok) {
          throw new Error('CSRFトークンを取得できませんでした');
        }
        const data = await response.json();
        console.log('Tokenを取得：' + data.csrfToken);
        setCsrfToken(data.csrfToken);
        const date = new Date();
        date.setTime(date.getTime() + 1 * 24 * 60 * 60 * 1000);
        const expires = 'expires=' + date.toUTCString();
        document.cookie =
          'csrftoken' + '=' + data.csrfToken + ';' + expires + ';path=/';
      } catch (error: any) {
        console.error('CSRFトークン取得エラー:', error.message);
      }
    };

    fetchCsrfToken();
  }, []);

  return (
    <div>
      <CsrfTokenContext.Provider value={{ csrfToken }}>
        {children}
      </CsrfTokenContext.Provider>
    </div>
  );
};

const useCsrfToken = () => {
  const context = useContext(CsrfTokenContext);
  if (context === null) {
    throw new Error('useCsrfToken must be used within a CsrfTokenProvider');
  }
  return context;
};

export { CsrfTokenProvider, useCsrfToken };
