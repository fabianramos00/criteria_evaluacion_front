import { createContext, useState } from 'react';

export const TotalContext = createContext({
  setTotal: () => {},
  total: 0,
  repositoryName: '',
  setRepositoryName: () => {},
});

export const TotalProvider = ({ children }) => {
  const [total, setTotal] = useState(0);
  const [repositoryName, setRepositoryName] = useState('');

  return (
    <TotalContext.Provider value={{ setTotal, total, repositoryName, setRepositoryName }}>
      {children}
    </TotalContext.Provider>
  );
};
