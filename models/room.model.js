import mongoose from 'mongoose'
import autopopulate from "mongoose-autopopulate";

const { Schema, model, Types } = mongoose;

const roomTypeEnum = ['10', '8', '6', '4'];

const RoomSchema = Schema({
    roomNumber: {
        type: String,
        required: true,
        unique: true
    },
    roomType: {
        type: String,
        required: true,
        enum: roomTypeEnum,
    },
    residentCount: {
        type: Number,
        default: 0
    },
    residents: [{
        type: Types.ObjectId,
        ref: 'user',
        autopopulate: true
    }],
    roomStatus: {
        type: String,
        enum: ['occupied', 'unoccupied'],
        default: 'unoccupied'
    }
}, {
    timestamps: true
})

RoomSchema.plugin(autopopulate);
const Room = model('room', RoomSchema);
export default Room;
