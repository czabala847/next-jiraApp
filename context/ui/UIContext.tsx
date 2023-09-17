import { createContext, useContext } from "react";

interface ContextProps {
  sideMenuOpen: boolean;
  isAddingEntry: boolean;
  isDragging: boolean;

  //Methods
  startDragging: () => void;
  setIsAddingEntry: (add: boolean) => void;
  openSideMenu: () => void;
  endDragging: () => void;
  closeSideMenu: () => void;
}

export const UIContext = createContext({} as ContextProps);

export const useUIContext = () => {
  return useContext(UIContext);
};
