import { config } from 'dotenv-safe';
import postgres from 'postgres';

// Read in values from .env file to process.env
config();

const sql = postgres({
  transform: {
    ...postgres.camel,
    undefined: null,
  },
});

const animals = await sql`
  SELECT
    *
  FROM
    animals
`;

console.log(animals);

// Read first animal and destructure to variable
const [animal] = await sql`
  SELECT
    *
  FROM
    animals
  WHERE
    id = 1
`;

console.log(animal);

// ONLY FOR SCRIPT, DO NOT COPY TO YOUR APP
// End connection with PostgreSQL
await sql.end();
