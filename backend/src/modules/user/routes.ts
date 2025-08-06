import { Router } from 'express';
import { UserController } from './controller';
import { UserService } from './service';
import { UserRepository } from './repository';
import { db } from '../../database/connection';

// Create instances
const userRepository = new UserRepository(db);
const userService = new UserService(userRepository);
const userController = new UserController(userService);

const router = Router();

router.post('/', userController.create);
router.get('/', userController.getAll);
router.get('/:id', userController.getById);
router.put('/:id', userController.update);
router.delete('/:id', userController.delete);
router.patch('/:id/toggle-status', userController.toggleActiveStatus);
router.patch('/:id/change-password', userController.changePassword);
router.post('/login', userController.login);

export { router as userRoutes };