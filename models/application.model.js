import mongoose from "mongoose";
import { APPLICATION_APPROVED_NOTE, APPLICATION_PENDING_NOTE, APPLICATION_REJECTED_NOTE, APPROVED_STATUS, PENDING_STATUS, REJECTED_STATUS } from "../config/constants.config.js";

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
    roomNumber: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ['male', 'female'],
        default: 'male',
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
        enum: [PENDING_STATUS, APPROVED_STATUS, REJECTED_STATUS],
        default: PENDING_STATUS,
    },
    note: {
        type: String,
        enum: [APPLICATION_APPROVED_NOTE, APPLICATION_PENDING_NOTE, APPLICATION_REJECTED_NOTE],
        default: APPLICATION_PENDING_NOTE,
    },
    slipGeneratable: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

const Application = model('application', ApplicationSchema);
export default Application;
