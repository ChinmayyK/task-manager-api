const Joi = require('joi');

const createTaskSchema = Joi.object({
  title: Joi.string().max(255).required(),
  description: Joi.string().allow('', null).optional(),
  status: Joi.string().valid('pending', 'in_progress', 'completed').optional(),
  dueDate: Joi.date().iso().allow(null).optional(),
});

const updateTaskSchema = Joi.object({
  title: Joi.string().max(255).optional(),
  description: Joi.string().allow('', null).optional(),
  status: Joi.string().valid('pending', 'in_progress', 'completed').optional(),
  dueDate: Joi.date().iso().allow(null).optional(),
});

module.exports = {
  createTaskSchema,
  updateTaskSchema,
};
