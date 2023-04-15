import jwt from "jsonwebtoken"
import { JWT_EXP, JWT_SECRET } from "../config/constants.config.js";

export const generateAccessToken = (id, role = '') => {
    return jwt.sign({ id, role }, JWT_SECRET, { expiresIn: JWT_EXP });
};

export const decodeAccessToken = (token) => {
    return jwt.verify(token, JWT_SECRET);
};

// export const storeTokenInRedis = async (token, email) => {
//     return await RedisClient.set(token, email);
//   };
  
//   export const getTokenFromRedis = async (token) => {
//     return await RedisClient.get(token);
//   };
  
//   export const deleteTokenInRedis = async (token) => {
//     return await RedisClient.del(token);
//   };
  