import { NoteRepository } from "./noteRepository";
import { NoteInsert, NoteUpdate, NoteSelect } from '../../database/types';
import { CreateNoteDto, UpdateNoteDto } from './noteDto';

export class NoteService {
  constructor(
    private noteRepository: NoteRepository,
  ) {}

  async create(noteData: CreateNoteDto): Promise<void> {
    const noteInsert: NoteInsert = { 
      read_id: noteData.read_id,
      content: noteData.content,
      starting_page: noteData.starting_page,
      ending_page: noteData.ending_page,
      chapter: noteData.chapter
     };
    await this.noteRepository.create(noteInsert);
  }

  async findById(id: bigint): Promise<NoteSelect | undefined> {
    return this.noteRepository.findById(id);
  }

  async findAll(limit: number = 50, offset: number = 0): Promise<NoteSelect[]> {
    return this.noteRepository.findAll(limit, offset);
  }

  async update(id: bigint, noteData: UpdateNoteDto): Promise<NoteSelect | undefined> {
    const noteUpdate: NoteUpdate = {
      ...noteData
    }
    return this.noteRepository.update(id, noteUpdate);
  }

  async delete(id: bigint): Promise<void> {
    await this.noteRepository.delete(id);
  }

  async hardDelete(id: bigint): Promise<void> {
    await this.noteRepository.hardDelete(id);
  }

  async findNotesByUserId(userId: string, limit: number, offset: number): Promise<NoteSelect[]> {
    return this.noteRepository.findNotesByUserId(userId, limit, offset);
  }

  async findNotesByUserAndBook(userId: string, bookId: bigint, limit: number, offset: number): Promise<NoteSelect[]> {
    return this.noteRepository.findNotesByUserAndBook(userId, bookId, limit, offset);
  }

  async findNotesByBookId(bookId: bigint, limit: number, offset: number): Promise<NoteSelect[]> {
    return this.noteRepository.findNotesByBookId(bookId, limit, offset);
  }

  async searchNotes(query: string, limit: number, offset: number): Promise<NoteSelect[]> {
    return this.noteRepository.searchNotes(query, limit, offset);
  }

  async findNotesByBookAndChapter(bookId: bigint, chapter: string, limit: number, offset: number): Promise<NoteSelect[]> {
    return this.noteRepository.findNotesByBookAndChapter(bookId, chapter, limit, offset);
  }

  async countNotesByUserId(userId: string): Promise<number> {
    return this.noteRepository.countNotesByUserId(userId);
  }

  async countNotesByBookId(bookId: bigint): Promise<number> {
    return this.noteRepository.countNotesByBookId(bookId);
  }
}