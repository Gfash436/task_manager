const dotenv = require("dotenv");

const express = require("express");
const connectDb = require("./db/db");
const userRouter = require("./routes/user.routes");
const taskRouter = require("./routes/task.routes");
dotenv.config();

const app = express();


const port = process.env.PORT || 3000;

connectDb();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
    return res.status(200).json({ message: "Home page" });
});

app.use("/api/users", userRouter);
app.use("/api/tasks", taskRouter);

// 404
app.use((req, res) => {
    res.status(404).json({ message: "Resource not found" });
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Something broke!" });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}
);