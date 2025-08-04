import { AuthorSelect } from "../../database/types";


export interface CreateAuthorDto {
  name: string;
  date_of_birth?: Date;
  date_of_death?: Date;
  description?: Date;
}

export interface UpdateAuthorDto {
  name?: string;
  date_of_birth?: Date;
  date_of_death?: Date;
  description?: Date;
}

export interface AuthorListOptions {
  page?: number;
  limit?: number;
}

export interface PaginatedAuthors {
  authors: AuthorSelect[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}