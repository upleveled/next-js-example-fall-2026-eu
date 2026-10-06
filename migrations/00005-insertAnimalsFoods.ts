import type { Sql } from 'postgres';

const animalsFoods = [
  {
    animalId: 1,
    foodId: 4,
  },
  {
    animalId: 1,
    foodId: 2,
  },
  {
    animalId: 2,
    foodId: 3,
  },
  {
    animalId: 2,
    foodId: 4,
  },
  {
    animalId: 4,
    foodId: 1,
  },
  {
    animalId: 4,
    foodId: 3,
  },
  {
    animalId: 5,
    foodId: 1,
  },
];

export async function up(sql: Sql) {
  for (const animalFood of animalsFoods) {
    await sql`
      INSERT INTO
        animals_foods (animal_id, food_id)
      VALUES
        (
          ${animalFood.animalId},
          ${animalFood.foodId}
        )
    `;
  }
}

export async function down(sql: Sql) {
  for (const animalFood of animalsFoods) {
    await sql`
      DELETE FROM animals_foods
      WHERE
        animal_id = ${animalFood.animalId}
        AND food_id = ${animalFood.foodId}
    `;
  }
}
