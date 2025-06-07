/**
 * @swagger
 * tags:
 *   name: Payments
 *   description: Payment management
 * 
 * /payments:
 *   post:
 *     summary: Create a new payment
 *     tags: [Payments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *               - rental_id
 *               - amount
 *               - payment_date
 *               - method
 *             properties:
 *               user_id:
 *                 type: integer
 *                 example: 12
 *               rental_id:
 *                 type: integer
 *                 example: 34
 *               amount:
 *                 type: number
 *                 format: float
 *                 example: 150.75
 *               payment_date:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-06-01T12:30:00Z"
 *               method:
 *                 type: string
 *                 example: "Credit Card"
 *     responses:
 *       201:
 *         description: Payment created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Payment'
 *       500:
 *         description: Failed to create payment
 * 
 *   get:
 *     summary: Get all payments
 *     tags: [Payments]
 *     responses:
 *       200:
 *         description: Payments retrieved successfully
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
 *                     $ref: '#/components/schemas/Payment'
 *       500:
 *         description: Failed to retrieve payments
 * 
 * /payments/{id}:
 *   get:
 *     summary: Get payment by ID
 *     tags: [Payments]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the payment to retrieve
 *     responses:
 *       200:
 *         description: Payment retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Payment'
 *       404:
 *         description: Payment not found
 *       500:
 *         description: Failed to retrieve payment
 * 
 *   put:
 *     summary: Update payment by ID
 *     tags: [Payments]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the payment to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: integer
 *                 example: 12
 *               rental_id:
 *                 type: integer
 *                 example: 34
 *               amount:
 *                 type: number
 *                 format: float
 *                 example: 175.00
 *               payment_date:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-06-02T15:00:00Z"
 *               method:
 *                 type: string
 *                 example: "PayPal"
 *     responses:
 *       200:
 *         description: Payment updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Payment'
 *       404:
 *         description: Payment not found
 *       500:
 *         description: Failed to update payment
 * 
 *   delete:
 *     summary: Delete payment by ID
 *     tags: [Payments]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the payment to delete
 *     responses:
 *       200:
 *         description: Payment deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Payment not found
 *       500:
 *         description: Failed to delete payment
 * 
 * components:
 *   schemas:
 *     Payment:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         user_id:
 *           type: integer
 *           example: 12
 *         rental_id:
 *           type: integer
 *           example: 34
 *         amount:
 *           type: number
 *           format: float
 *           example: 150.75
 *         payment_date:
 *           type: string
 *           format: date-time
 *           example: "2025-06-01T12:30:00Z"
 *         method:
 *           type: string
 *           example: "Credit Card"
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */
