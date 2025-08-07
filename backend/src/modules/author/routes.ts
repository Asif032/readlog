import { Router } from 'express';
import { AuthorController } from './controller';
import { AuthorService } from './service';
import { AuthorRepository } from './repository';
import { db } from '../../database/connection';

const authorRepository = new AuthorRepository(db);
const authorService = new AuthorService(authorRepository);
const authorController = new AuthorController(authorService);

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