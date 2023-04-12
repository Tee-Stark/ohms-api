import mongoose from "mongoose";

const { Schema, Types, model } = mongoose;

const ApplicationSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    othername: {
        type: String,
        required: false
    },
    faculty: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    level: {
        type: Number,
        required: true
    },
    cgpa: {
        type: Number,
    },
    gender: {
        type: String,
        enum: ['male', 'female'],
    },
    hostel: {
        type: String,
        required: true
    },
    hostelPaySlipUrl: {
        type: String
    },
    letterUrl: {
        type: String
    },
    wapicUrl: {
        type: String
    },
    lagmobileUrl: {
        type: String
    },
    status: {
        type: String,
        enum: ['PENDING', 'ACCEPTED', 'REJECTED'],
        default: 'PENDING',
    }
}, {
    timestamps: true
});

export default applicationModel = model('application', ApplicationSchema);
