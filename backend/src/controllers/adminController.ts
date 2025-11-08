import { Request, Response, NextFunction } from 'express';
import { body } from 'express-validator';
import User from '../models/User';
import { AppError } from '../middleware/errorHandler';
import { logger } from '../utils/logger';

// GET /api/v1/admin/users
export const getAllUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: users.length,
      data: { users },
    });
  } catch (error) {
    next(error);
  }
};

// PUT /api/v1/admin/users/:id/role
export const updateUserRole = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { role } = req.body;
    const userId = req.params.id;

    if (!['user', 'admin'].includes(role)) {
      throw new AppError('Invalid role', 400);
    }

    const user = await User.findById(userId);
    if (!user) {
      throw new AppError('User not found', 404);
    }

    user.role = role as any;
    await user.save();

    logger.info(`User role updated: ${user.email} -> ${role}`);

    res.status(200).json({
      success: true,
      message: 'User role updated successfully',
      data: { user: { _id: user._id, name: user.name, email: user.email, role: user.role } },
    });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/v1/admin/users/:id
export const deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.params.id;

    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      throw new AppError('User not found', 404);
    }

    logger.info(`User deleted: ${user.email}`);

    res.status(200).json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    next(error);
  }
};

export const updateUserRoleValidation = [body('role').exists().withMessage('Role is required')];
