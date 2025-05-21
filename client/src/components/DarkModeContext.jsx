import { createContext } from "react";

const DarkModeContext = createContext({
  dark: false,
  setDark: () => {},
});

export default DarkModeContext;
