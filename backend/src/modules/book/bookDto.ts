import { BookSelect, Genre } from "../../database/types";
import { CreateAuthorDto } from "../author/authorDto";

export interface CreateBookDto {
  title: string;
  edition?: number;
  language: string;
  genre: Genre;
  pages: number;
  tags?: string[];
  isbn?: string;
  published_year?: number;
  publisher?: string;
  description?: string;
  cover_url?: string;
  authors: CreateAuthorDto[];
}

export interface UpdateBookDto {
  title?: string;
  edition?: number;
  language?: string;
  genre?: Genre;
  pages?: number;
  tags?: string[];
  isbn?: string;
  published_year?: number;
  publisher?: string;
  description?: string;
  cover_url?: string;
}

export interface BookListOptions {
  page?: number;
  limit?: number;
}

export interface PaginatedBooks {
  books: BookSelect[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}