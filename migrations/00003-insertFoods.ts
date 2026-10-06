import type { Sql } from 'postgres';

const foods = [
  {
    id: 1,
    name: 'Carrot',
    type: 'vegetable',
  },
  {
    id: 2,
    name: 'Apple',
    type: 'fruit',
  },
  {
    id: 3,
    name: 'Alfalfa',
    type: 'vegetable',
  },
  {
    id: 4,
    name: 'Banana',
    type: 'fruit',
  },
  {
    id: 5,
    name: 'Spinach',
    type: 'vegetable',
  },
];

export async function up(sql: Sql) {
  for (const food of foods) {
    await sql`
      INSERT INTO
        foods (name, type)
      VALUES
        (
          ${food.name},
          ${food.type}
        )
    `;
  }
}

export async function down(sql: Sql) {
  for (const food of foods) {
    await sql`
      DELETE FROM foods
      WHERE
        id = ${food.id}
    `;
  }
}
