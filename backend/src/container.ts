import { db } from './database/connection';
import { AuthorRepository } from './modules/author/repository';
import { AuthorService } from './modules/author/service';
import { BookRepository } from './modules/book/repository';
import { BookService } from './modules/book/service';
import { UserRepository } from './modules/user/repository';
import { UserService } from './modules/user/service';
import { AuthorController } from './modules/author/controller';
import { BookController } from './modules/book/controller';
import { UserController } from './modules/user/controller';

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

// Controllers
export const authorController = new AuthorController(authorService);
export const bookController = new BookController(bookService);
export const userController = new UserController(userService);