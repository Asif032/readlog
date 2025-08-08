import { Router } from 'express';
import { authorController } from '../../container';

const router = Router();

/**
 * @swagger
 * /authors:
 *   post:
 *     tags:
 *       - Author
 *     summary: Create a new author
 *     description: Create a new author.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               bio:
 *                 type: string
 *               birth_date:
 *                 type: string
 *                 format: date
 *     responses:
 *       '201':
 *         description: Author created successfully
 */
router.post('/', authorController.create);
/**
 * @swagger
 * /authors:
 *   get:
 *     tags:
 *       - Author
 *     summary: Get all authors
 *     description: Retrieve a list of all authors.
 *     responses:
 *       '200':
 *         description: A list of authors
 */
router.get('/', authorController.getAll);
/**
 * @swagger
 * /authors/{id}:
 *   get:
 *     tags:
 *       - Author
 *     summary: Get an author by ID
 *     description: Retrieve a single author by their ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: A single author
 *       '404':
 *         description: Author not found
 */
router.get('/:id', authorController.get);
/**
 * @swagger
 * /authors/name/{name}:
 *   get:
 *     tags:
 *       - Author
 *     summary: Get an author by name
 *     description: Retrieve a single author by their name.
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: An author
 *       '404':
 *         description: Author not found
 */
router.get('/name/:name', authorController.getByName);
/**
 * @swagger
 * /authors/search/{name}:
 *   get:
 *     tags:
 *       - Author
 *     summary: Search authors by name
 *     description: Search for authors by name.
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: A list of authors matching the search
 */
router.get('/search/:name', authorController.searchByName);
/**
 * @swagger
 * /authors/{id}:
 *   put:
 *     tags:
 *       - Author
 *     summary: Update an author
 *     description: Update an existing author's details.
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
 *               bio:
 *                 type: string
 *               birth_date:
 *                 type: string
 *                 format: date
 *     responses:
 *       '200':
 *         description: Author updated successfully
 *       '404':
 *         description: Author not found
 */
router.put('/:id', authorController.update);
/**
 * @swagger
 * /authors/{id}:
 *   delete:
 *     tags:
 *       - Author
 *     summary: Soft delete an author
 *     description: Soft delete an author by their ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Author soft deleted successfully
 *       '404':
 *         description: Author not found
 */
router.delete('/:id', authorController.delete);
/**
 * @swagger
 * /authors/{id}/hard:
 *   delete:
 *     tags:
 *       - Author
 *     summary: Hard delete an author
 *     description: Permanently delete an author by their ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Author permanently deleted successfully
 *       '404':
 *         description: Author not found
 */
router.delete('/:id/hard', authorController.hardDelete);

export { router as authorRoutes };