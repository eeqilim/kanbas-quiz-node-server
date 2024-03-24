import Database from "../Database/index.js";

function CourseRoutes(app) {

    // API for getting all courses
    app.get("/api/courses", (req, res) => {
        const courses = Database.courses;
        res.json(courses);
    });


    // Create new course
    app.post("/api/courses", (req, res) => {
        const course = { ...req.body, _id: new Date().getTime().toString() };
        Database.courses.push(course);
        res.send(course);
    });

    // Delete course
    app.delete("/api/courses/:id", (req, res) => {
        const { id } = req.params;
        Database.courses = Database.courses.filter((c) => c._id !== id);
        res.sendStatus(204);
    });

    // Update course
    app.put("/api/courses/:id", (req, res) => {
        const { id } = req.params;
        const course = req.body;
        Database.courses = Database.courses.map((c) => c._id == id ? { ...c, ...course } : c);
        res.sendStatus(204);
    });


    // Get a single course by id 
    app.get("/api/courses/:id", (req, res) => {
        const { id } = req.params;
        const course = Database.courses.find((c) => c._id === id);
        if (!course) {
            res.status(404).send("Course not found");
            return;
        }
        res.send(course);
    });
}

export default CourseRoutes;