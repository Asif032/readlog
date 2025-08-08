import { NoteSelect } from "../../database/types";

export interface CreateNoteDto {
  read_id: bigint;
  content: string;
  chapter?: string;
  starting_page: number;
  ending_page: number;
}

export interface UpdateNoteDto {
  content?: string;
  chapter?: string;
  starting_page?: number;
  ending_page?: number;
}

export interface NoteListOptions {
  page?: number;
  limit?: number;
}

export interface PaginatedNotes {
  notes: NoteSelect[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}