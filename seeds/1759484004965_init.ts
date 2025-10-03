import type { Kysely } from "kysely";
import { faker } from "@faker-js/faker";
import { createPerson } from "@/PersonRepository";
import type { NewPerson } from "@/types";
import type { Database } from "@/types";

// replace `any` with your database interface.
export async function seed(db: Kysely<Database>): Promise<void> {
  const person: NewPerson = {
    first_name: faker.person.firstName("female"),
    gender: "woman",
  };
  const dbPerson = createPerson(person);

  // // Create and insert a mother person first
  // const mother = await db
  //   .insertInto("person")
  //   .values({
  //     first_name: faker.person.firstName(),
  //     last_name: faker.person.lastName(),
  //     gender: "female",
  //   })
  //   .returningAll()
  //   .executeTakeFirstOrThrow();

  // // Create 9 more people with the mother_id set
  // const people = [];
  // for (let i = 0; i < 9; i++) {
  //   people.push({
  //     first_name: faker.person.firstName(),
  //     last_name: faker.person.lastName(),
  //     gender: faker.person.gender(),
  //     mother_id: mother.id,
  //   });
  // }

  // // Insert the rest of the people
  // const insertedPeople = await db
  //   .insertInto("person")
  //   .values(people)
  //   .returningAll()
  //   .execute();

  // const allPeople = [mother, ...insertedPeople];

  // // Create 5 pets
  // const pets = [];
  // for (let i = 0; i < 5; i++) {
  //   const owner = allPeople[Math.floor(Math.random() * allPeople.length)];
  //   pets.push({
  //     name: faker.animal.cat(),
  //     owner_id: owner!.id,
  //     species: "Cat",
  //   });
  // }

  // // Insert pets
  // await db.insertInto("pet").values(pets).execute();
}
