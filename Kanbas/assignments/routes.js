import db from "../Database/index.js";

function AssignmentRoutes(app) {

    //Get all assignments for a course
    app.get("/api/courses/:cid/assignments", (req, res) => {
        const { cid } = req.params; 
        const courses = db.assignments.filter((a) => a.course === cid);
        res.json(courses);
    });


    // Add a new assignment group for a course 
    app.post("/api/courses/:cid/assignments", (req, res) => {
        const { cid } = req.params;
        const newAssignmentGroup = { ...req.body, course: cid, _id: "A" + new Date().getTime().toString() };
        db.assignments.push(newAssignmentGroup);
        res.send(newAssignmentGroup);
    });



    //Testing purpose ONLY
    // Get a single assignment group by id
    app.get("/api/assignments/:aid", (req, res) => {
        const { aid } = req.params;
        const assignment = db.assignments.find((a) => a._id === aid);
        if (!assignment) {
            res.status(404).send("Assignment not found");
            return;
        }
        res.send(assignment);
    });


    //Delete an assignment group
    app.delete("/api/assignments/:aid", (req, res) => {
        const { aid } = req.params;
        db.assignments = db.assignments.filter((a) => a._id !== aid);
        res.sendStatus(200);
    });

    //Update an assignment group
    app.put("/api/assignments/:aid", (req, res) => {
        const { aid } = req.params;
        const assignmentIndex = db.assignments.findIndex((a) => a._id === aid);
        db.assignments[assignmentIndex] = { ...db.assignments[assignmentIndex], ...req.body };
        res.sendStatus(204);
    });

    // Add a item to a assignment group 
    app.post("/api/assignments/:aid/assignment", (req, res) => {
        const { aid } = req.params;
        console.log(aid);
        const assignment = db.assignments.find((a) => a._id === aid);
        if (!assignment) {
            console.log('not Found ')
            res.status(404).json({message: `Unable to find assignment with id ${aid}`});
            return;
        }
        const newItem = { ...req.body, item_id: aid + "." + new Date().getTime().toString()};
        assignment.items.push(newItem);
        res.send(newItem);
    });


    // Delete a item from a assignment group
    app.delete("/api/assignments/:aid/assignment/:iid", (req, res) => {
        const { aid, iid } = req.params;
        const assignment = db.assignments.find((a) => a._id === aid);
        if (!assignment) {
            res.status(404).json({message: `Unable to find assignment with id ${aid}`});
            return;
        }
        assignment.items = assignment.items.filter((l) => l.item_id !== iid);
        res.sendStatus(200);
    });


    // Edit a item from a assignment group
    app.put(`/api/assignments/:aid/assignment/:iid`, (req, res) => {
        console.log("UPDATE API CALLED")
        const { aid, iid } = req.params;
        const assignmentIndex = db.assignments.findIndex((a) => a._id === aid);
        if (assignmentIndex === -1) {
            res.status(404).json({message: `Unable to find assignment with id ${aid}`});
            return;
        }
        const itemIndex = db.assignments[assignmentIndex].items.findIndex((l) => l.item_id === iid);
        if (itemIndex === -1) {
            res.status(404).json({message: `Unable to find item with id ${iid}`});
            return;
        }
        console.log(db.assignments[assignmentIndex].items[itemIndex]);
        console.log(req.body);
        db.assignments[assignmentIndex].items[itemIndex] = { ...db.assignments[assignmentIndex].items[itemIndex], ...req.body };
        res.sendStatus(204);

        console.log("UPDATE API FINISHED")
    });


}


export default AssignmentRoutes;