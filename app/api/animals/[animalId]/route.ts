import { NextRequest, NextResponse } from 'next/server';
import {
  deleteAnimalInsecure,
  getAnimalInsecure,
  updateAnimalInsecure,
} from '../../../../database/animals';
import {
  type Animal,
  animalSchema,
} from '../../../../migrations/00000-createTableAnimals';

// ‼️ WARNING: `GET` Route Handler is often not needed - instead query database via Server Component
type AnimalResponseBodyGet =
  | {
      error: string;
    }
  | {
      animal: Animal;
    };

export async function GET(
  request: NextRequest,
  context: RouteContext<'/api/animals/[animalId]'>,
): Promise<NextResponse<AnimalResponseBodyGet>> {
  const animalId = Number((await context.params).animalId);

  if (isNaN(animalId)) {
    return NextResponse.json(
      {
        error: 'Bad animal id',
      },
      { status: 400 },
    );
  }

  const animal = await getAnimalInsecure(animalId);

  if (!animal) {
    return NextResponse.json(
      {
        error: 'Animal not found',
      },
      { status: 404 },
    );
  }

  return NextResponse.json({
    animal: animal,
  });
}

export type AnimalResponseBodyPut =
  | {
      error: string;
    }
  | {
      animal: Animal;
    };

export async function PUT(
  request: NextRequest,
  context: RouteContext<'/api/animals/[animalId]'>,
): Promise<NextResponse<AnimalResponseBodyPut>> {
  const animalId = Number((await context.params).animalId);

  if (isNaN(animalId)) {
    return NextResponse.json(
      {
        error: 'Bad animal id',
      },
      { status: 400 },
    );
  }
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

  const updatedAnimal = await updateAnimalInsecure({
    id: animalId,
    firstName: result.data.animal.firstName,
    type: result.data.animal.type,
    accessory: result.data.animal.accessory,
    birthDate: result.data.animal.birthDate,
  });

  if (!updatedAnimal) {
    return NextResponse.json(
      {
        error: 'Animal not found',
      },
      { status: 404 },
    );
  }

  return NextResponse.json({
    animal: updatedAnimal,
  });
}

export type AnimalResponseBodyDelete =
  | {
      error: string;
    }
  | {
      animal: Animal;
    };

export async function DELETE(
  request: NextRequest,
  context: RouteContext<'/api/animals/[animalId]'>,
): Promise<NextResponse<AnimalResponseBodyDelete>> {
  const animalId = Number((await context.params).animalId);

  if (isNaN(animalId)) {
    return NextResponse.json(
      {
        error: 'Bad animal id',
      },
      { status: 400 },
    );
  }

  const animal = await deleteAnimalInsecure({ id: animalId });

  if (!animal) {
    return NextResponse.json(
      {
        error: 'Animal not found',
      },
      { status: 404 },
    );
  }

  return NextResponse.json({
    animal: animal,
  });
}
