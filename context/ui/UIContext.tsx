import { createContext, useContext } from "react";

interface ContextProps {
  sideMenuOpen: boolean;

  //Methods
  closeSideMenu: () => void;
  openSideMenu: () => void;
}

export const UIContext = createContext({} as ContextProps);

export const useUIContext = () => {
  return useContext(UIContext);
};
