import { DB } from '../../database/connection';
import { UserRole, UserInsert, UserUpdate, UserSelect } from '../../database/types';

export class UserRepository {
  constructor(private db: DB) {}

  async create(userData: UserInsert): Promise<UserSelect> {
    return await this.db
      .insertInto('users')
      .values(userData)
      .returningAll()
      .executeTakeFirstOrThrow();
  }

  async findById(id: string): Promise<UserSelect | undefined> {
    return await this.db
      .selectFrom('users')
      .selectAll()
      .where('id', '=', id)
      .where('deleted_at', 'is', null)
      .executeTakeFirst();
  }

  async findByEmail(email: string): Promise<UserSelect | undefined> {
    return await this.db
      .selectFrom('users')
      .selectAll()
      .where('email', '=', email)
      .where('deleted_at', 'is', null)
      .executeTakeFirst();
  }

  async findAll(
    limit: number = 50,
    offset: number = 0,
    role?: UserRole
  ): Promise<UserSelect[]> {
    let query = this.db
      .selectFrom('users')
      .selectAll()
      .where('deleted_at', 'is', null)
      .limit(limit)
      .offset(offset);

    if (role) {
      query = query.where('role', '=', role);
    }

    return await query.execute();
  }

  async update(id: string, userData: UserUpdate): Promise<UserSelect | undefined> {
    return await this.db
      .updateTable('users')
      .set({
        ...userData,
        updated_at: new Date(),
      })
      .where('id', '=', id)
      .where('deleted_at', 'is', null)
      .returningAll()
      .executeTakeFirst();
  }

  async softDelete(id: string): Promise<UserSelect | undefined> {
    return await this.db
      .updateTable('users')
      .set({
        deleted_at: new Date(),
        updated_at: new Date(),
      })
      .where('id', '=', id)
      .where('deleted_at', 'is', null)
      .returningAll()
      .executeTakeFirst();
  }

  async hardDelete(id: string): Promise<void> {
    await this.db
      .deleteFrom('users')
      .where('id', '=', id)
      .execute();
  }

  async count(role?: UserRole): Promise<number> {
    let query = this.db
      .selectFrom('users')
      .select(this.db.fn.count('id').as('count'))
      .where('deleted_at', 'is', null);

    if (role) {
      query = query.where('role', '=', role);
    }

    const result = await query.executeTakeFirstOrThrow();
    return Number(result.count);
  }

  async updateLastActive(id: string): Promise<void> {
    await this.db
      .updateTable('users')
      .set({ updated_at: new Date() })
      .where('id', '=', id)
      .execute();
  }

  async toggleActiveStatus(id: string): Promise<UserSelect | undefined> {
    const user = await this.findById(id);
    if (!user) return undefined;

    return await this.db
      .updateTable('users')
      .set({
        is_active: !user.is_active,
        updated_at: new Date(),
      })
      .where('id', '=', id)
      .returningAll()
      .executeTakeFirst();
  }
}