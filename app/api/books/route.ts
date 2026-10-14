import { NextRequest, NextResponse } from 'next/server';
import z from 'zod';

type Book = {
  id: number;
  title: string;
};

// Fake database (in-memory)
const books: Book[] = [
  { id: 1, title: 'The Great Gatsby' },
  { id: 2, title: 'To Kill a Mockingbird' },
];

export type BooksResponseBodyGet = {
  books: Book[];
};

// GET (Read in CRUD)
export function GET(): NextResponse<BooksResponseBodyGet> {
  return NextResponse.json({ books: books });
}

export type BooksResponseBodyPost =
  | {
      error: string;
    }
  | {
      book: Book;
    };

const bookSchema = z.object({
  book: z.object({
    // Do not include id, because it cannot be chosen by the user
    title: z.string().trim().min(1),
  }),
});

// POST (Create in CRUD)
export async function POST(
  request: NextRequest,
): Promise<NextResponse<BooksResponseBodyPost>> {
  const requestBody = await request.json();

  const result = bookSchema.safeParse(requestBody);

  if (!result.success) {
    return NextResponse.json(
      {
        error:
          'Request body does not include a valid book eg. { "book": { "title": "The Great Gatsby" } }',
      },
      // 400: Bad request
      { status: 400 },
    );
  }

  const newBook = {
    id: books.length + 1,
    title: result.data.book.title,
  };

  books.push(newBook);

  return NextResponse.json({ book: newBook }, { status: 201 });
}
