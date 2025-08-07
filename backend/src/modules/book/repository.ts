import { DB } from '../../database/connection';
import { BookInsert, BookUpdate, BookSelect, BookAuthorInsert, Book } from '../../database/types';
import { CreateBookDto, UpdateBookDto, PaginatedBooks } from './dto';

export class BookRepository {
  constructor(private db: DB) {}

  async create(bookData: BookInsert): Promise<void> {

  const [book] = await this.db
    .insertInto('books')
    .values(bookData)
    .returning('id')
    .execute();

  const bookId = book.id;

  for (const authorDto of authors) {
    const existing = await this.db
      .selectFrom('authors')
      .selectAll()
      .where('name', '=', authorDto.name)
      .executeTakeFirst();

    let authorId: string;

    if (existing) {
      authorId = existing.id;
    } else {
      const [inserted] = await this.db
        .insertInto('authors')
        .values(authorDto)
        .returning('id')
        .execute();

      authorId = inserted.id;
    }

    await this.db
      .insertInto('book_authors')
      .values({
        book_id: bookId,
        author_id: authorId,
      })
      .execute();
    }
  }

  async createBookAuthor(bookAuthorData: BookAuthorInsert): Promise<void> {
    
  }

  async findById(id: bigint): Promise<BookSelect | undefined> {
    return await this.db
      .selectFrom('books')
      .selectAll()
      .where('id', '=', id)
      .where('deleted_at', 'is', null)
      .executeTakeFirst();
  }

  async findByTitle(title: string): Promise<BookSelect[] | undefined> {
    return await this.db
      .selectFrom('books')
      .selectAll()
      .where('title', 'like', `%${title}%`)
      .where('deleted_at', 'is', null)
      .execute();
  }

  async findAll(limit: number = 50, offset: number = 0): Promise<BookSelect[]> {
    return await this.db
      .selectFrom('books')
      .selectAll()
      .limit(limit)
      .offset(offset)
      .execute();
  }

  async update(id: bigint, bookData: BookUpdate): Promise<BookSelect | undefined> {
    return await this.db
      .updateTable('books')
      .set({
        ...bookData,
        updated_at: new Date()
      })
      .where('id', '=', id)
      .where('deleted_at', 'is', null)
      .returningAll()
      .executeTakeFirst();
  }

  async delete(id: bigint): Promise<void> {
    await this.db
      .updateTable('books')
      .set({
        deleted_at: new Date(),
      })
      .where('id', '=', id)
      .where('deleted_at', 'is', null)
      .execute();
  }

  async hardDelete(id: bigint): Promise<void> {
    await this.db
      .deleteFrom('books')
      .where('id', '=', id)
      .execute()
  }
}