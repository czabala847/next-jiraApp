import { useReducer, useEffect } from "react";

import { EntriesContext, entriesReducer } from "./";
import { Entry } from "@/interfaces";
import { entriesApi } from "@/apis";

export interface EntriesState {
  entries: Entry[];
}

const UI_INITIAL_STATE: EntriesState = {
  entries: [],
};

interface EntriesProviderProps {
  children: JSX.Element | JSX.Element[];
}

export const EntriesProvider: React.FC<EntriesProviderProps> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(entriesReducer, UI_INITIAL_STATE);

  const addNewEntry = async (description: string) => {
    try {
      const { data } = await entriesApi.post<Entry>("/entries", {
        description,
      });

      dispatch({ type: "[Entry] - Add-Entry", payload: data });
    } catch (error) {
      console.error("Error addNewEntry", error);
    }
  };

  const updateEntry = (entry: Entry) => {
    dispatch({ type: "[Entry] - Updated-Entry", payload: entry });
  };

  const getEntries = async () => {
    try {
      const { data } = await entriesApi.get<Entry[]>("/entries");
      dispatch({ type: "[Entry] - Refresh-Entry", payload: data });
    } catch (error) {
      console.error("Error getEntries", error);
    }
  };

  useEffect(() => {
    getEntries();
  }, []);

  return (
    <EntriesContext.Provider value={{ ...state, addNewEntry, updateEntry }}>
      {children}
    </EntriesContext.Provider>
  );
};
