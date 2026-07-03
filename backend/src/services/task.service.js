const prisma = require('../models/prismaClient');
const AppError = require('../utils/AppError');

const createTask = async (userId, taskData) => {
  return await prisma.task.create({
    data: {
      ...taskData,
      userId,
    },
  });
};

const getTasks = async (userId, query) => {
  const { status, search, page = 1, limit = 10 } = query;
  const skip = (page - 1) * limit;

  const where = {
    userId,
  };

  if (status) {
    where.status = status;
  }

  if (search) {
    where.OR = [
      { title: { contains: search } },
      { description: { contains: search } },
    ];
  }

  const [tasks, total] = await Promise.all([
    prisma.task.findMany({
      where,
      skip: parseInt(skip),
      take: parseInt(limit),
      orderBy: { createdAt: 'desc' },
    }),
    prisma.task.count({ where }),
  ]);

  return {
    tasks,
    pagination: {
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(total / limit),
    },
  };
};

const getTaskById = async (userId, taskId) => {
  const task = await prisma.task.findFirst({
    where: {
      id: taskId,
      userId,
    },
  });

  if (!task) {
    throw new AppError('Task not found', 404);
  }

  return task;
};

const updateTask = async (userId, taskId, updateData) => {
  const task = await getTaskById(userId, taskId); // Ensures task exists and belongs to user

  return await prisma.task.update({
    where: { id: task.id },
    data: updateData,
  });
};

const deleteTask = async (userId, taskId) => {
  const task = await getTaskById(userId, taskId); // Ensures task exists and belongs to user

  return await prisma.task.delete({
    where: { id: task.id },
  });
};

module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
};
