import type { ColumnType, Insertable, Updateable, Selectable } from 'kysely';

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;

export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export type UserRole = 'USER' | 'ADMIN' | 'MODERATOR';

export type Genre = 
  | 'FICTION'
  | 'NONFICTION'
  | 'FANTASY'
  | 'MYSTERY'
  | 'HISTORY'
  | 'SCIENCE'
  | 'BIOGRAPHY'
  | 'OTHER';

export type ReadStatus = 'UPCOMING' | 'READING' | 'COMPLETED' | 'DROPPED';

export interface BaseEntity {
  created_at: Generated<Timestamp>;
  updated_at: Generated<Timestamp>;
  deleted_at: Timestamp | null;
}

export interface User extends BaseEntity {
  id: Generated<string>;
  email: string;
  name: string;
  password: string;
  role: UserRole;
  is_active: boolean;
  bio: string | null;
  date_of_birth: Timestamp | null;
}

export interface Book extends BaseEntity {
  id: Generated<bigint>;
  title: string;
  edition: number | null;
  language: string;
  genre: Genre;
  pages: number;
  tags: string[] | null;
  isbn: string | null;
  published_year: number | null;
  publisher: string | null;
  description: string | null;
  cover_url: string | null;
}

export interface Author extends BaseEntity {
  id: Generated<string>;
  name: string;
  date_of_birth: Timestamp | null;
  date_of_death: Timestamp | null;
  description: string | null;
}

export interface Read extends BaseEntity {
  id: Generated<bigint>;
  reader_id: string;
  book_id: bigint;
  status: ReadStatus;
}

export interface Note extends BaseEntity {
  id: Generated<bigint>;
  read_id: bigint;
  content: string;
  chapter: string | null;
  starting_page: number;
  ending_page: number;
}

export interface Review extends BaseEntity {
  id: Generated<bigint>;
  read_id: bigint;
}

export interface BookAuthor {
  book_id: bigint;
  author_id: string;
}

export interface Database {
  users: User;
  books: Book;
  authors: Author;
  reads: Read;
  notes: Note;
  reviews: Review;
  book_authors: BookAuthor;
}

export type Insert<T extends keyof Database> = Insertable<Database[T]>;
export type Update<T extends keyof Database> = Updateable<Database[T]>;
export type Select<T extends keyof Database> = Selectable<Database[T]>;

export type UserInsert = Insert<'users'>;
export type UserUpdate = Update<'users'>;
export type UserSelect = Select<'users'>;

export type BookInsert = Insert<'books'>;
export type BookUpdate = Update<'books'>;
export type BookSelect = Select<'books'>;

export type AuthorInsert = Insert<'authors'>;
export type AuthorUpdate = Update<'authors'>;
export type AuthorSelect = Select<'authors'>;

export type ReadInsert = Insert<'reads'>;
export type ReadUpdate = Update<'reads'>;
export type ReadSelect = Select<'reads'>;

export type NoteInsert = Insert<'notes'>;
export type NoteUpdate = Update<'notes'>;
export type NoteSelect = Select<'notes'>;

export type ReviewInsert = Insert<'reviews'>;
export type ReviewUpdate = Update<'reviews'>;
export type ReviewSelect = Select<'reviews'>;

export type BookAuthorInsert = Insert<'book_authors'>;
export type BookAuthorUpdate = Update<'book_authors'>;
export type BookAuthorSelect = Select<'book_authors'>;