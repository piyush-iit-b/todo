const User = require("./user");
const Task = require("./task");
const getUser = async (req, res, next) => {
    try {
        const user = await User.find();

        return res.status(200).json({
            user: user,
            message: "Here are all users!"
        });

    } catch (err) {
        return next(err);
    }
};
const signIn = async (req, res, next) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne(
            { name: username }
        );
        if (!user || user.password != password) {
            return res.status(404).json({ message: "User not found or worng password" });
        }
        return res.status(200).json({ user: user, message: "Login sucessfull!" });

    } catch (err) {
        return next(err);
    }
}
const signUp = async (req, res, next) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne(
            { name: username }
        );
        if (!user) {
            const newuser = new User({
                name: username,
                password: password
            });
            await newuser.save();
            return res.status(200).json({ user: newuser });
        }
        return res.status(404).json({ message: "User already exist pls signIn" });

    } catch (err) {
        return next(err);
    }
}

const getTask = async (req, res, next) => {
    try {
        const { username } = req.params;

        const task = await Task.find({ username: username });

        return res.status(200).json({ task: task });

    } catch (err) {
        return next(err);
    }
};

const addTask = async (req, res, next) => {
    const { name, description, username } = req.body;

    try {
        const newtask = new Task(
            {
                name: name,
                description: description,
                username: username
            },
        )
        await newtask.save()
        return res.status(200).json({ task: newtask });

    } catch (err) {
        return next(err);
    }
}

// const deleteTask = async (req, res, next) => {
    // const id = req.params.id;

    // try {
    //     await Task.findByIdAndDelete(id);
    //     return res.status(200).json({ message: "Task deleted successfully" });

    // } catch (err) {
    //     return next(err);
    // }
    
// }
const deleteTask = async (req, res, next) => {
    const id = req.params.id;
const task = await Task.findById(id);
    try {
        const updatedTask = await Task.findByIdAndUpdate(
            id,
            {
                username: "deleted by "+task.username
            },
            {
                returnDocument: "after"
            }
        );

        if (!updatedTask) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        return res.status(200).json({
            task: updatedTask,
            message: "Task removed successfully"
        });

    } catch (err) {
        return next(err);
    }
};
const updateTask = async (req, res, next) => {
    const id = req.params.id;
    const { name, description } = req.body;

    try {
        const updatedTask = await Task.findByIdAndUpdate(
            id,
            {
                name: name,
                description: description
            },
           { returnDocument: "after" }
        );

        if (!updatedTask) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        return res.status(200).json({
            task: updatedTask,
            message: "Task updated successfully"
        });

    } catch (err) {
        return next(err);
    }
};
exports.signIn = signIn;
exports.signUp = signUp;
exports.getUser = getUser;
exports.getTask = getTask;
exports.addTask = addTask;
exports.deleteTask = deleteTask;
exports.updateTask = updateTask;
