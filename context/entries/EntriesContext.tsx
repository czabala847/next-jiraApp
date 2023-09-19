import { createContext, useContext } from "react";
import { Entry } from "@/interfaces";

interface ContextProps {
  entries: Entry[];

  //Actions
  addNewEntry: (description: string) => void;
  updateEntry: (entry: Entry, showSnackbar?: boolean) => void;
}

export const EntriesContext = createContext({} as ContextProps);

export const useEntriesContext = () => {
  return useContext(EntriesContext);
};
