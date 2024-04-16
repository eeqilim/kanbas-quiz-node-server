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
    app.post("/api/quizzes", async (req, res) => {
        const newQuiz = req.body;
        const quiz = await dao.createQuiz(newQuiz);
        res.json(quiz);
    });
}