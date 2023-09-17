import { useReducer } from "react";
import { v4 as uuidv4 } from "uuid";

import { EntriesContext, entriesReducer } from "./";
import { Entry } from "@/interfaces";

export interface EntriesState {
  entries: Entry[];
}

const UI_INITIAL_STATE: EntriesState = {
  entries: [
    {
      _id: uuidv4(),
      createdAt: Date.now(),
      description:
        "Pendiente: Quisque iaculis posuere commodo. Aliquam sit amet pretium orci, sit amet venenatis neque",
      status: "pending",
    },
    {
      _id: uuidv4(),
      createdAt: Date.now() - 1000000,
      description:
        "Progress: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus feugiat semper tristique.",
      status: "in-progress",
    },
    {
      _id: uuidv4(),
      createdAt: Date.now() - 100000,
      description:
        "Finish: Proin velit lectus, commodo et dui quis, varius viverra ipsum.",
      status: "finished",
    },
  ],
};

interface EntriesProviderProps {
  children: JSX.Element | JSX.Element[];
}

export const EntriesProvider: React.FC<EntriesProviderProps> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(entriesReducer, UI_INITIAL_STATE);

  return (
    <EntriesContext.Provider value={{ ...state }}>
      {children}
    </EntriesContext.Provider>
  );
};
