import { Request, Response } from 'express';
import { BookService } from './service';
import { CreateBookDto, UpdateBookDto, BookListOptions } from './dto';
import { success } from '../../utils/api-response';

export class BookController {
  constructor(private bookService: BookService) {}

  create = async(req: Request, res: Response): Promise<void> => {
    const bookData: CreateBookDto = req.body;
    await this.bookService.create(bookData);
    res.status(201).json(success(null));
  }

  get = async(req: Request, res: Response): Promise<void> => {
    const book = await this.bookService.findById(BigInt(req.params.id));
    res.json(success(book));
  }

  getAll = async(req: Request, res: Response): Promise<void> => {
    const options: BookListOptions = {
      page: req.query.page ? Number(req.query.page) : undefined,
      limit: req.query.limit ? Number(req.query.limit) : undefined
    };
    const books = await this.bookService.findAll(options.limit || 50, options.page ? (options.page - 1) * (options.limit || 50) : 0);
    res.json(success(books));
  }

  getByTitle = async(req: Request, res: Response): Promise<void> => {
    const books = await this.bookService.findByTitle(req.params.title);
    res.json(success(books));
  }

  searchByTitle = async(req: Request, res: Response): Promise<void> => {
    const books = await this.bookService.searchByTitle(req.params.title);
    res.json(success(books));
  }

  update = async(req: Request, res: Response): Promise<void> => {
    const bookData: UpdateBookDto = req.body;
    const updatedBook = await this.bookService.update(BigInt(req.params.id), bookData);
    res.json(success(updatedBook));
  }

  delete = async(req: Request, res: Response): Promise<void> => {
    await this.bookService.delete(BigInt(req.params.id));
    res.json(success(null));
  }

  hardDelete = async(req: Request, res: Response): Promise<void> => {
    await this.bookService.hardDelete(BigInt(req.params.id));
    res.json(success(null));
  }
}