
import * as dao from "./dao.js";

function ModuleRoutes(app) {

    // API for getting moduels by courseId
    app.get("/api/courses/:cid/modules", async (req, res) => {
        const { cid } = req.params;
        const modules = await dao.findModulesByCourseId(cid);
        res.json(modules);
    });


    // Creating module for a course
    app.post("/api/courses/:cid/modules", async (req, res) => {  
        const { cid } = req.params;
        const newModule = { ...req.body, course: cid };
        const module = await dao.createModule(newModule)
        res.json(module);
    });


    // Deleting a module
    app.delete("/api/modules/:mid", async (req, res) => {
        const { mid } = req.params;
        const status = await dao.deleteModule(mid);
        res.json(status);
    });


    //Update Module
    app.put("/api/modules/:mid", async (req, res) => {
        const { mid } = req.params;
        const updatedFields = req.body;
        const status = await dao.updateModule(mid, updatedFields);
        res.json(status);
    });




    // Creating lesson for a module
    app.post("/api/modules/:mid/lessons", async (req, res) => {
        const { mid } = req.params;
        const newLesson = req.body;
        newLesson.module = mid;
        const lessonId = await dao.createLesson(mid, newLesson);
        newLesson._id = lessonId;
        res.send(newLesson);
    });


    // Deleting a lesson
    app.delete("/api/modules/:mid/lessons/:lid", async (req, res) => {
        const { mid, lid } = req.params;
        const status = await dao.deleteLesson(mid, lid);
        res.json(status);
    });


    // Update Lesson
    app.put("/api/modules/:mid/lessons/:lid", async (req, res) => {
        const { mid, lid } = req.params;
        const updatedFields = req.body;
        console.log("Routes req.body: (Should be updatedFields): ", req.body)
        const status = await dao.updateLesson(mid, lid, updatedFields);

        res.json(status);
    });



}


export default ModuleRoutes;