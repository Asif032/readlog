import { Request, Response } from 'express';
import { NoteService } from './noteService';
import { CreateNoteDto, UpdateNoteDto, NoteListOptions } from './noteDto';
import { success } from '../../utils/api-response';

export class NoteController {
  constructor(private noteService: NoteService) {}

  create = async(req: Request, res: Response): Promise<void> => {
    const noteData: CreateNoteDto = req.body;
    await this.noteService.create(noteData);
    res.status(201).json(success(null));
  }

  get = async(req: Request, res: Response): Promise<void> => {
    const note = await this.noteService.findById(BigInt(req.params.id));
    res.json(success(note));
  }

  getAll = async(req: Request, res: Response): Promise<void> => {
    const options: NoteListOptions = {
      page: req.query.page ? Number(req.query.page) : undefined,
      limit: req.query.limit ? Number(req.query.limit) : undefined
    };
    const notes = await this.noteService.findAll(options.limit || 50, options.page ? (options.page - 1) * (options.limit || 50) : 0);
    res.json(success(notes));
  }

  update = async(req: Request, res: Response): Promise<void> => {
    const noteData: UpdateNoteDto = req.body;
    const updatedNote = await this.noteService.update(BigInt(req.params.id), noteData);
    res.json(success(updatedNote));
  }

  delete = async(req: Request, res: Response): Promise<void> => {
    await this.noteService.delete(BigInt(req.params.id));
    res.json(success(null));
  }

  hardDelete = async(req: Request, res: Response): Promise<void> => {
    await this.noteService.hardDelete(BigInt(req.params.id));
    res.json(success(null));
  }

  getNotesByUserId = async (req: Request, res: Response): Promise<void> => {
    const { userId } = req.params;
    const options: NoteListOptions = {
      page: req.query.page ? Number(req.query.page) : undefined,
      limit: req.query.limit ? Number(req.query.limit) : undefined
    };
    const notes = await this.noteService.findNotesByUserId(userId, options.limit || 50, options.page ? (options.page - 1) * (options.limit || 50) : 0);
    res.json(success(notes));
  }

  getNotesByUserAndBook = async (req: Request, res: Response): Promise<void> => {
    const { userId, bookId } = req.params;
    const options: NoteListOptions = {
      page: req.query.page ? Number(req.query.page) : undefined,
      limit: req.query.limit ? Number(req.query.limit) : undefined
    };
    const notes = await this.noteService.findNotesByUserAndBook(userId, BigInt(bookId), options.limit || 50, options.page ? (options.page - 1) * (options.limit || 50) : 0);
    res.json(success(notes));
  }

  getNotesByBookId = async (req: Request, res: Response): Promise<void> => {
    const { bookId } = req.params;
    const options: NoteListOptions = {
      page: req.query.page ? Number(req.query.page) : undefined,
      limit: req.query.limit ? Number(req.query.limit) : undefined
    };
    const notes = await this.noteService.findNotesByBookId(BigInt(bookId), options.limit || 50, options.page ? (options.page - 1) * (options.limit || 50) : 0);
    res.json(success(notes));
  }

  searchNotes = async (req: Request, res: Response): Promise<void> => {
    const query = req.query.q as string;
    const options: NoteListOptions = {
      page: req.query.page ? Number(req.query.page) : undefined,
      limit: req.query.limit ? Number(req.query.limit) : undefined
    };
    const notes = await this.noteService.searchNotes(query, options.limit || 50, options.page ? (options.page - 1) * (options.limit || 50) : 0);
    res.json(success(notes));
  }

  getNotesByBookAndChapter = async (req: Request, res: Response): Promise<void> => {
    const { bookId, chapter } = req.params;
    const options: NoteListOptions = {
      page: req.query.page ? Number(req.query.page) : undefined,
      limit: req.query.limit ? Number(req.query.limit) : undefined
    };
    const notes = await this.noteService.findNotesByBookAndChapter(BigInt(bookId), chapter, options.limit || 50, options.page ? (options.page - 1) * (options.limit || 50) : 0);
    res.json(success(notes));
  }

  countNotesByUserId = async (req: Request, res: Response): Promise<void> => {
    const { userId } = req.params;
    const count = await this.noteService.countNotesByUserId(userId);
    res.json(success({ count }));
  }

  countNotesByBookId = async (req: Request, res: Response): Promise<void> => {
    const { bookId } = req.params;
    const count = await this.noteService.countNotesByBookId(BigInt(bookId));
    res.json(success({ count }));
  }
}