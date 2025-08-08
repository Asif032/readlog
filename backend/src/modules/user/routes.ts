import { Router } from 'express';
import { userService } from '../../container';
import { UserController } from './controller';

const userController = new UserController(userService);

const router = Router();

/**
 * @swagger
 * /users:
 *   post:
 *     tags:
 *       - User
 *     summary: Create a new user
 *     description: Create a new user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '201':
 *         description: User created successfully
 */
router.post('/', userController.create);
/**
 * @swagger
 * /users:
 *   get:
 *     tags:
 *       - User
 *     summary: Get all users
 *     description: Retrieve a list of all users.
 *     responses:
 *       '200':
 *         description: A list of users
 */
router.get('/', userController.getAll);
/**
 * @swagger
 * /users/{id}:
 *   get:
 *     tags:
 *       - User
 *     summary: Get a user by ID
 *     description: Retrieve a single user by their ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: A single user
 *       '404':
 *         description: User not found
 */
router.get('/:id', userController.getById);
/**
 * @swagger
 * /users/{id}:
 *   put:
 *     tags:
 *       - User
 *     summary: Update a user
 *     description: Update an existing user's details.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       '200':
 *         description: User updated successfully
 *       '404':
 *         description: User not found
 */
router.put('/:id', userController.update);
/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     tags:
 *       - User
 *     summary: Delete a user
 *     description: Delete a user by their ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: User deleted successfully
 *       '404':
 *         description: User not found
 */
router.delete('/:id', userController.delete);
/**
 * @swagger
 * /users/{id}/toggle-status:
 *   patch:
 *     tags:
 *       - User
 *     summary: Toggle user active status
 *     description: Toggle the active status of a user.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: User status updated successfully
 *       '404':
 *         description: User not found
 */
router.patch('/:id/toggle-status', userController.toggleActiveStatus);
/**
 * @swagger
 * /users/{id}/change-password:
 *   patch:
 *     tags:
 *       - User
 *     summary: Change user password
 *     description: Change the password for a user.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               old_password:
 *                 type: string
 *               new_password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Password changed successfully
 *       '400':
 *         description: Invalid old password
 *       '404':
 *         description: User not found
 */
router.patch('/:id/change-password', userController.changePassword);
/**
 * @swagger
 * /users/login:
 *   post:
 *     tags:
 *       - User
 *     summary: User login
 *     description: Authenticate a user and receive a token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Login successful
 *       '401':
 *         description: Invalid credentials
 */
router.post('/login', userController.login);

export { router as userRoutes };