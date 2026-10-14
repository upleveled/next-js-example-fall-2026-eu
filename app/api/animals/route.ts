import { NextRequest, NextResponse } from 'next/server';
import {
  createAnimalInsecure,
  getAnimalsInsecure,
} from '../../../database/animals';
import {
  type Animal,
  animalSchema,
} from '../../../migrations/00000-createTableAnimals';

// ‼️ WARNING: `GET` Route Handler is often not needed - instead query database via Server Component
type AnimalsResponseBodyGet = {
  animals: Animal[];
};

export async function GET(): Promise<NextResponse<AnimalsResponseBodyGet>> {
  const animals = await getAnimalsInsecure();
  return NextResponse.json({
    animals: animals,
  });
}

export type AnimalsResponseBodyPost =
  | {
      error: string;
    }
  | {
      animal: Animal;
    };

export async function POST(
  request: NextRequest,
): Promise<NextResponse<AnimalsResponseBodyPost>> {
  const requestBody = await request.json();

  const result = animalSchema.safeParse(requestBody);

  if (!result.success) {
    console.log('result.error.issues', result.error.issues);
    return NextResponse.json(
      {
        error: 'Request body does not include a valid animal',
      },
      { status: 400 },
    );
  }

  const newAnimal = await createAnimalInsecure(result.data.animal);

  if (!newAnimal) {
    return NextResponse.json(
      {
        error: 'Error occurred while creating animal',
      },
      { status: 500 },
    );
  }

  return NextResponse.json(
    {
      animal: newAnimal,
    },
    { status: 201 },
  );
}
