import mongoose from 'mongoose'

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
    applications: {
        type: Types.ObjectId,
        ref: 'application'
    }
})

export default userModel = model('user', UserSchema);

