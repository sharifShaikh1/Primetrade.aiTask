import { Router } from 'express';
import { authenticate, authorize } from '../middleware/auth';
import { validate } from '../middleware/validator';
import { getAllUsers, updateUserRole, deleteUser, updateUserRoleValidation } from '../controllers/adminController';

const router = Router();


router.use(authenticate);
router.use(authorize('admin'));

router.get('/users', getAllUsers);
router.put('/users/:id/role', updateUserRoleValidation, validate, updateUserRole);
router.delete('/users/:id', deleteUser);

export default router;
