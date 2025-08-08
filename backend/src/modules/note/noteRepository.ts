import { DB } from '../../database/connection';
import { NoteInsert, NoteUpdate, NoteSelect } from '../../database/types';

export class NoteRepository {
  constructor(private db: DB) {}

  async create(noteData: NoteInsert): Promise<void> {
    await this.db
      .insertInto('notes')
      .values(noteData)
      .execute();
  }

  async findById(id: bigint): Promise<NoteSelect | undefined> {
    return await this.db
      .selectFrom('notes')
      .selectAll()
      .where('id', '=', id)
      .where('deleted_at', 'is', null)
      .executeTakeFirst();
  }

  async findAll(limit: number = 50, offset: number = 0): Promise<NoteSelect[]> {
    return await this.db
      .selectFrom('notes')
      .selectAll()
      .limit(limit)
      .offset(offset)
      .execute();
  }

  async update(id: bigint, noteData: NoteUpdate): Promise<NoteSelect | undefined> {
    return await this.db
      .updateTable('notes')
      .set({
        ...noteData,
        updated_at: new Date()
      })
      .where('id', '=', id)
      .where('deleted_at', 'is', null)
      .returningAll()
      .executeTakeFirst();
  }

  async delete(id: bigint): Promise<void> {
    await this.db
      .updateTable('notes')
      .set({
        deleted_at: new Date(),
      })
      .where('id', '=', id)
      .where('deleted_at', 'is', null)
      .execute();
  }

  async hardDelete(id: bigint): Promise<void> {
    await this.db
      .deleteFrom('notes')
      .where('id', '=', id)
      .execute()
  }

  async findNotesByUserId(userId: string, limit: number, offset: number): Promise<NoteSelect[]> {
    return await this.db
      .selectFrom('notes')
      .innerJoin('reads', 'notes.read_id', 'reads.id')
      .where('reads.reader_id', '=', userId)
      .selectAll('notes')
      .limit(limit)
      .offset(offset)
      .execute();
  }

  async findNotesByUserAndBook(userId: string, bookId: bigint, limit: number, offset: number): Promise<NoteSelect[]> {
    return await this.db
      .selectFrom('notes')
      .innerJoin('reads', 'notes.read_id', 'reads.id')
      .where('reads.reader_id', '=', userId)
      .where('reads.book_id', '=', bookId)
      .selectAll('notes')
      .limit(limit)
      .offset(offset)
      .execute();
  }

  async findNotesByBookId(bookId: bigint, limit: number, offset: number): Promise<NoteSelect[]> {
    return await this.db
      .selectFrom('notes')
      .innerJoin('reads', 'notes.read_id', 'reads.id')
      .where('reads.book_id', '=', bookId)
      .selectAll('notes')
      .limit(limit)
      .offset(offset)
      .execute();
  }

  async searchNotes(query: string, limit: number, offset: number): Promise<NoteSelect[]> {
    return await this.db
      .selectFrom('notes')
      .selectAll()
      .where('content', 'ilike', `%${query}%`)
      .limit(limit)
      .offset(offset)
      .execute();
  }

  async findNotesByBookAndChapter(bookId: bigint, chapter: string, limit: number, offset: number): Promise<NoteSelect[]> {
    return await this.db
      .selectFrom('notes')
      .innerJoin('reads', 'notes.read_id', 'reads.id')
      .where('reads.book_id', '=', bookId)
      .where('notes.chapter', '=', chapter)
      .selectAll('notes')
      .limit(limit)
      .offset(offset)
      .execute();
  }

  async countNotesByUserId(userId: string): Promise<number> {
    const result = await this.db
      .selectFrom('notes')
      .innerJoin('reads', 'notes.read_id', 'reads.id')
      .where('reads.reader_id', '=', userId)
      .select(this.db.fn.count('notes.id').as('count'))
      .executeTakeFirst();
    return Number(result?.count) || 0;
  }

  async countNotesByBookId(bookId: bigint): Promise<number> {
    const result = await this.db
      .selectFrom('notes')
      .innerJoin('reads', 'notes.read_id', 'reads.id')
      .where('reads.book_id', '=', bookId)
      .select(this.db.fn.count('notes.id').as('count'))
      .executeTakeFirst();
    return Number(result?.count) || 0;
  }
}