import { createContext } from "react";

const defaultValue = {
  enums: "",
  setEnums: () => {},
};

export default createContext(defaultValue);
