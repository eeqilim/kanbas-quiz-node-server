
import * as dao from "./dao.js";

function CourseRoutes(app) {

    // API for getting all courses
    app.get("/api/courses", async (req, res) => {
        const courses = await dao.findAllCourses();
        res.json(courses);
    });


    // Create new course
    app.post("/api/courses", async (req, res) => {
        const course = await dao.createCourse(req.body);
        res.json(course);
    });

    // Delete course
    app.delete("/api/courses/:id", async (req, res) => {
        const { id } = req.params;
        const status = await dao.deleteCourse(id);
        res.json(status);
    });

    // Update course
    app.put("/api/courses/:id", async (req, res) => {
        const { id } = req.params;
        const course = req.body;
        
        const status = await dao.updateCourse(id, course);
        res.json(status);
    });


    // Get a single course by id 
    app.get("/api/courses/:id", async (req, res) => {
        const { id } = req.params;
        const course = await dao.findCourseById(id);
        if (course) {
            res.json(course);
        } else {
            res.sendStatus(404).json({ message: "Course not found!" });
        }
    });
}

export default CourseRoutes;