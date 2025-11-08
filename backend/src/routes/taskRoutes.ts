import { Router } from 'express';
import {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  getAllTasksAdmin,
  createTaskValidation,
  updateTaskValidation,
} from '../controllers/taskController';
import { authenticate, authorize } from '../middleware/auth';
import { validate } from '../middleware/validator';

const router = Router();

router.use(authenticate);

router.get('/', getTasks);
router.post('/', createTaskValidation, validate, createTask);
router.get('/admin/all', authorize('admin'), getAllTasksAdmin);
router.get('/:id', getTask);
router.put('/:id', updateTaskValidation, validate, updateTask);
router.delete('/:id', deleteTask);

export default router;
