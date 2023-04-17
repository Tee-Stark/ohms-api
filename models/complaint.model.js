import mongoose from "mongoose";

const { Schema, Types, model } = mongoose
const complaintSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    // application: {
    //     type: Types.ObjectId,
    //     ref: 'application'
    // }
}, {
    timestamps: true
})

const complaintModel = model('complaint', complaintSchema);

export default complaintModel;
