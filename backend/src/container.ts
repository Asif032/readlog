import { db } from './database/connection';
import { AuthorRepository } from './modules/author/repository';
import { AuthorService } from './modules/author/service';
import { BookRepository } from './modules/book/repository';
import { BookService } from './modules/book/service';
import { UserRepository } from './modules/user/repository';
import { UserService } from './modules/user/service';

// Repositories
export const userRepository = new UserRepository(db);
export const authorRepository = new AuthorRepository(db);
export const bookRepository = new BookRepository(db);

// Services
export const userService = new UserService(userRepository);
export const authorService = new AuthorService(authorRepository);
export const bookService = new BookService(
  db,
  bookRepository,
  authorService
);