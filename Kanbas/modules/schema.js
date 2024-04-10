import mongoose from "mongoose";


const lessonSchema = new mongoose.Schema({
    name: { type: String, required: true },
    indent: { type: Number, required: true },
    url: { type: String, default: "" },
    module: { type: String, required: true },
});

const moduleSchema = new mongoose.Schema({
    name: { type: String, required: true },
    course: { type: String, required: true },
    lessons: [ lessonSchema ],
},
{ collection: 'modules' });

export default moduleSchema;