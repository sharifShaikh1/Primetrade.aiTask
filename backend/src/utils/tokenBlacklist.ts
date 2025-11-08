import redisClient from '../config/redis';
import { logger } from './logger';

const TOKEN_BLACKLIST_PREFIX = 'blacklist:';

export const blacklistToken = async (token: string, expiresIn: number): Promise<void> => {
  try {
    if (!redisClient) {
      logger.warn('Redis client not available: skipping token blacklist');
      return;
    }
    const key = `${TOKEN_BLACKLIST_PREFIX}${token}`;
    await redisClient.setEx(key, expiresIn, 'blacklisted');
    logger.info('Token blacklisted successfully');
  } catch (error) {
    logger.error('Error blacklisting token:', error);
    return;
  }
};

export const isTokenBlacklisted = async (token: string): Promise<boolean> => {
  try {
    if (!redisClient) {
      logger.warn('Redis client not available, blocking token as a security precaution.');
      return true;
    }
    const key = `${TOKEN_BLACKLIST_PREFIX}${token}`;
    const result = await redisClient.get(key);
    return result !== null;
  } catch (error) {
    logger.error('Error checking token blacklist, blocking token as a security precaution.:', error);
    return true;
  }
};
