import mongoose from "mongoose";


const itemsSchema = new mongoose.Schema({
    item_name: { type: String, required: true },
    module: { type: String, default: "" },
    points: { type: Number, required: true, default: 0 },
    due_date: { type: Date },
    due_time: { type: String }, 
    available_from_date: { type: Date },
    available_to_date: { type: Date },
    assignment_group_id: { type: String, required: true },
});

const assignmentSchema = new mongoose.Schema({
    course: { type: String, required: true },
    category: { type: String, required: true },
    total_grade_percentage: { type: Number, required: true, default: 0 },
    items: [ itemsSchema ],
},
{ collection: 'assignments' });

export default assignmentSchema;