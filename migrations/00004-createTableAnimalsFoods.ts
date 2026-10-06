import type { Sql } from 'postgres';

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE animals_foods (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      -- ON DELETE CASCADE: If animal deleted, automatically
      -- delete any animals_foods records referencing that animal
      animal_id integer NOT NULL REFERENCES animals (id) ON DELETE CASCADE,
      -- Without ON DELETE CASCADE: PostgreSQL will throw an
      -- error if you try to delete a food that is referenced
      -- by an animals_foods record
      food_id integer NOT NULL REFERENCES foods (id),
      -- Prevent duplicate records for the same animal and food
      UNIQUE (animal_id, food_id)
    )
  `;
}

export async function down(sql: Sql) {
  await sql`DROP TABLE animals_foods`;
}
