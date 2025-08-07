import { DB } from "../../database/connection";
import { BookRepository } from "./repository";
import { AuthorService } from "../author/service";
import { BookInsert, BookUpdate, BookSelect, BookAuthorInsert } from '../../database/types';
import { CreateBookDto,UpdateBookDto, BookListOptions, PaginatedBooks } from './dto';

export class BookService {
  constructor(
    private db: DB,
    private bookRepository: BookRepository,
    private authorService: AuthorService
  ) {}

  async create(bookData: CreateBookDto): Promise<void> {
    const { authors, ...bookFields } = bookData;
    const bookInsert: BookInsert = { ...bookFields };

    await this.db.transaction().execute(async (trx) => {
      const bookId = await this.bookRepository.create(bookInsert, trx);
      const authorIds = await this.authorService.createMultiple(authors, trx);

      const bookAuthors: BookAuthorInsert[] = authorIds.map((authorId) => ({
        book_id: bookId,
        author_id: authorId,
      }));
      await this.bookRepository.createBookAuthors(bookAuthors, trx);
    });
  }

  async findById(id: bigint): Promise<BookSelect | undefined> {
    return this.bookRepository.findById(id);
  }

  async findByTitle(title: string): Promise<BookSelect[] | undefined> {
    return this.bookRepository.findByTitle(title);
  }

  async searchByTitle(title: string): Promise<BookSelect[] | undefined> {
    return this.bookRepository.searchByTitle(title);
  }

  async findAll(limit: number = 50, offset: number = 0): Promise<BookSelect[]> {
    return this.bookRepository.findAll(limit, offset);
  }

  async update(id: bigint, bookData: UpdateBookDto): Promise<BookSelect | undefined> {
    const bookUpdate: BookUpdate = {
      ...bookData
    }
    return this.bookRepository.update(id, bookUpdate);
  }

  async delete(id: bigint): Promise<void> {
    await this.bookRepository.delete(id);
  }

  async hardDelete(id: bigint): Promise<void> {
    await this.bookRepository.hardDelete(id);
  }

}