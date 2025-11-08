import { createClient, RedisClientType } from 'redis';
import dotenv from 'dotenv';
import { logger } from '../utils/logger';

dotenv.config();

const redisUrl = process.env.REDIS_URL || '';
const redisPassword = process.env.REDIS_PASSWORD || undefined;

let redisClient: RedisClientType | null = null;

if (redisUrl) {
  try {
    const urlObj = new URL(redisUrl);
    const isTls = urlObj.protocol === 'rediss:';

    const options: any = {
      url: redisUrl,
    };

    if (redisPassword) options.password = redisPassword;

    if (isTls) {
      options.socket = { tls: true };
    }

    redisClient = createClient(options);

    redisClient.on('error', (err) => {
      logger.error('Redis Client Error:', err);
    });

    redisClient.on('connect', () => {
      logger.info('Redis connected successfully');
    });
  } catch (err) {
    logger.error('Invalid REDIS_URL format:', err);
    process.exit(1);
  }
} else {
  logger.error('FATAL: REDIS_URL is not provided. Redis is required for the application to run.');
  process.exit(1);
}

export const connectRedis = async (): Promise<void> => {
  if (!redisClient) {
    logger.error('Redis client is not initialized.');
    process.exit(1);
  }

  try {
    await redisClient.connect();
  } catch (error: any) {
    logger.error('Could not connect to Redis:', error);
    process.exit(1);
  }
};

export default redisClient;
