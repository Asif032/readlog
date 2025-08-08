import { Router } from 'express';
import { noteController } from '../../container';

const router = Router();

/**
 * @swagger
 * /notes:
 *   post:
 *     summary: Create a new note
 *     tags: [Note]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Note'
 *     responses:
 *       201:
 *         description: The note was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Note'
 *       500:
 *         description: Some server error
 */
router.post('/', noteController.create);

/**
 * @swagger
 * /notes:
 *   get:
 *     summary: Returns the list of all the notes
 *     tags: [Note]
 *     responses:
 *       200:
 *         description: The list of the notes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Note'
 */
router.get('/', noteController.getAll);

/**
 * @swagger
 * /notes/{id}:
 *   get:
 *     summary: Get the note by id
 *     tags: [Note]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The note id
 *     responses:
 *       200:
 *         description: The note description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Note'
 *       404:
 *         description: The note was not found
 */
router.get('/:id', noteController.get);

/**
 * @swagger
 * /notes/{id}:
 *   put:
 *     summary: Update the note by the id
 *     tags: [Note]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The note id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Note'
 *     responses:
 *       200:
 *         description: The note was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Note'
 *       404:
 *         description: The note was not found
 *       500:
 *         description: Some error happened
 */
router.put('/:id', noteController.update);

/**
 * @swagger
 * /notes/{id}:
 *   delete:
 *     summary: Remove the note by id
 *     tags: [Note]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The note id
 *     responses:
 *       204:
 *         description: The note was deleted
 *       404:
 *         description: The note was not found
 */
router.delete('/:id', noteController.delete);

/**
 * @swagger
 * /notes/{id}/hard:
 *   delete:
 *     summary: Hard remove the note by id
 *     tags: [Note]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The note id
 *     responses:
 *       204:
 *         description: The note was deleted
 *       404:
 *         description: The note was not found
 */
router.delete('/:id/hard', noteController.hardDelete);

/**
 * @swagger
 * /notes/user/{userId}:
 *   get:
 *     summary: Get notes by user id
 *     tags: [Note]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *     responses:
 *       200:
 *         description: The list of notes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Note'
 *       404:
 *         description: The user was not found
 */
router.get('/user/:userId', noteController.getNotesByUserId);

/**
 * @swagger
 * /notes/user/{userId}/book/{bookId}:
 *   get:
 *     summary: Get notes by user and book id
 *     tags: [Note]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *       - in: path
 *         name: bookId
 *         schema:
 *           type: string
 *         required: true
 *         description: The book id
 *     responses:
 *       200:
 *         description: The list of notes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Note'
 *       404:
 *         description: The user or book was not found
 */
router.get('/user/:userId/book/:bookId', noteController.getNotesByUserAndBook);

/**
 * @swagger
 * /notes/book/{bookId}:
 *   get:
 *     summary: Get notes by book id
 *     tags: [Note]
 *     parameters:
 *       - in: path
 *         name: bookId
 *         schema:
 *           type: string
 *         required: true
 *         description: The book id
 *     responses:
 *       200:
 *         description: The list of notes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Note'
 *       404:
 *         description: The book was not found
 */
router.get('/book/:bookId', noteController.getNotesByBookId);

/**
 * @swagger
 * /notes/search:
 *   get:
 *     summary: Search notes by keyword
 *     tags: [Note]
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         required: true
 *         description: The keyword to search for
 *     responses:
 *       200:
 *         description: The list of notes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Note'
 */
router.get('/search', noteController.searchNotes);

/**
 * @swagger
 * /notes/book/{bookId}/chapter/{chapter}:
 *   get:
 *     summary: Get notes by book and chapter
 *     tags: [Note]
 *     parameters:
 *       - in: path
 *         name: bookId
 *         schema:
 *           type: string
 *         required: true
 *         description: The book id
 *       - in: path
 *         name: chapter
 *         schema:
 *           type: string
 *         required: true
 *         description: The chapter name
 *     responses:
 *       200:
 *         description: The list of notes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Note'
 *       404:
 *         description: The book or chapter was not found
 */
router.get('/book/:bookId/chapter/:chapter', noteController.getNotesByBookAndChapter);

/**
 * @swagger
 * /notes/user/{userId}/count:
 *   get:
 *     summary: Get the number of notes for a user
 *     tags: [Note]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *     responses:
 *       200:
 *         description: The number of notes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 count:
 *                   type: integer
 *       404:
 *         description: The user was not found
 */
router.get('/user/:userId/count', noteController.countNotesByUserId);

/**
 * @swagger
 * /notes/book/{bookId}/count:
 *   get:
 *     summary: Get the number of notes for a book
 *     tags: [Note]
 *     parameters:
 *       - in: path
 *         name: bookId
 *         schema:
 *           type: string
 *         required: true
 *         description: The book id
 *     responses:
 *       200:
 *         description: The number of notes
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
router.get('/book/:bookId/count', noteController.countNotesByBookId);

export { router as noteRoutes };