/**
 * @swagger
 * tags:
 *   name: Authors
 *   description: Author management
 * 
 * /authors:
 *   post:
 *     summary: Create a new author
 *     tags: [Authors]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - bio
 *               - nationality
 *             properties:
 *               name:
 *                 type: string
 *                 example: Jane Austen
 *               bio:
 *                 type: string
 *                 example: English novelist known for Pride and Prejudice.
 *               nationality:
 *                 type: string
 *                 example: British
 *     responses:
 *       201:
 *         description: Author created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Author'
 *       500:
 *         description: Server error
 * 
 *   get:
 *     summary: Get all authors with book count
 *     tags: [Authors]
 *     responses:
 *       200:
 *         description: List of authors retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/AuthorWithBookCount'
 *       500:
 *         description: Server error
 * 
 * /authors/{id}:
 *   get:
 *     summary: Get author by ID
 *     tags: [Authors]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the author to get
 *     responses:
 *       200:
 *         description: Author retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Author'
 *       404:
 *         description: Author not found
 *       500:
 *         description: Server error
 * 
 *   put:
 *     summary: Update author by ID
 *     tags: [Authors]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the author to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Jane Austen Updated
 *               bio:
 *                 type: string
 *                 example: English novelist and author of Pride and Prejudice.
 *               nationality:
 *                 type: string
 *                 example: British
 *     responses:
 *       201:
 *         description: Author updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Author'
 *       404:
 *         description: Author not found
 *       500:
 *         description: Server error
 * 
 *   delete:
 *     summary: Delete author by ID
 *     tags: [Authors]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the author to delete
 *     responses:
 *       201:
 *         description: Author deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Author not found
 *       500:
 *         description: Server error
 * 
 * components:
 *   schemas:
 *     Author:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: Jane Austen
 *         bio:
 *           type: string
 *           example: English novelist known for Pride and Prejudice.
 *         nationality:
 *           type: string
 *           example: British
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2023-07-10T15:04:05Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2023-07-15T12:00:00Z"
 * 
 *     AuthorWithBookCount:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: Jane Austen
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2023-07-10T15:04:05Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2023-07-15T12:00:00Z"
 *         book_count:
 *           type: integer
 *           example: 5
 */
