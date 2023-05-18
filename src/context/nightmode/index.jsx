import {createContext} from 'react';

const defaultValue = {
  nightMode: false,
  setNightMode: () => {},
};

export default createContext(defaultValue);
