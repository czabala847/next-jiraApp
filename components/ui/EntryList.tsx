import React, { useMemo } from "react";
import { Paper, List } from "@mui/material";
import { EntryCard } from ".";
import { useEntriesContext } from "@/context/entries";
import { EntryStatus } from "@/interfaces";

interface Props {
  status: EntryStatus;
}

export const EntryList: React.FC<Props> = ({ status }) => {
  const { entries } = useEntriesContext();

  //   const entriesByStatus = entries.filter((entry) => entry.status === status);

  const entriesByStatus = useMemo(() => {
    return entries.filter((entry) => entry.status === status);
  }, [entries, status]);

  return (
    <div>
      <Paper
        sx={{
          height: "calc(100vh - 250px)",
          overflow: "scroll",
          backgroundColor: "transparent",
          padding: "1px 5px ",
        }}
      >
        <List sx={{ opacity: 1 }}>
          {entriesByStatus.map((entry) => (
            <EntryCard key={entry._id} entry={entry} />
          ))}
        </List>
      </Paper>
    </div>
  );
};
