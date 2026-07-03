const express = require('express');
const taskController = require('../controllers/task.controller');
const validate = require('../middleware/validate');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');
const { createTaskSchema, updateTaskSchema } = require('../validators/task.validator');

const router = express.Router();

router.use(protect); // All task routes require authentication

/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Task management endpoints
 */

/**
 * @swagger
 * /api/tasks:
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               dueDate:
 *                 type: string
 *                 format: date-time
 *               attachment:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Task successfully created
 *   get:
 *     summary: Get all tasks for the logged in user
 *     tags: [Tasks]
 *     responses:
 *       200:
 *         description: List of tasks
 */
router
  .route('/')
  .post(upload.single('attachment'), validate(createTaskSchema), taskController.createTask)
  .get(taskController.getTasks);

/**
 * @swagger
 * /api/tasks/{id}:
 *   get:
 *     summary: Get a specific task by ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Task details
 *       404:
 *         description: Task not found
 *   put:
 *     summary: Update a task
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: false
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *               dueDate:
 *                 type: string
 *                 format: date-time
 *               attachment:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Task successfully updated
 *       404:
 *         description: Task not found
 *   delete:
 *     summary: Delete a task
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Task successfully deleted
 *       404:
 *         description: Task not found
 */
router
  .route('/:id')
  .get(taskController.getTaskById)
  .put(upload.single('attachment'), validate(updateTaskSchema), taskController.updateTask)
  .delete(taskController.deleteTask);

module.exports = router;
