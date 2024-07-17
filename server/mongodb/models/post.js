import mongoose, { Schema } from "mongoose";

const generateSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    prompt: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true
    }
})

const Generate = mongoose.models.Generate || mongoose.model('generates', generateSchema);
export default Generate;