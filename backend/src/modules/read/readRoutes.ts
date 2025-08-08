import { Router } from 'express';
import { readController } from '../../container';

const router = Router();

/**
 * @swagger
 * /reads:
 *   post:
 *     summary: Create a new read
 *     tags: [Read]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Read'
 *     responses:
 *       201:
 *         description: The read was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Read'
 *       500:
 *         description: Some server error
 */
router.post('/', readController.create);

/**
 * @swagger
 * /reads:
 *   get:
 *     summary: Returns the list of all the reads
 *     tags: [Read]
 *     responses:
 *       200:
 *         description: The list of the reads
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Read'
 */
router.get('/', readController.getAll);

/**
 * @swagger
 * /reads/{id}:
 *   get:
 *     summary: Get the read by id
 *     tags: [Read]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The read id
 *     responses:
 *       200:
 *         description: The read description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Read'
 *       404:
 *         description: The read was not found
 */
router.get('/:id', readController.get);

/**
 * @swagger
 * /reads/{id}:
 *   put:
 *     summary: Update the read by the id
 *     tags: [Read]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The read id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Read'
 *     responses:
 *       200:
 *         description: The read was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Read'
 *       404:
 *         description: The read was not found
 *       500:
 *         description: Some error happened
 */
router.put('/:id', readController.update);

/**
 * @swagger
 * /reads/{id}:
 *   delete:
 *     summary: Remove the read by id
 *     tags: [Read]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The read id
 *     responses:
 *       204:
 *         description: The read was deleted
 *       404:
 *         description: The read was not found
 */
router.delete('/:id', readController.delete);

/**
 * @swagger
 * /reads/{id}/hard:
 *   delete:
 *     summary: Hard remove the read by id
 *     tags: [Read]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The read id
 *     responses:
 *       204:
 *         description: The read was deleted
 *       404:
 *         description: The read was not found
 */
router.delete('/:id/hard', readController.hardDelete);

/**
 * @swagger
 * /reads/user/{userId}:
 *   get:
 *     summary: Get books by user id
 *     tags: [Read]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [UPCOMING, READING, COMPLETED, DROPPED]
 *         required: false
 *         description: The read status
 *     responses:
 *       200:
 *         description: The list of books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 *       404:
 *         description: The user was not found
 */
router.get('/user/:userId', readController.getBooksByUserId);

/**
 * @swagger
 * /reads/book/{bookId}/count:
 *   get:
 *     summary: Get the number of users reading a book
 *     tags: [Read]
 *     parameters:
 *       - in: path
 *         name: bookId
 *         schema:
 *           type: string
 *         required: true
 *         description: The book id
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [UPCOMING, READING, COMPLETED, DROPPED]
 *         required: false
 *         description: The read status
 *     responses:
 *       200:
 *         description: The number of readers
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 count:
 *                   type: integer
 *       404:
 *         description: The book was not found
 */
router.get('/book/:bookId/count', readController.countReadersByBookId);

export { router as readRoutes };