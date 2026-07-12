const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const connectDB = require("./config/db");

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

const allowedOrigins = [
    "http://localhost:5173",
    "https://full-stack-task-management-system-b3pqf63r9-zaid-techy1.vercel.app",
];

app.use(
    cors({
        origin: function (origin, callback) {

            // allow requests with no origin (Postman, mobile apps)
            if (!origin) return callback(null, true);

            if (allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
        credentials: true,
    })
);


// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/tasks", require("./routes/taskRoutes"));
app.use("/api/team", require("./routes/teamRoutes"));


app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Task Management API Running"
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
