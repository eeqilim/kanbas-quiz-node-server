import questionModel from "./model.js";

export const findQuestionsByQuizId = (quizId) =>
  questionModel.find({ quizId: quizId });

export const findQuestionById = (qsId) =>
  questionModel.findById(qsId);

export const createQuestion = (question) => {
  console.log("In DAO question: ", question);
  delete question._id;
  return questionModel.create(question);
};

export const deleteQuestion = (id) => questionModel.deleteOne({ _id: id });

export const updateQuestion = (questionId, updatedFields) => {
  return questionModel.updateOne({ _id: questionId }, { $set: updatedFields });
};

export const createAnswer = async (qsId, newAnswer) => {
  delete newAnswer._id;
  const question = await questionModel.findById(qsId); //qsId is _id
  question.possibleAnswers.push(newAnswer);
  await question.save();
  return question.possibleAnswers[question.possibleAnswers.length - 1].id; //_id or answerId depends on
};

export const deleteAnswer = (qsId, aId) => {
  return questionModel.updateOne(
    {
      _id: qsId,
    },
    {
      $pull: {
        possibleAnswers: {
          _id: aId,
        },
      },
    }
  );
};

export const updateAnswer = (qsId, aId, updatedFields) => {
  return questionModel.updateOne(
    {
      _id: qsId,
      "possibleAnswers._id": aId,
    },
    {
      $set: {
        "possibleAnswers.$": updatedFields,
      },
    }
  );
};
