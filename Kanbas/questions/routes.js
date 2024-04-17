import * as dao from "./dao.js";

export default function QuestionRoutes(app) {
  // Get all questions for a quiz, tested
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
    const updatedFields = req.body;// e.g. body={"points": 10,"possibleAnswers": ["Beijing", "Shanghai", "Hangzhou"]} can update all possible answers directly
    const status = await dao.updateQuestion(qsId, updatedFields);
    res.json(status);
  });

  // //create answer for a question
  // app.post("/api/questions/:qsId/answers", async (req, res) => {
  //   const { qsId } = req.params;
  //   const newAnswer = req.body;
  //   try {
  //     const updatedQuestion = await dao.createSpecificAnswer(qsId, newAnswer);
  //     res
  //       .status(201)
  //       .json({ message: "Answer added successfully", updatedQuestion });
  //   } catch (error) {
  //     console.error("Error creating new answer:", error);
  //     res
  //       .status(500)
  //       .json({ message: "Failed to create new answer", error: error.message });
  //   }
  // });

  // //delete answer for a question
  // app.delete("/api/questions/:qsId/answers/delete", async (req, res) => {
  //   const { qsId } = req.params;
  //   const { answerToDelete } = req.body;
  //   try {
  //     const result = await dao.deleteSpecificPossibleAnswer(
  //       qsId,
  //       answerToDelete
  //     );
  //     if (result.modifiedCount === 0) {
  //       res.status(404).json({ message: "No answer found or nothing changed" });
  //     } else {
  //       res.json({ message: "Answer deleted successfully" });
  //     }
  //   } catch (error) {
  //     console.error("Error deleting answer:", error);
  //     res
  //       .status(500)
  //       .json({ message: "Failed to delete answer", error: error.message });
  //   }
  // });

  // //update answer for a question
  // app.put("/api/questions/:qsId/answers/update", async (req, res) => {
  //   const { qsId } = req.params;
  //   const { index, newAnswer } = req.body;
  //   try {
  //     const result = await dao.updateSpecificPossibleAnswerByIndex(
  //       qsId,
  //       index,
  //       newAnswer
  //     );
  //     if (result.modifiedCount === 0) {
  //       res.status(404).json({ message: "No answer found or nothing changed" });
  //     } else {
  //       res.json({ message: "Answer updated successfully" });
  //     }
  //   } catch (error) {
  //     console.error("Error updating answer:", error);
  //     res
  //       .status(500)
  //       .json({ message: "Failed to update answer", error: error.message });
  //   }
  // });
}
