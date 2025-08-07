import { Router } from 'express';
import { container } from '../../container';
import { BookController } from './controller';
import { BookService } from './service';

const bookController = new BookController(container.resolve<BookService>('bookService'));

const router = Router();

router.post('/', bookController.create);
router.get('/', bookController.getAll);
router.get('/:id', bookController.get);
router.get('/title/:title', bookController.getByTitle);
router.get('/search/:title', bookController.searchByTitle);
router.put('/:id', bookController.update);
router.delete('/:id', bookController.delete);
router.delete('/:id/hard', bookController.hardDelete);

export { router as bookRoutes };