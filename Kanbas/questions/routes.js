import * as dao from "./dao.js";

export default function QuestionRoutes(app) {
  // Get all questions for a quiz, tested, quizId is quizId instead of _id
  app.get("/api/quizzes/:quizId/questions", async (req, res) => {
    const { quizId } = req.params;
    const questions = await dao.findQuestionsByQuizId(quizId);
    res.json(questions);
  });

  // Get a question by id, tested
  app.get("/api/questions/:qsId", async (req, res) => {
    const { qsId } = req.params;
    const question = await dao.findQuestionById(qsId);
    res.json(question);
  });

  // Create a question，tested
  app.post("/api/quizzes/:qzId/questions", async (req, res) => {
    const { qzId } = req.params;
    const newQuestion = { ...req.body, quizId: qzId };
    const question = await dao.createQuestion(newQuestion);
    res.json(question);
  });

  // Delete a question, tested
  app.delete("/api/questions/:qsId", async (req, res) => {
    const { qsId } = req.params;
    const status = await dao.deleteQuestion(qsId);
    res.json(status);
  });

  // Update a question, tested
  app.put("/api/questions/:qsId", async (req, res) => {
    const { qsId } = req.params;
    const updatedFields = req.body;
    const status = await dao.updateQuestion(qsId, updatedFields);
    res.json(status);
  });

  //create answer for a question, tested
  app.post("/api/questions/:qsId/answers", async (req, res) => {
    const { qsId } = req.params;
    const newAnswer = req.body;
    const aId = await dao.createAnswer(qsId, newAnswer);//newAnswer needs answerId, text, questionId.
    newAnswer._id = aId;
    res.send(newAnswer); 
  });

  //delete answer for a question, tested
  app.delete("/api/questions/:qsId/answers/:aId", async (req, res) => {
    const { qsId, aId } = req.params;
    const status = await dao.deleteAnswer(qsId, aId);
    res.json(status);
  });

  //update answer for a question, tested
  app.put("/api/questions/:qsId/answers/:aId", async (req, res) => {
    const { qsId, aId } = req.params;
    const updatedFields = req.body;
    const status = await dao.updateAnswer(qsId, aId, updatedFields);
    res.json(status);
  });
}
