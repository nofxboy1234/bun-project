import type { Kysely } from "kysely";

// `any` is required here since migrations should be frozen in time. alternatively, keep a "snapshot" db interface.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable("pet")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("name", "varchar", (col) => col.notNull().unique())
    .addColumn("owner_id", "integer", (col) =>
      col.references("person.id").onDelete("cascade"),
    )
    .addColumn("species", "varchar", (col) => col.notNull())
    .execute();

  await db.schema
    .createIndex("pet_owner_id_index")
    .on("pet")
    .column("owner_id")
    .execute();
}

// `any` is required here since migrations should be frozen in time. alternatively, keep a "snapshot" db interface.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable("pet").execute();
}
