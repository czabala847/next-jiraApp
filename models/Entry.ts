import mongoose, { Model, Schema } from "mongoose";
import { Entry } from "@/interfaces";

interface IEntry extends Entry {}

const entrySchema = new Schema({
  description: { type: String, require: true },
  createdAt: { type: Number },
  status: {
    type: String,
    enum: {
      values: ["pending", "in-progress", "finished"],
      message: "{VALUE} no es un estado permitido", //VALUE es lo que envia el cliente
    },
  },
});

//Si ya existe un Model Entry reutilizarlo si no crear en base al esquema anterior
const EntryModel: Model<IEntry> =
  mongoose.models.Entry || mongoose.model("Entry", entrySchema);

export default EntryModel;
