import mongoose from 'mongoose';

// Schema for Possible Answers
const answerSchema = new mongoose.Schema({
    answerId: { type: String, required: true },
    text: { type: String, required: true },
    questionId: { type: String, required: true }
});  // Disable _id for subdocuments if not needed

// Schema for Questions
const questionSchema = new mongoose.Schema({
        questionId: { type: String, required: true, unique: true },
        title: { type: String },
        points: { type: Number },
        questionText: { type: String },
        possibleAnswers: {
            type: [answerSchema],
            default: undefined  // Make it optional and omit if not provided
        },
        correctAnswer: { type: String },
        questionType: {
            type: String,
            required: true,
            enum: ['M', 'T', 'B']  // 'M' for Multiple Choice, 'T' for True/False, 'B' for Fill in the Blank
        },
        quizId: { type: String, required: true }
    },
    { collection: 'questions' }
);

export default questionSchema;  // Export the schema for use in other files