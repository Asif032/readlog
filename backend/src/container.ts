import { asClass, asValue, createContainer, Lifetime } from 'awilix';
import { db } from './database/connection';
import { AuthorRepository } from './modules/author/repository';
import { AuthorService } from './modules/author/service';
import { BookRepository } from './modules/book/repository';
import { BookService } from './modules/book/service';
import { UserRepository } from './modules/user/repository';
import { UserService } from './modules/user/service';

const container = createContainer();

container.register({
  db: asValue(db),

  // Repositories
  userRepository: asClass(UserRepository, { lifetime: Lifetime.SINGLETON }),
  authorRepository: asClass(AuthorRepository, { lifetime: Lifetime.SINGLETON }),
  bookRepository: asClass(BookRepository, { lifetime: Lifetime.SINGLETON }),

  // Services
  userService: asClass(UserService, { lifetime: Lifetime.SINGLETON }),
  authorService: asClass(AuthorService, { lifetime: Lifetime.SINGLETON }),
  bookService: asClass(BookService, { lifetime: Lifetime.SINGLETON }),
});

export { container };