import React, { useMemo } from "react";
import { Paper, List } from "@mui/material";
import { EntryCard } from ".";

import { useEntriesContext } from "@/context/entries";
import { useUIContext } from "@/context/ui";

import { EntryStatus } from "@/interfaces";

import Styles from "./EntryList.module.css";

interface Props {
  status: EntryStatus;
}

export const EntryList: React.FC<Props> = ({ status }) => {
  const { entries, updateEntry } = useEntriesContext();
  const { isDragging, endDragging } = useUIContext();

  //   const entriesByStatus = entries.filter((entry) => entry.status === status);

  const entriesByStatus = useMemo(() => {
    return entries.filter((entry) => entry.status === status);
  }, [entries, status]);

  const allowDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const onDropEntry = (event: React.DragEvent<HTMLDivElement>) => {
    const id = event.dataTransfer.getData("text");

    const entry = entries.find((entry) => entry._id === id)!;
    updateEntry({ ...entry, status });
    endDragging();
  };

  return (
    <div
      onDrop={onDropEntry}
      onDragOver={allowDrop}
      className={isDragging ? Styles.dragging : ""}
    >
      <Paper
        sx={{
          height: "calc(100vh - 250px)",
          overflow: "scroll",
          backgroundColor: "transparent",
          padding: "1px 5px ",
        }}
      >
        <List sx={{ opacity: isDragging ? 0.2 : 1, transition: "all .3s" }}>
          {entriesByStatus.map((entry) => (
            <EntryCard key={entry._id} entry={entry} />
          ))}
        </List>
      </Paper>
    </div>
  );
};
