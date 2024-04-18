import mongoose from 'mongoose';

// Schema for Questions
const questionSchema = new mongoose.Schema({
        title: { type: String },
        points: { type: Number },
        questionText: { type: String },
        possibleAnswers: {
            type: [String],
            default: undefined  // Make it optional and omit if not provided
        },
        correctAnswer: { type: String },
        questionType: {
            type: String,
            required: true,
            enum: ['M', 'T', 'B']  // 'M' for Multiple Choice, 'T' for True/False, 'B' for Fill in the Blank
        },
        quizId: { type: String, required: true },
        previewAnswer: { type: String }
    },
    { collection: 'questions' }
);

export default questionSchema;  // Export the schema for use in other files