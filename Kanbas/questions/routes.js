import * as dao from "./dao.js";

export default function QuestionRoutes(app){
    // Get all questions for a quiz, pass test
    app.get("/api/quizzes/:quizId/questions", async (req, res) => {
        const { quizId } = req.params;
        const questions = await dao.findQuestionsByQuizId(quizId);
        res.json(questions);
    });

    // Get a question by id, pass test
    app.get("/api/questions/:questionId", async (req, res) => {
        const { quizId, questionId } = req.params;
        const question = await dao.findQuestionById(questionId);
        res.json(question);
    });

    // Create a question
    app.post("/api/questions", async (req, res) => {
        const newQuestion = req.body;
        const question = await dao.createQuestion(newQuestion);
        res.json(question);
    });

    // Delete a question
    app.delete("/api/questions/:questionId", async (req, res) => {
        const { questionId } = req.params;
        const status = await dao.deleteQuestion(questionId);
        res.json(status);
    });

    // Update a question
    app.put("/api/questions/:questionId", async (req, res) => {
        const { questionId } = req.params;
        const updatedFields = req.body;
        const status = await dao.updateQuestion(questionId, updatedFields);
        res.json(status);
    });
};