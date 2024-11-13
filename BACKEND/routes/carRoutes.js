const express = require('express');
const router = express.Router();
const carController = require('../controllers/carController');
const fetchuser = require('../middlewares/fetchuser');

/**
 * @swagger
 * tags:
 *   name: Cars
 *   description: Car management
 */

/**
 * @swagger
 * /api/cars/create:
 *   post:
 *     summary: Create a new car
 *     tags: [Cars]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - tags
 *               - images
 *             properties:
 *               title:
 *                 type: string
 *                 description: Car title
 *                 example: My Car
 *               description:
 *                 type: string
 *                 description: Car description
 *                 example: This is a description of my car.
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Car tags
 *                 example: ["SUV", "Toyota", "Dealer"]
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Car images
 *                 example: ["image1.jpg", "image2.jpg"]
 *     responses:
 *       201:
 *         description: Car created successfully
 *       500:
 *         description: Internal server error
 */
router.post('/create', fetchuser, carController.createCar);

/**
 * @swagger
 * /api/cars:
 *   get:
 *     summary: Get all cars for the logged-in user
 *     tags: [Cars]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of cars
 *       500:
 *         description: Internal server error
 */
router.get('/', fetchuser, carController.getUserCars);

/**
 * @swagger
 * /api/cars/search:
 *   get:
 *     summary: Search cars by keyword
 *     tags: [Cars]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: keyword
 *         schema:
 *           type: string
 *         required: true
 *         description: Keyword to search cars
 *     responses:
 *       200:
 *         description: List of cars matching the keyword
 *       500:
 *         description: Internal server error
 */
router.get('/search', fetchuser, carController.searchCars);

/**
 * @swagger
 * /api/cars/{id}:
 *   get:
 *     summary: Get a specific car by ID
 *     tags: [Cars]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Car ID
 *     responses:
 *       200:
 *         description: Car details
 *       404:
 *         description: Car not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id', fetchuser, carController.getCarById);

/**
 * @swagger
 * /api/cars/{id}:
 *   put:
 *     summary: Update a car by ID
 *     tags: [Cars]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Car ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Car title
 *                 example: My Car
 *               description:
 *                 type: string
 *                 description: Car description
 *                 example: This is a description of my car.
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Car tags
 *                 example: ["SUV", "Toyota", "Dealer"]
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Car images
 *                 example: ["image1.jpg", "image2.jpg"]
 *     responses:
 *       200:
 *         description: Car updated successfully
 *       404:
 *         description: Car not found
 *       500:
 *         description: Internal server error
 */
router.put('/:id', fetchuser, carController.updateCar);

/**
 * @swagger
 * /api/cars/{id}:
 *   delete:
 *     summary: Delete a car by ID
 *     tags: [Cars]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Car ID
 *     responses:
 *       200:
 *         description: Car removed successfully
 *       404:
 *         description: Car not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', fetchuser, carController.deleteCar);

module.exports = router;