import { Router } from 'express';
import { container } from '../../container';
import { UserController } from './controller';
import { UserService } from './service';

const userController = new UserController(container.resolve<UserService>('userService'));

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