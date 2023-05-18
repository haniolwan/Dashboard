import { createContext } from "react";

const defaultValue = {
  userInfo: null,
  setUserInfo: () => {},
};

export default createContext(defaultValue);
