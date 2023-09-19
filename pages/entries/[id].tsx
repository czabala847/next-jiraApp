import React, { useState } from "react";
import { GetServerSideProps } from "next";

import {
  capitalize,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  IconButton,
} from "@mui/material";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

import { Layout } from "@/components/layouts";

import { useEntriesContext } from "@/context/entries";
import { Entry, EntryStatus } from "@/interfaces";
import { dbEntries } from "@/database";
import { dateFunctions } from "@/utils";

const validStatus: EntryStatus[] = ["pending", "in-progress", "finished"];

interface Props {
  entry: Entry;
}

const EntryPage: React.FC<Props> = ({ entry }) => {
  const { description, status: statusEntry, createdAt } = entry;

  const [inputValue, setInputValue] = useState<string>(description);
  const [status, setStatus] = useState<EntryStatus>(statusEntry);
  const [touched, setTouched] = useState<boolean>(false);

  const { updateEntry } = useEntriesContext();

  const onTextFieldChanged = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputValue(event.target.value);
  };

  const onStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStatus(event.target.value as EntryStatus);
  };

  const onSave = () => {
    const entryToUpdate: Entry = {
      ...entry,
      status,
      description: inputValue,
    };

    updateEntry(entryToUpdate, true);
  };

  return (
    <Layout title={`${description.substring(0, 20)}...`}>
      <Grid
        container
        justifyContent="center"
        sx={{
          marginTop: 2,
        }}
      >
        <Grid item xs={12} sm={8} md={6}>
          <Card>
            <CardHeader
              title="Entrada:"
              subheader={dateFunctions.getFormatDistanceToNow(createdAt)}
            />

            <CardContent>
              <TextField
                sx={{ marginTop: 2, marginBottom: 1 }}
                fullWidth
                placeholder="Nueva entrada"
                autoFocus
                multiline
                label="Nueva entrada"
                value={inputValue}
                onChange={onTextFieldChanged}
                error={inputValue.length === 0 && touched}
                onBlur={() => setTouched(true)}
              />

              <FormControl>
                <FormLabel>Estado:</FormLabel>
                <RadioGroup row onChange={onStatusChange} value={status}>
                  {validStatus.map((option) => (
                    <FormControlLabel
                      key={option}
                      value={option}
                      control={<Radio />}
                      label={capitalize(option)}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </CardContent>

            <CardActions>
              <Button
                startIcon={<SaveOutlinedIcon />}
                variant="contained"
                fullWidth
                onClick={onSave}
                disabled={inputValue.length === 0}
              >
                Guardar
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>

      <IconButton
        sx={{
          position: "fixed",
          bottom: 30,
          right: 30,
          backgroundColor: "error.dark",
        }}
      >
        <DeleteOutlineOutlinedIcon />
      </IconButton>
    </Layout>
  );
};

export default EntryPage;

//Cuando la persona hace el request, el servidor de next lo genera del lado del servidor no lo almacena en file system con SSG
//Bajo demanda del usuario
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params as { id: string };

  const entry = await dbEntries.getEntryById(id);

  if (!entry) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      entry,
    },
  };
};
