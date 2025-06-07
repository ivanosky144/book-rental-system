/**
 * @swagger
 * tags:
 *   name: Genres
 *   description: Genre management
 * 
 * /genres:
 *   post:
 *     summary: Create a new genre
 *     tags: [Genres]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Fantasy"
 *     responses:
 *       201:
 *         description: Genre created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Genre created successfully"
 *                 data:
 *                   $ref: '#/components/schemas/Genre'
 *       500:
 *         description: Server error
 * 
 *   get:
 *     summary: Get all genres with book counts
 *     tags: [Genres]
 *     responses:
 *       200:
 *         description: List of genres retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Genres retrieved successfully"
 *                 data:
 *                   type: array
 *                   items:
 *                     allOf:
 *                       - $ref: '#/components/schemas/Genre'
 *                       - type: object
 *                         properties:
 *                           book_count:
 *                             type: integer
 *                             example: 5
 *       500:
 *         description: Server error
 * 
 * /genres/{id}:
 *   get:
 *     summary: Get genre by ID
 *     tags: [Genres]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the genre to retrieve
 *     responses:
 *       200:
 *         description: Genre retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Genre retrieved successfully"
 *                 data:
 *                   $ref: '#/components/schemas/Genre'
 *       404:
 *         description: Genre not found
 *       500:
 *         description: Server error
 * 
 *   put:
 *     summary: Update genre by ID
 *     tags: [Genres]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the genre to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Science Fiction"
 *     responses:
 *       200:
 *         description: Genre updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Genre updated successfully"
 *                 data:
 *                   $ref: '#/components/schemas/Genre'
 *       404:
 *         description: Genre not found
 *       500:
 *         description: Server error
 * 
 *   delete:
 *     summary: Delete genre by ID
 *     tags: [Genres]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the genre to delete
 *     responses:
 *       200:
 *         description: Genre deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Genre deleted successfully"
 *       404:
 *         description: Genre not found
 *       500:
 *         description: Server error
 * 
 * components:
 *   schemas:
 *     Genre:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: "Fantasy"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2024-01-01T12:00:00Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2024-01-02T12:00:00Z"
 */
