import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
    number: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    startDate: Date,
    endDate: Date,
    term: String, 
    image: { type: String, default: ""},
},
{ collection: 'courses' });

export default courseSchema;
