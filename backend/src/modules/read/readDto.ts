import { ReadSelect, ReadStatus } from "../../database/types";

export interface CreateReadDto {
  reader_id: string;
  book_id: bigint;
  status: ReadStatus;
}

export interface UpdateReadDto {
  status?: ReadStatus;
  last_page?: number;
}

export interface ReadListOptions {
  page?: number;
  limit?: number;
}

export interface PaginatedReads {
  reads: ReadSelect[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}