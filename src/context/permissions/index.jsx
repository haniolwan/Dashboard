import { createContext } from "react";

const defaultValue = {
  permissions: [],
  setPermissions: () => {},
};

export default createContext(defaultValue);
