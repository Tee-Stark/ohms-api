import asyncHandler from "../handlers/asyncHandler.js";
import { handleResponse } from "../handlers/responseHandler.js";
import roomService from "../services/room.service.js";

export const AddRoom = asyncHandler(async (req, res) => {
    const { roomNumber, roomType } = req.body
    const newRoom = await roomService.CreateRoom({ roomNumber, roomType });

    if(!newRoom) {
        console.error('Unable to create new room');
        return handleResponse(res, 500)
    }

    console.log('New room added to database');
    return handleResponse(res, 201, newRoom)
})

export const GetRoomById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const room = await roomService.GetRoom(id);

    if(!room) {
        console.error('Unable to get room')
        return handleResponse(res, 500);
    }

    console.log('Successfully returned room...');
    return handleResponse(res, 200, room);
})

export const GetAllRooms = asyncHandler(async (req, res) => {
    const rooms = await roomService.GetRooms();

    if(!rooms) {
        console.error('failed to return rooms')
        return handleResponse(res, 500);
    }
    
    console.log('Successfully returned all rooms')
    return handleResponse(res, 200, rooms);
})

export const GetHostelInventory = asyncHandler(async (req, res) => {
    const hostelInventory = await roomService.GetInventory();

    if(!hostelInventory) {
        console.error('failed to return hostel inventory')
        return handleResponse(res, 500);
    }

    console.log('Successfully returned hostel inventory')
    return handleResponse(res, 200, hostelInventory);
});
