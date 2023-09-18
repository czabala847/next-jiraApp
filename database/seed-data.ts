interface SeedData {
  entries: SeedEntry[];
}

interface SeedEntry {
  description: string;
  status: string;
  createdAt: number;
}

export const seedData: SeedData = {
  entries: [
    {
      createdAt: Date.now(),
      description:
        "Pendiente: Quisque iaculis posuere commodo. Aliquam sit amet pretium orci, sit amet venenatis neque",
      status: "pending",
    },
    {
      createdAt: Date.now() - 1000000,
      description:
        "Progress: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus feugiat semper tristique.",
      status: "in-progress",
    },
    {
      createdAt: Date.now() - 100000,
      description:
        "Finish: Proin velit lectus, commodo et dui quis, varius viverra ipsum.",
      status: "finished",
    },
  ],
};
