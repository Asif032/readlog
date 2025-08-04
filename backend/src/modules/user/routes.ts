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

// User CRUD routes
/**
 * @swagger
 * /api/v1/users:
 *   post:
 *     summary: Create a new user
 *     description: Creates a new user with the provided details.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: john.doe@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       '201':
 *         description: User created successfully
 *       '400':
 *         description: Bad request or validation error
 */
router.post('/', userController.createUser);

/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     summary: Get all users
 *     description: Retrieves a paginated list of users, optionally filtered by role.
 *     tags:
 *       - Users
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: The page number for pagination.
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 50
 *         description: The number of users to return per page.
 *       - in: query
 *         name: role
 *         schema:
 *           type: string
 *           enum: [user, admin]
 *         description: Filter users by their role.
 *     responses:
 *       '200':
 *         description: A list of users.
 *       '500':
 *         description: Failed to fetch users.
 */
router.get('/', userController.getAllUsers);

/**
 * @swagger
 * /api/v1/users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     description: Retrieves a single user by their unique ID.
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to retrieve.
 *     responses:
 *       '200':
 *         description: The user object.
 *       '404':
 *         description: User not found.
 */
router.get('/:id', userController.getUserById);

/**
 * @swagger
 * /api/v1/users/{id}:
 *   put:
 *     summary: Update a user
 *     description: Updates a user's details.
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to update.
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
 *         description: User updated successfully.
 *       '400':
 *         description: Failed to update user.
 */
router.put('/:id', userController.updateUser);

/**
 * @swagger
 * /api/v1/users/{id}:
 *   delete:
 *     summary: Delete a user
 *     description: Deletes a user, either softly or permanently.
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to delete.
 *       - in: query
 *         name: hard
 *         schema:
 *           type: boolean
 *           default: false
 *         description: If true, permanently deletes the user. Otherwise, performs a soft delete.
 *     responses:
 *       '200':
 *         description: User deleted successfully.
 *       '400':
 *         description: Failed to delete user.
 */
router.delete('/:id', userController.deleteUser);

// Additional user routes
/**
 * @swagger
 * /api/v1/users/{id}/toggle-status:
 *   patch:
 *     summary: Toggle user status
 *     description: Activates or deactivates a user's account.
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user.
 *     responses:
 *       '200':
 *         description: User status toggled successfully.
 *       '400':
 *         description: Failed to toggle user status.
 */
router.patch('/:id/toggle-status', userController.toggleUserStatus);

/**
 * @swagger
 * /api/v1/users/{id}/change-password:
 *   patch:
 *     summary: Change user password
 *     description: Updates a user's password.
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               currentPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Password changed successfully.
 *       '400':
 *         description: Failed to change password.
 */
router.patch('/:id/change-password', userController.changePassword);

/**
 * @swagger
 * /api/v1/users/login:
 *   post:
 *     summary: User login
 *     description: Authenticates a user and returns their details upon successful login.
 *     tags:
 *       - Users
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
 *         description: Login successful.
 *       '401':
 *         description: Login failed.
 */
router.post('/login', userController.loginUser);

export { router as userRoutes };