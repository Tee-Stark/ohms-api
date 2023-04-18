import mongoose from 'mongoose'
import bcrypt from "bcrypt";

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
    role: {
        type: String,
        enum: ['ADMIN', 'USER'],
        default: 'USER'
    }
}, {
    timestamps: true,
})

UserSchema.pre('save', function (next) {
    if (this.isModified('password')) {
        this.password = bcrypt.hashSync(this.password, 12);
    }
    next();
});

UserSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
}

const User = model('user', UserSchema);
export default User
