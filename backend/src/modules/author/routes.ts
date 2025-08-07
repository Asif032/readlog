import { Router } from 'express';
import { container } from '../../container';
import { AuthorController } from './controller';
import { AuthorService } from './service';

const authorController = new AuthorController(container.resolve<AuthorService>('authorService'));

const router = Router();

router.post('/', authorController.create);
router.get('/', authorController.getAll);
router.get('/:id', authorController.get);
router.get('/name/:name', authorController.getByName);
router.get('/search/:name', authorController.searchByName);
router.put('/:id', authorController.update);
router.delete('/:id', authorController.delete);
router.delete('/:id/hard', authorController.hardDelete);

export { router as authorRoutes };