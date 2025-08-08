import { db } from './database/connection';
import { AuthorRepository } from './modules/author/authorRepository';
import { AuthorService } from './modules/author/authorService';
import { AuthorController } from './modules/author/authorController';
import { BookRepository } from './modules/book/bookRepository';
import { BookService } from './modules/book/bookService';
import { BookController } from './modules/book/bookController';
import { ReadRepository } from './modules/read/readRepository';
import { ReadService } from './modules/read/readService';
import { ReadController } from './modules/read/readController';
import { NoteRepository } from './modules/note/noteRepository';
import { NoteService } from './modules/note/noteService';
import { NoteController } from './modules/note/noteController';
import { UserRepository } from './modules/user/userRepository';
import { UserService } from './modules/user/userService';
import { UserController } from './modules/user/userController';

// Repositories
export const userRepository = new UserRepository(db);
export const authorRepository = new AuthorRepository(db);
export const bookRepository = new BookRepository(db);
export const readRepository = new ReadRepository(db);
export const noteRepository = new NoteRepository(db);

// Services
export const userService = new UserService(userRepository);
export const authorService = new AuthorService(authorRepository);
export const bookService = new BookService(db, bookRepository, authorService);
export const readService = new ReadService(readRepository);
export const noteService = new NoteService(noteRepository);

// Controllers
export const authorController = new AuthorController(authorService);
export const bookController = new BookController(bookService);
export const userController = new UserController(userService);
export const readController = new ReadController(readService);
export const noteController = new NoteController(noteService);