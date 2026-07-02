const express = require('express');
const taskController = require('../controllers/task.controller');
const validate = require('../middleware/validate');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');
const { createTaskSchema, updateTaskSchema } = require('../validators/task.validator');

const router = express.Router();

router.use(protect); // All task routes require authentication

router
  .route('/')
  .post(upload.single('attachment'), validate(createTaskSchema), taskController.createTask)
  .get(taskController.getTasks);

router
  .route('/:id')
  .get(taskController.getTaskById)
  .put(upload.single('attachment'), validate(updateTaskSchema), taskController.updateTask)
  .delete(taskController.deleteTask);

module.exports = router;
