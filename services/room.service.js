import { AppError } from '../error/AppError.js';
import Room from '../models/room.model.js';

const CreateRoom = async (room) => {
    try {
        const newRoom = await Room.create(room);
        return newRoom;
    } catch (error) {
        throw new AppError(error, 500)
    }
}

const GetRoom = async (roomId) => {
    try {
        const room = await Room.findById(roomId).lean();
        return room;
    } catch (error) {
        throw new AppError(error)
    }
}

const GetRooms = async () => {
    try {
        const rooms = await Room.find().lean();
        return rooms;
    } catch (error) {
        throw new AppError(error)
    }
}

const UpdateRoom = async (roomId, updates, options = {}) => {
    try {
        const session = options['session'] || undefined;1
        const updatedRoom = await Room.findByIdAndUpdate(roomId, updates, { session: session, new: true }).lean();
        return updatedRoom;
    } catch (error) {
        throw new AppError(error)
    }
}

// function to calculate total number of residents in all rooms, total rooms, and total rooms available
const GetInventory = async () => {
    try {
        const rooms = await Room.find().lean();
        let totalBedspaces = 0;
        let totalRooms = rooms.length;
        let totalRoomsAvailable = 0;
        let totalResidents = 0;
        rooms.forEach(room => {
            totalBedspaces += Number(room.roomType);
            totalResidents += room.residents ? room.residents.length : 0;
            if (room.roomStatus === 'unoccupied') {
                totalRoomsAvailable += 1;
            }
        });
        const totalBedspacesAvailable = totalBedspaces - totalResidents;

        return {
            totalBedspaces,
            totalRooms,
            totalRoomsAvailable,
            totalBedspacesAvailable
        };
    } catch (error) {
        throw new AppError(error)
    }
}

export default {
    CreateRoom,
    GetRoom,
    GetRooms,
    UpdateRoom,
    GetInventory
};
