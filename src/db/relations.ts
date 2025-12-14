import { defineRelations } from "drizzle-orm";
import * as schema from "@/db/schema";

export const relations = defineRelations(schema, (r) => ({
  affiliations: {
    characters: r.many.characterAffiliations({ alias: "affiliation" }),
  },
  characters: {
    contractsAsHuman: r.many.characters({
      from: r.characters.id.through(r.contracts.humanId),
      to: r.characters.id.through(r.contracts.devilId),
    }),
    contractsAsDevil: r.many.characters({
      from: r.characters.id.through(r.contracts.devilId),
      to: r.characters.id.through(r.contracts.humanId),
    }),
    relatives: r.many.relatives({ alias: "character1" }),
    affiliations: r.many.characterAffiliations({ alias: "character" }),
    occupations: r.many.characterOccupations({ alias: "character" }),

    aliases: r.many.characterAliases(),
    species: r.one.species({
      from: r.characters.speciesId,
      to: r.species.id,
    }),
    gender: r.one.genders({
      from: r.characters.speciesId,
      to: r.genders.id,
    }),
    birthplace: r.one.locations({
      from: r.characters.birthplaceId,
      to: r.locations.id,
    }),
    status: r.one.statuses({
      from: r.characters.statusId,
      to: r.statuses.id,
    }),
  },
  characterAffiliations: {
    character: r.one.characters({
      from: r.characterAffiliations.characterId,
      to: r.characters.id,
      alias: "character",
    }),
    affiliation: r.one.affiliations({
      from: r.characterAffiliations.affiliationId,
      to: r.affiliations.id,
      alias: "affiliation",
    }),
  },
  characterAliases: {
    character: r.one.characters({
      from: r.characterAliases.characterId,
      to: r.characters.id,
    }),
  },
  characterOccupations: {
    character: r.one.characters({
      from: r.characterAffiliations.characterId,
      to: r.characters.id,
      alias: "character",
    }),
    occupation: r.one.occupations({
      from: r.characterOccupations.occupationId,
      to: r.occupations.id,
      alias: "occupation",
    }),
  },
  // contracts: {
  //   human: r.one.characters({
  //     from: r.contracts.humanId,
  //     to: r.characters.id,
  //     alias: "human",
  //   }),
  //   devil: r.one.characters({
  //     from: r.contracts.devilId,
  //     to: r.characters.id,
  //     alias: "devil",
  //   }),
  // },
  genders: {
    characters: r.many.characters(),
  },
  locations: {
    locationType: r.one.locationTypes({
      from: r.locations.locationTypeId,
      to: r.locationTypes.id,
    }),
    characters: r.many.characters(),
    map: r.one.maps({
      from: r.locations.id,
      to: r.maps.locationId,
    }),
  },
  locationTypes: {
    locations: r.many.locations(),
  },
  // maps: {
  //   location: r.one.locations({
  //     from: r.maps.locationId,
  //     to: r.locations.id,
  //   }),
  // },
  occupations: {
    characters: r.many.characterOccupations({ alias: "occupation" }),
  },
  relatives: {
    character1: r.one.characters({
      from: r.relatives.character1Id,
      to: r.characters.id,
      alias: "character1",
    }),
    character2: r.one.characters({
      from: r.relatives.character2Id,
      to: r.characters.id,
      alias: "character2",
    }),
    relativeType: r.one.relativeTypes({
      from: r.relatives.relativeTypeId,
      to: r.relativeTypes.id,
    }),
  },
  relativeTypes: {
    relatives: r.many.relatives(),
  },
  species: {
    speciesAliases: r.many.speciesAliases(),
    characters: r.many.characters(),
  },
  speciesAliases: {
    species: r.one.species({
      from: r.speciesAliases.speciesId,
      to: r.species.id,
    }),
  },
  statuses: {
    characters: r.many.characters(),
  },
}));
