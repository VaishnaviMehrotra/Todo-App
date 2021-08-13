const express = require("express");
const router = express.Router();
const User = require("../models/user");
const UserTodo = require("../models/userTodo");


router.post("/createUser", async function (req, res) {
    try {
        const addUser = new User(req.body);
        const newUser = await addUser.save();
        const addUserTodo = new UserTodo({ user_ID: newUser._id });
        const newUserTodo = await addUserTodo.save();
        res.status(201).send(newUserTodo);
    }
    catch (e) {
        console.log(e);
        res.status(500).send("This EmailID Is Already Exist.");
    }
})
router.delete("/deleteUser/:email", async (req, res) => {
    try {
        const userRecord = await User.findOne({ "email": req.params.email });
        console.log(userRecord._id);
        const deleteUserTodo = await UserTodo.deleteOne({ "user_ID": userRecord._id });
        const deleteUser = await User.deleteOne({ "email": req.params.email });
        console.log(deleteUser)
        res.status(201).send("User Is Deleted Successfully");
    }
    catch (e) {
        console.log(e)
        res.status(400).send("Internal Server Error Or Invalid Email");
    }
})

router.post("/createTask/:email", async function (req, res) {
    try {
        const userRecord = await User.findOne({ "email": req.params.email });
        const userTodoRecord = await UserTodo.findOne({ "user_ID": userRecord._id });
        let task = req.body;
        userTodoRecord.todo.push(task);
        const newUserTodo = await userTodoRecord.save();
        res.status(201).send("Task Created Successfully");
    }
    catch (e) {
        console.log(e);
        res.status(500).send("Internal Server Error Or Invalid Email");
    }
})

router.delete("/deleteTask/:email/:id", async (req, res) => {
    try {
        const user = await User.findOne({ "email": req.params.email });
        const userTodo = await UserTodo.findOne({ "user_ID": user._id });
        let index = userTodo.todo.findIndex(function (data) {
            return data.id === req.params.id;
        });
        // console.log(index);
        userTodo.todo.splice(index, 1);
        await userTodo.save();
        res.status(201).send("Task Deleted");
    }
    catch (e) {
        console.log(e)
        res.status(400).send("Internal Server Error Or Invalid Email");
    }
})
router.get("/getAllTask/:email", async (req, res) => {
    try {
        const user = await User.findOne({ "email": req.params.email });
        const userTodo = await UserTodo.findOne({ "user_ID": user._id });
        let arr = [];
        let todo = userTodo.todo;
        // console.log(todo)
        todo.forEach((ele) => {
            arr.push(ele.task);
        })
        res.status(201).send(arr);
    }
    catch (e) {
        console.log(e)
        res.status(400).send("Internal Server Error Or Invalid Email");
    }
})

router.get("/getParticularTask/:email/:id", async (req, res) => {
    try {
        const user = await User.findOne({ "email": req.params.email });
        const userTodo = await UserTodo.findOne({ "user_ID": user._id });
        let todo = userTodo.todo;
        todo.forEach((ele) => {
            if (req.params.id === ele.id) {
                let show = ele.task;
                res.send(show);
            }
        })
    }
    catch (e) {
        console.log(e)
        res.status(400).send("Internal Server Error Or Invalid Email");
    }
})

router.put("/editTask/:email/:id", async (req, res) => {
    try {
        const user = await User.findOne({ "email": req.params.email });
        var updatedTask = req.body.task;
        console.log(updatedTask);
        const query = { "user_ID": user._id, "todo.id": req.params.id };
            const updateDocument = {
              $set: { "todo.$.task": updatedTask}
            };
            const result = await UserTodo.updateOne(query, updateDocument);
            console.log(result);
            res.status(201).send("Task Updated");
    }
    catch (e) {
        console.log(e)
        res.status(400).send("Internal Server Error Or Invalid Email");
    }
})
module.exports = router;