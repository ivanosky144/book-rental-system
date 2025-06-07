/**
 * @swagger
 * tags:
 *   name: Books
 *   description: Book management
 * 
 * /books:
 *   post:
 *     summary: Create a new book
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - publication_year
 *               - isbn
 *               - summary
 *               - cover_image_url
 *               - publisher_id
 *               - genre_ids
 *               - author_ids
 *             properties:
 *               title:
 *                 type: string
 *                 example: "The Great Gatsby"
 *               publication_year:
 *                 type: integer
 *                 example: 1925
 *               isbn:
 *                 type: string
 *                 example: "978-3-16-148410-0"
 *               summary:
 *                 type: string
 *                 example: "A novel set in the Roaring Twenties..."
 *               cover_image_url:
 *                 type: string
 *                 format: uri
 *                 example: "http://example.com/image.jpg"
 *               publisher_id:
 *                 type: integer
 *                 example: 5
 *               genre_ids:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 example: [1, 3]
 *               author_ids:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 example: [2, 4]
 *     responses:
 *       201:
 *         description: Book created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Book'
 *       500:
 *         description: Server error
 * 
 *   get:
 *     summary: Get all books
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: List of books retrieved successfully
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
 *                     $ref: '#/components/schemas/BookWithRelations'
 *       500:
 *         description: Server error
 * 
 * /books/{id}:
 *   get:
 *     summary: Get book by ID
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the book to retrieve
 *     responses:
 *       200:
 *         description: Book retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/BookWithRelations'
 *       404:
 *         description: Book not found
 *       500:
 *         description: Server error
 * 
 *   put:
 *     summary: Update book by ID
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the book to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Updated Book Title"
 *               publication_year:
 *                 type: integer
 *                 example: 1930
 *               isbn:
 *                 type: string
 *                 example: "978-3-16-148410-0"
 *               summary:
 *                 type: string
 *                 example: "Updated summary..."
 *               cover_image_url:
 *                 type: string
 *                 format: uri
 *                 example: "http://example.com/newimage.jpg"
 *               publisher_id:
 *                 type: integer
 *                 example: 6
 *     responses:
 *       200:
 *         description: Book updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Book'
 *       404:
 *         description: Book not found
 *       500:
 *         description: Server error
 * 
 *   delete:
 *     summary: Delete book by ID
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the book to delete
 *     responses:
 *       200:
 *         description: Book deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Book not found
 *       500:
 *         description: Server error
 * 
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         title:
 *           type: string
 *           example: "The Great Gatsby"
 *         publication_year:
 *           type: integer
 *           example: 1925
 *         isbn:
 *           type: string
 *           example: "978-3-16-148410-0"
 *         summary:
 *           type: string
 *           example: "A novel set in the Roaring Twenties..."
 *         cover_image_url:
 *           type: string
 *           format: uri
 *           example: "http://example.com/image.jpg"
 *         publisher_id:
 *           type: integer
 *           example: 5
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 * 
 *     Author:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: "F. Scott Fitzgerald"
 * 
 *     Genre:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: "Classic"
 * 
 *     BookWithRelations:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         title:
 *           type: string
 *           example: "The Great Gatsby"
 *         publication_year:
 *           type: integer
 *           example: 1925
 *         isbn:
 *           type: string
 *           example: "978-3-16-148410-0"
 *         summary:
 *           type: string
 *           example: "A novel set in the Roaring Twenties..."
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *         authors:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Author'
 *         genres:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Genre'
 */
