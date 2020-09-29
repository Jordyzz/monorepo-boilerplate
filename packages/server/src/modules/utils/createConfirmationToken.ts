import { v4 } from "uuid";
import { confirmationPrefix } from "../constants/redisPrefixes";

export const createConfirmationToken = async (userId: string, redis: any) => {
  const token = v4();
  await redis.set(confirmationPrefix + token, userId, "ex", 60 * 60 * 24); // 1 day expiration

  return token;
};
