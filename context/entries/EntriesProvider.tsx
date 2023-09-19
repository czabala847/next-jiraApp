import { useReducer, useEffect } from "react";
import { useSnackbar } from "notistack";

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
  const { enqueueSnackbar } = useSnackbar();

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

  const updateEntry = async (
    { _id, description, status }: Entry,
    showSnackbar: boolean = false
  ) => {
    try {
      const { data } = await entriesApi.put<Entry>(`/entries/${_id}`, {
        description,
        status,
      });
      dispatch({ type: "[Entry] - Updated-Entry", payload: data });

      if (showSnackbar) {
        enqueueSnackbar("Entrada Actualizada", {
          variant: "success",
          autoHideDuration: 1500,
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        });
      }
    } catch (error) {
      console.error("Error updateEntry", error);
    }
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
