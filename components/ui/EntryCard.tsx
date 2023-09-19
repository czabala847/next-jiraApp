import React from "react";
import { useRouter } from "next/router";
import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  CardActions,
} from "@mui/material";
import { useUIContext } from "@/context/ui";
import { Entry } from "@/interfaces";
import { dateFunctions } from "@/utils";

interface Props {
  entry: Entry;
}

export const EntryCard: React.FC<Props> = ({ entry }) => {
  const { description, createdAt } = entry;
  const router = useRouter();

  const { startDragging, endDragging } = useUIContext();

  const onDragStart = (event: React.DragEvent) => {
    event.dataTransfer.setData("text", entry._id);

    startDragging();
  };

  const onDragEnd = () => {
    endDragging();
  };

  const onClick = () => {
    router.push(`/entries/${entry._id}`);
  };

  return (
    <Card
      sx={{ marginBottom: 1 }}
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onClick={onClick}
    >
      <CardActionArea>
        <CardContent>
          <Typography sx={{ whiteSpace: "pre-line" }}>{description}</Typography>
        </CardContent>

        <CardActions
          sx={{ display: "flex", justifyContent: "end", paddingRight: 2 }}
        >
          <Typography variant="body2">
            {dateFunctions.getFormatDistanceToNow(createdAt)}
          </Typography>
        </CardActions>
      </CardActionArea>
    </Card>
  );
};
