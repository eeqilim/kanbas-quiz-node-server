import questionModel from "./model.js";

export const findQuestionsByQuizId = (quizId) =>
  questionModel.find({  quizId: quizId });

export const findQuestionById = (qsId) =>
  questionModel.findById(qsId);

export const createQuestion = (question) => {
  console.log("In DAO question: ", question);
  delete question._id;
  return questionModel.create(question);
};

export const deleteQuestion = (id) => questionModel.deleteOne({ _id: id });

export const updateQuestion = (qsId, updatedFields) => {
  return questionModel.updateOne({ _id: qsId }, { $set: updatedFields });
};

// export const createSpecificAnswer = async (qsId, newAnswer) => {
//   delete newAnswer._id;
//   const question = await questionModel.findById(qsId); //qsId is _id
//   question.possibleAnswers.push(newAnswer);
//   await question.save();
//   return question.possibleAnswers[question.possibleAnswers.length - 1];
// };

// export const deleteSpecificPossibleAnswer = async (qsId, answerToRemove) => {
//     try {
//         const result = await questionModel.updateOne(
//             { _id: qsId },
//             { $pull: { possibleAnswers: answerToRemove } } // Remove the specific answer
//         );
//         return result;
//     } catch (error) {
//         console.error("Failed to remove specific possible answer:", error);
//         return null;
//     }
// };

// // Update a specific possible answer by index
// export const updateSpecificPossibleAnswerByIndex = async (qsId, answerIndex, newAnswer) => {
//     try {
//         const update = { $set: { [`possibleAnswers.${answerIndex}`]: newAnswer } };
//         const result = await questionModel.updateOne({ _id: qsId }, update);
//         return result;
//     } catch (error) {
//         console.error("Failed to update specific possible answer:", error);
//         return null;
//     }
// };
