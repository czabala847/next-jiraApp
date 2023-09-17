import { createContext, useContext } from "react";

interface ContextProps {
  sideMenuOpen: boolean;
  isAddingEntry: boolean;

  //Methods
  closeSideMenu: () => void;
  openSideMenu: () => void;
  setIsAddingEntry: (add: boolean) => void;
}

export const UIContext = createContext({} as ContextProps);

export const useUIContext = () => {
  return useContext(UIContext);
};
