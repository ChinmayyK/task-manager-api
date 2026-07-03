const taskService = require('../services/task.service');
const sendResponse = require('../utils/response');

const createTask = async (req, res, next) => {
  try {
    const taskData = { ...req.body };
    if (req.file) {
      taskData.attachment = req.file.path;
    }
    const task = await taskService.createTask(req.user.id, taskData);
    return sendResponse(res, 201, 'Task created successfully', task);
  } catch (error) {
    next(error);
  }
};

const getTasks = async (req, res, next) => {
  try {
    const data = await taskService.getTasks(req.user.id, req.query);
    return sendResponse(res, 200, 'Tasks retrieved successfully', data);
  } catch (error) {
    next(error);
  }
};

const getTaskById = async (req, res, next) => {
  try {
    const task = await taskService.getTaskById(req.user.id, req.params.id);
    return sendResponse(res, 200, 'Task retrieved successfully', task);
  } catch (error) {
    next(error);
  }
};

const updateTask = async (req, res, next) => {
  try {
    const updateData = { ...req.body };
    if (req.file) {
      updateData.attachment = req.file.path;
    }
    const task = await taskService.updateTask(req.user.id, req.params.id, updateData);
    return sendResponse(res, 200, 'Task updated successfully', task);
  } catch (error) {
    next(error);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    await taskService.deleteTask(req.user.id, req.params.id);
    return sendResponse(res, 200, 'Task deleted successfully');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
};
