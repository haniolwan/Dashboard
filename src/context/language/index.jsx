import {createContext} from 'react';

const defaultValue = {
  language: '',
  setLanguage: () => {},
};

export default createContext(defaultValue);
