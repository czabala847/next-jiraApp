import { useReducer, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

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

  const addNewEntry = (description: string) => {
    const newEntry: Entry = {
      _id: uuidv4(),
      createdAt: Date.now(),
      description,
      status: "pending",
    };

    dispatch({ type: "[Entry] - Add-Entry", payload: newEntry });
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
