import { Kysely, sql } from 'kysely';

/**
 * This migration creates the initial database schema.
 * NOTE: Ensure the 'pgcrypto' extension is enabled in your PostgreSQL database
 * for the `gen_random_uuid()` function to work. You can enable it by running:
 * CREATE EXTENSION IF NOT EXISTS "pgcrypto";
 */
export async function up(db: Kysely<any>): Promise<void> {
  // Create custom enum types
  await db.schema
    .createType('user_role')
    .asEnum(['USER', 'ADMIN', 'MODERATOR'])
    .execute();

  await db.schema
    .createType('genre')
    .asEnum(['FICTION', 'NONFICTION', 'FANTASY', 'MYSTERY', 'HISTORY', 'SCIENCE', 'BIOGRAPHY', 'OTHER'])
    .execute();

  await db.schema
    .createType('read_status')
    .asEnum(['UPCOMING', 'READING', 'COMPLETED', 'DROPPED'])
    .execute();

  // Create users table
  await db.schema
    .createTable('users')
    .addColumn('id', 'uuid', (col) => col.primaryKey().defaultTo(sql`gen_random_uuid()`))
    .addColumn('email', 'varchar(255)', (col) => col.unique().notNull())
    .addColumn('name', 'varchar(255)', (col) => col.notNull())
    .addColumn('password', 'varchar(255)', (col) => col.notNull())
    .addColumn('role', sql`user_role`, (col) => col.notNull().defaultTo('USER'))
    .addColumn('is_active', 'boolean', (col) => col.notNull().defaultTo(true))
    .addColumn('bio', 'text')
    .addColumn('date_of_birth', 'timestamp')
    .addColumn('created_at', 'timestamp', (col) => col.defaultTo(sql`now()`).notNull())
    .addColumn('updated_at', 'timestamp', (col) => col.defaultTo(sql`now()`).notNull())
    .addColumn('deleted_at', 'timestamp')
    .execute();

  // Create authors table
  await db.schema
    .createTable('authors')
    .addColumn('id', 'uuid', (col) => col.primaryKey().defaultTo(sql`gen_random_uuid()`))
    .addColumn('name', 'varchar(255)', (col) => col.notNull())
    .addColumn('date_of_birth', 'timestamp')
    .addColumn('date_of_death', 'timestamp')
    .addColumn('description', 'text')
    .addColumn('created_at', 'timestamp', (col) => col.defaultTo(sql`now()`).notNull())
    .addColumn('updated_at', 'timestamp', (col) => col.defaultTo(sql`now()`).notNull())
    .addColumn('deleted_at', 'timestamp')
    .execute();

  // Create books table
  await db.schema
    .createTable('books')
    .addColumn('id', 'bigserial', (col) => col.primaryKey())
    .addColumn('title', 'varchar(255)', (col) => col.notNull())
    .addColumn('edition', 'integer')
    .addColumn('language', 'varchar(50)', (col) => col.notNull())
    .addColumn('genre', sql`genre`, (col) => col.notNull())
    .addColumn('pages', 'integer', (col) => col.notNull())
    .addColumn('tags', sql`text[]`)
    .addColumn('isbn', 'varchar(20)')
    .addColumn('published_year', 'integer')
    .addColumn('publisher', 'varchar(255)')
    .addColumn('description', 'text')
    .addColumn('cover_url', 'varchar(255)')
    .addColumn('created_at', 'timestamp', (col) => col.defaultTo(sql`now()`).notNull())
    .addColumn('updated_at', 'timestamp', (col) => col.defaultTo(sql`now()`).notNull())
    .addColumn('deleted_at', 'timestamp')
    .execute();

  // Create book_authors join table
  await db.schema
    .createTable('book_authors')
    .addColumn('book_id', 'bigint', (col) => col.references('books.id').onDelete('cascade').notNull())
    .addColumn('author_id', 'uuid', (col) => col.references('authors.id').onDelete('cascade').notNull())
    .addPrimaryKeyConstraint('book_authors_pk', ['book_id', 'author_id'])
    .execute();

  // Create reads table
  await db.schema
    .createTable('reads')
    .addColumn('id', 'bigserial', (col) => col.primaryKey())
    .addColumn('reader_id', 'uuid', (col) => col.references('users.id').onDelete('cascade').notNull())
    .addColumn('book_id', 'bigint', (col) => col.references('books.id').onDelete('cascade').notNull())
    .addColumn('status', sql`read_status`, (col) => col.notNull())
    .addColumn('created_at', 'timestamp', (col) => col.defaultTo(sql`now()`).notNull())
    .addColumn('updated_at', 'timestamp', (col) => col.defaultTo(sql`now()`).notNull())
    .addColumn('deleted_at', 'timestamp')
    .execute();

  // Create notes table
  await db.schema
    .createTable('notes')
    .addColumn('id', 'bigserial', (col) => col.primaryKey())
    .addColumn('read_id', 'bigint', (col) => col.references('reads.id').onDelete('cascade').notNull())
    .addColumn('content', 'text', (col) => col.notNull())
    .addColumn('chapter', 'varchar(255)')
    .addColumn('starting_page', 'integer', (col) => col.notNull())
    .addColumn('ending_page', 'integer', (col) => col.notNull())
    .addColumn('created_at', 'timestamp', (col) => col.defaultTo(sql`now()`).notNull())
    .addColumn('updated_at', 'timestamp', (col) => col.defaultTo(sql`now()`).notNull())
    .addColumn('deleted_at', 'timestamp')
    .execute();

  // Create reviews table
  await db.schema
    .createTable('reviews')
    .addColumn('id', 'bigserial', (col) => col.primaryKey())
    .addColumn('read_id', 'bigint', (col) => col.references('reads.id').onDelete('cascade').notNull())
    .addColumn('created_at', 'timestamp', (col) => col.defaultTo(sql`now()`).notNull())
    .addColumn('updated_at', 'timestamp', (col) => col.defaultTo(sql`now()`).notNull())
    .addColumn('deleted_at', 'timestamp')
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  // Drop tables in reverse order of creation to respect foreign keys
  await db.schema.dropTable('reviews').ifExists().execute();
  await db.schema.dropTable('notes').ifExists().execute();
  await db.schema.dropTable('reads').ifExists().execute();
  await db.schema.dropTable('book_authors').ifExists().execute();
  await db.schema.dropTable('books').ifExists().execute();
  await db.schema.dropTable('authors').ifExists().execute();
  await db.schema.dropTable('users').ifExists().execute();

  // Drop custom enum types
  await db.schema.dropType('read_status').ifExists().execute();
  await db.schema.dropType('genre').ifExists().execute();
  await db.schema.dropType('user_role').ifExists().execute();
}