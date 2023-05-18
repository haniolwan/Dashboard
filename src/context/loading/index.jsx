import {createContext} from 'react';

const defaultValue = {
  loading: true,
  setLoading: () => {},
};

export default createContext(defaultValue);
