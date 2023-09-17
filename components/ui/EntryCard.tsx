import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  CardActions,
} from "@mui/material";
import { Entry } from "@/interfaces";

interface Props {
  entry: Entry;
}

export const EntryCard: React.FC<Props> = ({ entry }) => {
  const { description } = entry;
  return (
    <Card sx={{ marginBottom: 1 }}>
      <CardActionArea>
        <CardContent>
          <Typography sx={{ whiteSpace: "pre-line" }}>{description}</Typography>
        </CardContent>

        <CardActions
          sx={{ display: "flex", justifyContent: "end", paddingRight: 2 }}
        >
          <Typography variant="body2">hace 30 minutos</Typography>
        </CardActions>
      </CardActionArea>
    </Card>
  );
};
