import mongoose from "mongoose";


const quizSchema = new mongoose.Schema({
    course: { type: String, required: true },
    item_name: { type: String, required: true, default: "Unnamed Quiz" },
    question_count: {type: Number, required: true, default: 0},
    published: { type: Boolean, required: true, default: false },
    quiz_type: { type: String, required: true, enum: ['Graded Quiz', 'Practice Quiz', 'Graded Survey', 'Ungraded Survey'], default: "Graded Quiz" },
    points: { type: Number, required: true, default: 0 },
    group: { type: String, required: true,enum: ['QUIZZES', 'EXAMS', 'ASSIGNMENTS', 'PROJECTS'], default: "QUIZZES" },
    shuffle: { type: Boolean, required: true, default: true },
    time_limit: { type: Number, required: true, default: 20 },
    multiple_attempts: { type: Boolean, required: true, default: false },
    instructions: { type: String},
    reponses: { type: String, required: true, default: "Always"},
    show_ans: { type: Boolean, required: true, default: false },
    one_question_at_a_time: { type: Boolean, required: true, default: true },
    lockdown_browser: { type: Boolean, required: true, default: false },
    webcam_required: { type: Boolean, required: true, default: false },
    lock_questions_after_answering: { type: Boolean, required: true, default: false },
    access_code: { type: String, default: "" },
    due_date: { type: Date },
    assign_to: { type: String, required: true, default: "Everyone" },
    available_from_date: { type: Date },
    available_to_date: { type: Date },
},
{ collection: 'quizzes' }
);

export default quizSchema;