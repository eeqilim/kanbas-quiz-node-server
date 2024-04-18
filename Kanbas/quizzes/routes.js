import * as dao from "./dao.js";

export default function QuizRoutes(app) {
  // Get a single Quiz by _id
  app.get("/api/quizzes/:quizId", async (req, res) => {
    const { quizId } = req.params;
    const quiz = await dao.findQuizById(quizId);
    res.json(quiz);
  });

  // Get all Quizzes for a course by course's _id
  app.get("/api/courses/:courseId/quizzes", async (req, res) => {
    const { courseId } = req.params;
    const quizzes = await dao.findQuizzesByCourseId(courseId);
    res.json(quizzes);
  });

  // Add a new Quiz
  app.post("/api/quizzes/:courseId", async (req, res) => {
    const courseId = req.params.courseId;
    const newQuiz = { ...req.body, course: courseId }

    const quiz = await dao.createQuiz(newQuiz);

    console.log("newQUiz returned in routes.js quiz", quiz);
    res.json(quiz);
  });

  //Delete a quiz by quizId
  app.delete("/api/quizzes/:quizId", async (req, res) => {
    const { quizId } = req.params;
    const status = await dao.deleteQuizById(quizId);
    res.json(status);
  });

  //Update a quiz by quizId
  app.put("/api/quizzes/:quizId", async (req, res) => {
    const { quizId } = req.params;
    const updatedFields = req.body;
    console.log("updatedFields", updatedFields);
    const status = await dao.updateQuizById(quizId, updatedFields);
    res.json(status);
  });


  // Toggle the published status of a quiz
  app.put("/api/quizzes/:quizId/publish", async (req, res) => {
    const { quizId } = req.params;
    const status = await dao.togglePublishQuiz(quizId);
    res.json(status);
  });

  
}
