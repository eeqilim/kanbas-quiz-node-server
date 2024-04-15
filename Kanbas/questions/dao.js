import questionModel from "./model.js";

export const findQuestionsByQuizId = (quizId) => questionModel.find({ quizId: quizId });

export const findQuestionById = (questionId) => questionModel.findById(questionId);

export const createQuestion = (question) => {
    console.log("In DAO question: ", question);
    delete question._id;
    return questionModel.create(question);
};

export const deleteQuestion = (questionId) => questionModel.deleteOne( { _id: questionId });

export const updateQuestion = (questionId, updatedFields) => {
    return questionModel.updateOne({ _id: questionId }, { $set: updatedFields });
};
