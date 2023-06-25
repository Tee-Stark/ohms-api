import express from 'express';
import { requireAdmin, requireAuth } from '../middlewares/auth.middleware.js';
import { AddRoom, GetAllRooms, GetHostelInventory, GetRoomById } from '../controllers/room.controller.js';

const roomRouter = express.Router();

roomRouter.post('/', [requireAuth, requireAdmin], AddRoom);
roomRouter.get('/', [requireAuth, requireAdmin], GetAllRooms);
roomRouter.get('/inventory', [requireAuth, requireAdmin], GetHostelInventory);
roomRouter.get('/:id', [requireAuth, requireAdmin], GetRoomById);    

export default roomRouter;

