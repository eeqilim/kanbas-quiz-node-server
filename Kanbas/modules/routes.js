import db from "../Database/index.js";

function ModuleRoutes(app) {

    // API for getting moduels by courseId
    app.get("/api/courses/:cid/modules", (req, res) => {
        const { cid } = req.params;
        const modules = db.modules.filter((m) => m.course === cid);
        res.send(modules);
    });


    // Creating module for a course
    app.post("/api/courses/:cid/modules", (req, res) => {  
        const { cid } = req.params;
        const newModule = { ...req.body, course: cid, _id: "M" + new Date().getTime().toString() };
        db.modules.push(newModule);
        res.send(newModule);
    });
    // Deleting a module
    app.delete("/api/modules/:mid", (req, res) => {
        const { mid } = req.params;
        db.modules = db.modules.filter((m) => m._id !== mid);
        res.sendStatus(200);
    });
    //Update Module
    app.put("/api/modules/:mid", (req, res) => {
        const { mid } = req.params;
        const moduleIndex = db.modules.findIndex((m) => m._id === mid);
        db.modules[moduleIndex] = { ...db.modules[moduleIndex], ...req.body };
        res.sendStatus(204);
    })




    // Creating lesson for a module
    app.post("/api/modules/:mid/lessons", (req, res) => {
        const { mid } = req.params;
        const module = db.modules.find((m) => m._id === mid);
        if (!module) {
            res.status(404).json({message: `Unable to find module with id ${mid}`});
            return;
        }
        const newLesson = { ...req.body, _id: "L" + new Date().getTime().toString(), module: mid};
        module.lessons.push(newLesson);
        res.send(newLesson);
    });
    // Deleting a lesson
    app.delete("/api/modules/:mid/lessons/:lid", (req, res) => {
        const { mid, lid } = req.params;
        const module = db.modules.find((m) => m._id === mid);
        if (!module) {
            res.status(404).json({message: `Unable to find module with id ${mid}`});
            return;
        }
        module.lessons = module.lessons.filter((l) => l._id !== lid);
        res.sendStatus(200);
        
    });
    // Update Lesson
    app.put("/api/modules/:mid/lessons/:lid", (req, res) => {
        const { mid, lid } = req.params;
        const moduleIndex = db.modules.findIndex((m) => m._id === mid);
        const lessonIndex = db.modules[moduleIndex].lessons.findIndex((l) => l._id === lid);
        db.modules[moduleIndex].lessons[lessonIndex] = { ...db.modules[moduleIndex].lessons[lessonIndex], ...req.body };
        res.sendStatus(204);
    });



}


export default ModuleRoutes;