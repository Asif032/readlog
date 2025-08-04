import { DB } from '../../database/connection';
import { AuthorInsert, AuthorUpdate, AuthorSelect } from '../../database/types';

export class AuthorRepository {
  constructor(private db : DB) {}

  async create(authorData: AuthorInsert): Promise<AuthorInsert> {
    return await this.db
      .insertInto('authors')
      .values(authorData)
      .returningAll()
      .executeTakeFirstOrThrow();
  }

  async findById(id: string): Promise<AuthorSelect | undefined> {
    return this.db
      .selectFrom('authors')
      .selectAll()
      .where('id', '=', id)
      .where('deleted_at', 'is', null)
      .executeTakeFirst();
  }

  async findByName(name: string): Promise<AuthorSelect[] | undefined> {
    return this.db
      .selectFrom('authors')
      .selectAll()
      .where('name', '=', name)
      .where('deleted_at', 'is', null)
      .execute();
  }

  async findAll(limit: number = 50, offset: number = 0): Promise<AuthorSelect[]> {
    return this.db
      .selectFrom('authors')
      .selectAll()
      .limit(limit)
      .offset(offset)
      .execute();
  }

  async update(id: string, authorData: AuthorUpdate): Promise<AuthorUpdate | undefined> {
    return this.db
      .updateTable('authors')
      .set({
        ...authorData,
        updated_at: new Date()
      })
      .where('id', '=', id)
      .where('deleted_at', 'is', null)
      .returningAll()
      .executeTakeFirst();
  }


}