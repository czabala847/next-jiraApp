import type { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import { db } from "@/database";
import { Entry, IEntry } from "@/models";

type Data = { message: string } | IEntry;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { id } = req.query;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: "El id no es válido" + id });
  }

  switch (req.method) {
    case "PUT":
      return updateEntry(req, res);

    default:
      return res.status(400).json({ message: "Endpoint no exite" });
  }
}

const updateEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  db.connect();
  const { id } = req.query;

  const entryToUpdate = await Entry.findById(id);

  if (!entryToUpdate) {
    return res.status(400).json({ message: "Entrada no existe" });
  }

  const {
    description = entryToUpdate.description,
    status = entryToUpdate.status,
  } = req.body;

  try {
    //   runValidators = Volver a ejecutar las validaciones
    //   new = Devolver el nuevo objeto actualizado

    const entryUpdate = await Entry.findByIdAndUpdate(
      id,
      { description, status },
      { runValidators: true, new: true }
    );

    db.disconnect();

    return res.status(200).json(entryUpdate!);
  } catch (error: any) {
    await db.disconnect();
    return res.status(400).json({ message: error.error.status.message });
  }
};
