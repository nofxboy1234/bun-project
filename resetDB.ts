import { sql } from "bun";

export const resetDB = async () => {
  await sql`
  TRUNCATE TABLE
    statuses,
    location_types,
    locations,
    character_aliases,
    genders,
    species_aliases,
    species,
    maps,
    relative_types,
    relatives,
    contracts,
    characters,
    character_affiliations,
    affiliations,
    character_occupations,
    occupations
  RESTART IDENTITY CASCADE
  `;

  console.log("Database reset successfully!");
};
