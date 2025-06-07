/**
 * @swagger
 * tags:
 *   name: Rentals
 *   description: Rental management
 * 
 * /rentals:
 *   post:
 *     summary: Create a new rental
 *     tags: [Rentals]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *               - book_copy_id
 *               - rental_date
 *               - due_date
 *               - status
 *             properties:
 *               user_id:
 *                 type: integer
 *                 example: 1
 *               book_copy_id:
 *                 type: integer
 *                 example: 100
 *               rental_date:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-06-07T10:00:00Z"
 *               due_date:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-06-14T10:00:00Z"
 *               return_date:
 *                 type: string
 *                 format: date-time
 *                 nullable: true
 *                 example: null
 *               status:
 *                 type: string
 *                 example: "ongoing"
 *     responses:
 *       201:
 *         description: Rental created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Rental'
 *       500:
 *         description: Failed to create rental
 * 
 *   get:
 *     summary: Get all rentals
 *     tags: [Rentals]
 *     responses:
 *       200:
 *         description: Rentals retrieved successfully
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
 *                     $ref: '#/components/schemas/Rental'
 *       500:
 *         description: Failed to retrieve rentals
 * 
 * /rentals/{id}:
 *   get:
 *     summary: Get rental by ID
 *     tags: [Rentals]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Rental ID
 *     responses:
 *       200:
 *         description: Rental retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Rental'
 *       404:
 *         description: Rental not found
 *       500:
 *         description: Failed to retrieve rental
 * 
 *   put:
 *     summary: Update rental by ID
 *     tags: [Rentals]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Rental ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: integer
 *                 example: 1
 *               book_copy_id:
 *                 type: integer
 *                 example: 100
 *               rental_date:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-06-07T10:00:00Z"
 *               due_date:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-06-14T10:00:00Z"
 *               return_date:
 *                 type: string
 *                 format: date-time
 *                 nullable: true
 *                 example: "2025-06-10T12:00:00Z"
 *               status:
 *                 type: string
 *                 example: "returned"
 *     responses:
 *       200:
 *         description: Rental updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Rental'
 *       404:
 *         description: Rental not found
 *       500:
 *         description: Failed to update rental
 * 
 *   delete:
 *     summary: Delete rental by ID
 *     tags: [Rentals]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Rental ID
 *     responses:
 *       200:
 *         description: Rental deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Rental not found
 *       500:
 *         description: Failed to delete rental
 * 
 * components:
 *   schemas:
 *     Rental:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         user_id:
 *           type: integer
 *           example: 1
 *         book_copy_id:
 *           type: integer
 *           example: 100
 *         rental_date:
 *           type: string
 *           format: date-time
 *           example: "2025-06-07T10:00:00Z"
 *         due_date:
 *           type: string
 *           format: date-time
 *           example: "2025-06-14T10:00:00Z"
 *         return_date:
 *           type: string
 *           format: date-time
 *           nullable: true
 *           example: "2025-06-10T12:00:00Z"
 *         status:
 *           type: string
 *           example: "ongoing"
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */
