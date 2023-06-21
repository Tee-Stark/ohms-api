import mongoose from 'mongoose'
import bcrypt from "bcrypt";
import Room from './room.model.js';

const { Schema, model, Types } = mongoose;

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    applications: [{
        type: Types.ObjectId,
        ref: 'application'
    }],
    room: {
        type: Types.ObjectId,
        ref: 'room'
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    }
}, {
    timestamps: true,
})

UserSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = bcrypt.hashSync(this.password, 12);
    }

    if (!this.room) {
        const unoccupiedRooms = await Room.find({ residentCount: { $lt: Number(this.roomType) } });
        if (unoccupiedRooms.length > 0) {
            const randomIndex = Math.floor(Math.random() * unoccupiedRooms.length);
            this.room = unoccupiedRooms[randomIndex]._id;
            // await Room.findByIdAndUpdate(this.room, { $inc: { residentCount: 1 } });
        }
    }
    next();
});

UserSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
}

const User = model('user', UserSchema);
export default User
