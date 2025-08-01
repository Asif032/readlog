import type { ColumnType } from 'kysely';

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

export interface User {
  id: string;
  email: string;
  name: string;
  password: string;
  bio: string | null;
  date_of_birth: Date | null;
  is_active: boolean;
  role: UserRole;
  created_at: Generated<Date>;
  updated_at: Generated<Date>;
  deleted_at: Date | null;
}

export interface Book {
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
  created_at: Generated<Date>;
  updated_at: Generated<Date>;
  deleted_at: Date | null;
}

export interface Author {
  id: string;
  name: string;
  date_of_birth: Date | null;
  date_of_death: Date | null;
  description: string | null;
  created_at: Generated<Date>;
  updated_at: Generated<Date>;
  deleted_at: Date | null;
}

export interface Read {
  id: Generated<bigint>;
  reader_id: string;
  book_id: bigint;
  status: ReadStatus;
  current_page: number;
  created_at: Generated<Date>;
  updated_at: Generated<Date>;
  deleted_at: Date | null;
}

export interface Note {
  id: Generated<bigint>;
  read_id: bigint;
  content: string;
  chapter: string | null;
  starting_page: number;
  ending_page: number;
  created_at: Generated<Date>;
  updated_at: Generated<Date>;
  deleted_at: Date | null;
}

export interface Review {
  id: Generated<bigint>;
  rating: number;
  read_id: bigint;
  created_at: Generated<Date>;
  updated_at: Generated<Date>;
  deleted_at: Date | null;
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