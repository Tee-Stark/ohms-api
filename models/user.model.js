import mongoose from 'mongoose'
import bcrypt from "bcrypt";
import Room from './room.model.js';
import autopopulate from "mongoose-autopopulate";

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
        ref: 'application',
        autopopulate: true
    }],
    room: {
        type: Types.ObjectId,
        ref: 'room',
        autopopulate: true
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    }
}, {
    timestamps: true,
})

UserSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
}

UserSchema.plugin(autopopulate);

UserSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = bcrypt.hashSync(this.password, 12);
    }

    if (!this.room && this.role !== 'admin') {
        const unoccupiedRooms = await Room.find({ roomStatus: 'unoccupied' });
        if (unoccupiedRooms.length > 0) {
            const randomIndex = Math.floor(Math.random() * unoccupiedRooms.length);
            this.room = unoccupiedRooms[randomIndex]._id;
            // await Room.findByIdAndUpdate(this.room, { $inc: { residentCount: 1 } });
        } else {
            console.error('All rooms are occupied')
            throw new Error('No unoccupied rooms');
        }
    }
    next();
});

UserSchema.pre('find', function() {
    if (this.room) {
        this.populate('room');
        next();
    }
});

const User = model('user', UserSchema);
export default User
