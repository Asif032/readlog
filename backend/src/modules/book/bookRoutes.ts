import { Router } from 'express';
import { bookController } from '../../container';

const router = Router();

/**
 * @swagger
 * /books:
 *   post:
 *     tags:
 *       - Book
 *     summary: Create a new book
 *     description: Create a new book.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               author_id:
 *                 type: integer
 *               genre:
 *                 type: string
 *               publication_year:
 *                 type: integer
 *     responses:
 *       '201':
 *         description: Book created successfully
 */
router.post('/', bookController.create);
/**
 * @swagger
 * /books:
 *   get:
 *     tags:
 *       - Book
 *     summary: Get all books
 *     description: Retrieve a list of all books.
 *     responses:
 *       '200':
 *         description: A list of books
 */
router.get('/', bookController.getAll);
/**
 * @swagger
 * /books/{id}:
 *   get:
 *     tags:
 *       - Book
 *     summary: Get a book by ID
 *     description: Retrieve a single book by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: A single book
 *       '404':
 *         description: Book not found
 */
router.get('/:id', bookController.get);
/**
 * @swagger
 * /books/title/{title}:
 *   get:
 *     tags:
 *       - Book
 *     summary: Get a book by title
 *     description: Retrieve a single book by its title.
 *     parameters:
 *       - in: path
 *         name: title
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: A book
 *       '404':
 *         description: Book not found
 */
router.get('/title/:title', bookController.getByTitle);
/**
 * @swagger
 * /books/search/{title}:
 *   get:
 *     tags:
 *       - Book
 *     summary: Search books by title
 *     description: Search for books by title.
 *     parameters:
 *       - in: path
 *         name: title
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: A list of books matching the search
 */
router.get('/search/:title', bookController.searchByTitle);
/**
 * @swagger
 * /books/{id}:
 *   put:
 *     tags:
 *       - Book
 *     summary: Update a book
 *     description: Update an existing book's details.
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
 *               title:
 *                 type: string
 *               author_id:
 *                 type: integer
 *               genre:
 *                 type: string
 *               publication_year:
 *                 type: integer
 *     responses:
 *       '200':
 *         description: Book updated successfully
 *       '404':
 *         description: Book not found
 */
router.put('/:id', bookController.update);
/**
 * @swagger
 * /books/{id}:
 *   delete:
 *     tags:
 *       - Book
 *     summary: Soft delete a book
 *     description: Soft delete a book by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Book soft deleted successfully
 *       '404':
 *         description: Book not found
 */
router.delete('/:id', bookController.delete);
/**
 * @swagger
 * /books/{id}/hard:
 *   delete:
 *     tags:
 *       - Book
 *     summary: Hard delete a book
 *     description: Permanently delete a book by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Book permanently deleted successfully
 *       '404':
 *         description: Book not found
 */
router.delete('/:id/hard', bookController.hardDelete);

export { router as bookRoutes };