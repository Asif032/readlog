import { DB } from '../../database/connection';
import { ReadInsert, ReadUpdate, ReadSelect, ReadStatus, BookSelect } from '../../database/types';

export class ReadRepository {
  constructor(private db: DB) {}

  async create(readData: ReadInsert): Promise<void> {
    await this.db
      .insertInto('reads')
      .values(readData)
      .execute();
  }

  async findById(id: bigint): Promise<ReadSelect | undefined> {
    return await this.db
      .selectFrom('reads')
      .selectAll()
      .where('id', '=', id)
      .where('deleted_at', 'is', null)
      .executeTakeFirst();
  }

  async findAll(limit: number = 50, offset: number = 0): Promise<ReadSelect[]> {
    return await this.db
      .selectFrom('reads')
      .selectAll()
      .limit(limit)
      .offset(offset)
      .execute();
  }

  async update(id: bigint, readData: ReadUpdate): Promise<ReadSelect | undefined> {
    return await this.db
      .updateTable('reads')
      .set({
        ...readData,
        updated_at: new Date()
      })
      .where('id', '=', id)
      .where('deleted_at', 'is', null)
      .returningAll()
      .executeTakeFirst();
  }

  async delete(id: bigint): Promise<void> {
    await this.db
      .updateTable('reads')
      .set({
        deleted_at: new Date(),
      })
      .where('id', '=', id)
      .where('deleted_at', 'is', null)
      .execute();
  }

  async hardDelete(id: bigint): Promise<void> {
    await this.db
      .deleteFrom('reads')
      .where('id', '=', id)
      .execute()
  }

  async findBooksByUserId(userId: string, status?: ReadStatus): Promise<BookSelect[]> {
    let query = this.db
      .selectFrom('reads')
      .innerJoin('books', 'reads.book_id', 'books.id')
      .where('reads.reader_id', '=', userId)
      .selectAll('books');

    if (status) {
      query = query.where('reads.status', '=', status);
    }

    return await query.execute();
  }

  async countReadersByBookId(bookId: bigint, status?: ReadStatus): Promise<number> {
    let query = this.db
      .selectFrom('reads')
      .select(this.db.fn.count('reads.id').as('count'))
      .where('reads.book_id', '=', bookId);

    if (status) {
      query = query.where('reads.status', '=', status);
    }

    const result = await query.executeTakeFirst();

    return Number(result?.count) || 0;
  }
}