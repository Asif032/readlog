import { DB } from '../../database/connection';
import { AuthorInsert, AuthorUpdate, AuthorSelect } from '../../database/types';

export class AuthorRepository {
  constructor(private db : DB) {}

  async create(authorData: AuthorInsert): Promise<void> {
    await this.db
      .insertInto('authors')
      .values(authorData)
      .execute();
  }

  async findById(id: string): Promise<AuthorSelect | undefined> {
    return await this.db
      .selectFrom('authors')
      .selectAll()
      .where('id', '=', id)
      .where('deleted_at', 'is', null)
      .executeTakeFirst();
  }

  async findByName(name: string): Promise<AuthorSelect[] | undefined> {
    return await this.db
      .selectFrom('authors')
      .selectAll()
      .where('name', 'like', `%${name}%`)
      .where('deleted_at', 'is', null)
      .execute();
  }

  async findAll(limit: number = 50, offset: number = 0): Promise<AuthorSelect[]> {
    return await this.db
      .selectFrom('authors')
      .selectAll()
      .limit(limit)
      .offset(offset)
      .execute();
  }

  async update(id: string, authorData: AuthorUpdate): Promise<AuthorSelect | undefined> {
    return await this.db
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

   async delete(id: string): Promise<void> {
      await this.db
        .updateTable('authors')
        .set({
          deleted_at: new Date(),
        })
        .where('id', '=', id)
        .where('deleted_at', 'is', null)
        .execute();
    }

    async hardDelete(id: string): Promise<void> {
      await this.db
        .deleteFrom('authors')
        .where('id', '=', id)
        .execute()
    }

}