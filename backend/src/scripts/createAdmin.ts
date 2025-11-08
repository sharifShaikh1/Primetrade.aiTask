import dotenv from 'dotenv';
import { connectDB } from '../config/database';
import User from '../models/User';
import { logger } from '../utils/logger';

// Load env early
dotenv.config();

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'sharif3534@gmail.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'password123';
const ADMIN_NAME = process.env.ADMIN_NAME || 'Admin';

async function createOrUpdateAdmin() {
  try {
    await connectDB();

    const existing = await User.findOne({ email: ADMIN_EMAIL }).select('+password');

    if (!existing) {
      const user = new User({
        name: ADMIN_NAME,
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD,
        role: 'admin',
      });

      await user.save();
      logger.info(`Admin user created: ${ADMIN_EMAIL}`);
    } else {
      if (existing.role === 'admin') {
        logger.info(`Admin user already exists: ${ADMIN_EMAIL}. No changes made.`);
      } else {
        existing.role = 'admin';
        existing.password = ADMIN_PASSWORD;
        await existing.save();
        logger.info(`Existing user updated to admin: ${ADMIN_EMAIL}`);
      }
    }

    process.exit(0);
  } catch (error) {
    logger.error('Failed to create/update admin user:', error);
    process.exit(1);
  }
}

createOrUpdateAdmin();
