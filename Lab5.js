const Lab5 = (app) => {
    
    app.get('/a5/welcome', (req, res) => {
        res.send('Welcome to Assignment 5');
    });

    app.get("/a5/add/:a/:b", (req, res) => {
        const { a, b } = req.params;
        const sum = parseInt(a) + parseInt(b);
        res.send(sum.toString());
    });

    app.get("/a5/substract/:a/:b", (req, res) => {
        const { a, b } = req.params;   
        const substract = parseInt(a) - parseInt(b);
        res.send(substract.toString());
    });
    
    app.get("/a5/multiply/:a/:b", (req, res) => {
        const { a, b } = req.params;
        const multiply = parseInt(a) * parseInt(b);
        res.send(multiply.toString());
    });

    app.get("/a5/divide/:a/:b", (req, res) => {
        const { a, b } = req.params;
        const divide = parseInt(a) / parseInt(b);
        res.send(divide.toString());
    });

    app.get("/a5/calculator", (req, res) => {
        const { a, b, operation } = req.query;
        let result = 0;
        switch (operation) {
            case "add":
                result = parseInt(a) + parseInt(b);
                break;
            case "subtract":
                result = parseInt(a) - parseInt(b);
                break;
            case "multiply":
                result = parseInt(a) * parseInt(b);
                break;
            case "divide":
                result = parseInt(a) / parseInt(b);
                break;
            default:
                result = "Invalid operation";
        }
        res.send(result.toString());
    });



    const assignment = {
        id: 1, title: "NodeJS Assignment",
        description: "Create a NodeJS server with ExpressJS",
        due: "2021-10-10", completed: false, score: 0,
    };
    app.get("/a5/assignment", (req, res) => {
        res.json(assignment);
    });

    app.get("/a5/assignment/title", (req, res) => {
        res.json(assignment.title);
    });
    app.get("/a5/assignment/description", (req, res) => {
        res.json(assignment.description);
    });

    app.get("/a5/assignment/title/:newTitle", (req, res) => {
        const {newTitle} = req.params;
        assignment.title = newTitle;
        res.json(assignment);
    });
    app.get("/a5/assignment/score/:newScore", (req, res) => {
        const {newScore} = req.params;
        assignment.score = parseInt(newScore);
        res.json(assignment);
    });
    app.get("/a5/assignment/completed/:newCompleted", (req, res) => {
        const {newCompleted} = req.params;
        assignment.completed = newCompleted === "true";
        res.json(assignment);
    });
    



    const module = {
        id: "1", name: "module1", description: "NodeJS", course: "CS5610",
    }
    app.get("/a5/module", (req, res) => {
        res.json(module);
    });
    app.get("/a5/module/name", (req, res) => {
        res.json(module.name);
    });
    app.get("/a5/module/name/:newName", (req, res) => {
        const { newName } = req.params;
        module.name = newName;
        res.json(module);
    })
    app.get("/a5/module/description/:newDescription", (req, res) => {
        const { newDescription } = req.params;
        module.description = newDescription;
        res.json(module);
    })




    // Array Related 
    const todos = [
        { id: 1, title: "Task 1", completed: false },
        { id: 2, title: "Task 2", completed: true },
        { id: 3, title: "Task 3", completed: false },
        { id: 4, title: "Task 4", completed: true },
    ];
    app.get("/a5/todos", (req, res) => {
        const { completed } = req.query;
        if (completed !== undefined) {
            const completedBool = completed === "true";
            const completedTodos = todos.filter(
                (t) => t.completed === completedBool
            );
            res.json(completedTodos);
            return;
        }

        res.json(todos);
    });

    app.get("/a5/todos/:id", (req, res) => {
        const { id } = req.params;
        const todo = todos.find((t) => t.id === parseInt(id));
        res.json(todo);
    });






};

export default Lab5;