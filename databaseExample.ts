import { config } from 'dotenv-safe';
import postgres from 'postgres';
import type { Animal } from './migrations/00000-createTableAnimals';

// Read in values from .env file to process.env
config();

const sql = postgres({
  transform: {
    ...postgres.camel,
    undefined: null,
  },
});

// const animals = await sql`
//   SELECT
//     *
//   FROM
//     animals
// `;

// console.log(animals);

// // Read first animal and destructure to variable
// const [animal] = await sql`
//   SELECT
//     *
//   FROM
//     animals
//   WHERE
//     id = 1
// `;

// console.log(animal);

// async function createAnimalInsecure(newAnimal: Omit<Animal, 'id'>) {
//   return await sql<Animal[]>`
//     INSERT INTO
//       animals (
//         first_name,
//         type,
//         accessory,
//         birth_date
//       )
//     VALUES
//       (
//         ${newAnimal.firstName},
//         ${newAnimal.type},
//         ${newAnimal.accessory},
//         ${newAnimal.birthDate}
//       )
//     RETURNING
//       animals.*
//   `;
// }

// async function updateAnimalInsecure(updatedAnimal: Animal) {
//   return await sql<Animal[]>`
//     UPDATE animals
//     SET
//       first_name = ${updatedAnimal.firstName},
//       type = ${updatedAnimal.type},
//       accessory = ${updatedAnimal.accessory},
//       birth_date = ${updatedAnimal.birthDate}
//     WHERE
//       id = ${updatedAnimal.id}
//     RETURNING
//       animals.*
//   `;
// }

// async function deleteAnimalInsecure(animalToDelete: Pick<Animal, 'id'>) {
//   return await sql<Animal[]>`
//     DELETE FROM animals
//     WHERE
//       id = ${animalToDelete.id}
//     RETURNING
//       animals.*
//   `;
// }

// type AnimalWithFoodsInnerJoin = Animal & {
//   foodId: number;
//   foodName: string;
//   foodType: string;
// };

// async function getAnimalsWithFoodsInsecureInnerJoin() {
//   return await sql<AnimalWithFoodsInnerJoin[]>`
//     SELECT
//       animals.id,
//       animals.first_name,
//       animals.type,
//       animals.accessory,
//       animals.birth_date,
//       foods.id AS food_id,
//       foods.name AS food_name,
//       foods.type AS food_type
//     FROM
//       animals
//       INNER JOIN animals_foods ON animals.id = animals_foods.animal_id
//       INNER JOIN foods ON animals_foods.food_id = foods.id
//   `;
// }

type AnimalWithFoods = Animal & {
  foodId: number | null;
  foodName: string | null;
  foodType: string | null;
};

async function getAnimalsWithFoodsInsecure() {
  return await sql<AnimalWithFoods[]>`
    SELECT
      animals.id,
      animals.first_name,
      animals.type,
      animals.accessory,
      animals.birth_date,
      foods.id AS food_id,
      foods.name AS food_name,
      foods.type AS food_type
    FROM
      animals
      LEFT JOIN animals_foods ON animals.id = animals_foods.animal_id
      LEFT JOIN foods ON animals_foods.food_id = foods.id
  `;
}
// console.log(
//   await deleteAnimalInsecure({
//     id: 8,
//   }),
// );

console.log(await getAnimalsWithFoodsInsecure());

// ONLY FOR SCRIPT, DO NOT COPY TO YOUR APP
// End connection with PostgreSQL
await sql.end();
