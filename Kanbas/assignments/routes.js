import db from "../Database/index.js";

import * as dao from "./dao.js";

function AssignmentRoutes(app) {

    //Get all assignments for a course
    app.get("/api/courses/:cid/assignments", async (req, res) => {
        const { cid } = req.params; 
        const courses = await dao.findAssignmentsByCourseId(cid);
        res.json(courses);
    });


    // Add a new assignment group for a course 
    app.post("/api/courses/:cid/assignments",async (req, res) => {
        const { cid } = req.params;
        const newAssignmentGroup = { ...req.body, course: cid };
        const resultAssignmentGroup = await dao.createAssignment(newAssignmentGroup);
        res.json(resultAssignmentGroup);
    });



    //Testing purpose ONLY
    // Get a single assignment group by id
    app.get("/api/assignments/:aid", async (req, res) => {
        const { aid } = req.params;
        const assignment = await dao.getAssignmentById(aid);
        res.json(assignment);
    });


    //Delete an assignment group
    app.delete("/api/assignments/:aid", async (req, res) => {
        const { aid } = req.params;
        const status = await dao.deleteAssignment(aid);
        res.json(status);
    });

    //Update an assignment group
    app.put("/api/assignments/:aid", async (req, res) => {
        const { aid } = req.params;
        const updatedFields = req.body;
        const status = await dao.updateAssignment(aid, updatedFields);
        res.json(status);
    });

    // Add a item to a assignment group 
    app.post("/api/assignments/:aid/assignment", async (req, res) => {
        const { aid } = req.params;
        const newItem = req.body;
        newItem.assignment_group_id = aid;
        const itemId = await dao.createItem(aid, newItem);
        newItem._id = itemId;
        res.send(newItem);
    });


    // Delete a item from a assignment group
    app.delete("/api/assignments/:aid/assignment/:iid", async (req, res) => {
        const { aid, iid } = req.params;
        const status = await dao.deleteItem(aid, iid);
        res.json(status);
    });


    // Edit a item from a assignment group
    app.put(`/api/assignments/:aid/assignment/:iid`, async (req, res) => {
        const { aid, iid } = req.params;
        const updatedFields = req.body;
        const status = await dao.updateItem(aid, iid, updatedFields);
        res.json(status);
    });


}


export default AssignmentRoutes;