import type { CharacterNewInsertModel } from "@/types";

export const charactersData: CharacterNewInsertModel[] = [
  {
    name: "Denji",
    age: 18,
    height: 173,
    species: { name: "Human", description: null },
    gender: { name: "Male" },
    birthplace: { name: "Japan", locationType: { name: "City" } },
    status: { name: "Alive" },
  },
  {
    name: "Pochita",
    age: null,
    height: null,
    species: {
      name: "Devil",
      description: "Supernatural creatures born from human concepts",
    },
    gender: { name: "Male" },
    birthplace: { name: "Hell", locationType: { name: "World" } },
    status: { name: "Alive" },
  },
  {
    name: "Makima",
    age: null,
    height: 168,
    species: {
      name: "Devil",
      description: "Supernatural creatures born from human concepts",
    },
    gender: { name: "Female" },
    birthplace: { name: "Japan", locationType: { name: "City" } },
    status: { name: "Deceased" },
  },
  // {
  //   name: "Power",
  //   age: null,
  //   height: 170,
  //   species: "Devil",
  //   gender: "Female",
  //   birthplace: "Japan",
  //   status: "Deceased",
  // },
  // {
  //   name: "Aki Hayakawa",
  //   age: null,
  //   height: 182,
  //   species: "Human",
  //   gender: "Male",
  //   birthplace: "Japan",
  //   status: "Deceased",
  // },

  // {
  //   name: "Future Devil",
  //   age: null,
  //   height: null,
  //   species: "Devil",
  //   gender: "Unknown",
  //   birthplace: "Hell",
  //   status: "Alive",
  // },
];
