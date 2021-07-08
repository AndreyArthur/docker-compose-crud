import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

  await knex.raw(`
    CREATE TABLE posts (
      id UUID UNIQUE NOT NULL DEFAULT uuid_generate_v4(),
      content VARCHAR NOT NULL
    )
  `)
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw('DROP TABLE posts');

  await knex.raw('DROP EXTENSION IF EXISTS "uuid-ossp"')
}

