import { BookRepository } from "./repository";
import { BookInsert, BookUpdate, BookSelect } from '../../database/types';
import { CreateBookDto,UpdateBookDto, BookListOptions, PaginatedBooks } from './dto';

export class BookService {
  constructor(private bookRepository: BookRepository) {}

  async create(bookData: CreateBookDto): Promise<void> {
    const { authors, ...bookFields } = bookData;
    
  }
}