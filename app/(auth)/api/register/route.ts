import bcrypt from 'bcrypt';
import { type NextRequest, NextResponse } from 'next/server';
import {
  createUserInsecure,
  getUserInsecure,
} from '../../../../database/users';
import {
  type User,
  userSchemaRegister,
} from '../../../../migrations/00006-createTableUsers';
import { getCombinedErrorMessage } from '../../../../util/validation';

export type RegisterResponseBodyPost =
  | {
      user: User;
    }
  | {
      error: string;
    };

export async function POST(
  request: NextRequest,
): Promise<NextResponse<RegisterResponseBodyPost>> {
  // User registration steps in Route Handler
  // 1. Get user data from request
  const requestBody = await request.json();

  // 2. Validate user data with Zod
  const result = userSchemaRegister.safeParse(requestBody);

  if (!result.success) {
    return NextResponse.json(
      {
        error: getCombinedErrorMessage(result.error.issues),
      },
      { status: 400 },
    );
  }

  // 3. Check if user already exists in `users` table
  const existingUser = await getUserInsecure(result.data.user.username);

  if (existingUser) {
    return NextResponse.json(
      {
        error: 'Username already exists',
      },
      { status: 400 },
    );
  }

  // 4. Hash plain text password from user
  const passwordHash = await bcrypt.hash(result.data.user.password, 12);
  console.log('passwordHash', passwordHash);

  // 5. Insert user with hashed password into `users` table
  const user = await createUserInsecure(
    result.data.user.username,
    passwordHash,
  );

  if (!user) {
    return NextResponse.json(
      {
        error: 'Creating user failed',
      },
      { status: 500 },
    );
  }

  return NextResponse.json(
    {
      user: user,
    },
    { status: 201 },
  );
}
