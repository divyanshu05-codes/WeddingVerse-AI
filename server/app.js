const express = require("express");
const errorHandler = require("./src/middlewares/error.middleware");
const authRoutes = require("./src/routes/auth.routes");
const weddingRoutes = require("./src/routes/wedding.routes");
const userRoutes = require("./src/routes/user.routes");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const guestRoutes = require("./src/routes/guest.routes");
const budgetRoutes = require("./src/routes/budget.routes");
const vendorRoutes = require("./src/routes/vendor.routes");
const dashboardRoutes = require("./src/routes/dashboard.routes");
const aiRoutes = require("./src/routes/ai.routes");
const taskRoutes = require("./src/routes/task.routes");
const notificationRoutes = require("./src/routes/notification.routes");

const app = express();
const allowedOrigins = [
    "http://localhost:5173",
    "https://wedding-verse-ai.vercel.app"
];

route.use(cors({
    origin: (origin, callback) => {

        // Postman / server-to-server
        if (!origin) {
            return callback(null, true);
        }

        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        }

        return callback(
            new Error(
                "CORS origin not allowed."
            )
        );
    },

    credentials: true,

    methods: [
        "GET",
        "POST",
        "PUT",
        "PATCH",
        "DELETE",
        "OPTIONS"
    ],

    allowedHeaders: [
        "Content-Type",
        "Authorization",
        "X-Request-ID"
    ],

    exposedHeaders: [
        "X-RateLimit-Limit",
        "X-RateLimit-Remaining",
        "Retry-After"
    ]
}));


app.use(cookieParser());
app.use(express.json());
app.use("/api/v1/weddings", weddingRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/guests", guestRoutes);
app.use("/api/v1/budget", budgetRoutes);
app.use("/api/v1/vendors", vendorRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);
app.use("/api/v1/ai", aiRoutes);
app.use("/api/v1/tasks", taskRoutes);
app.use("/api/v1/notifications", notificationRoutes);

app.get("/", (req, res) => {
res.json({success: true,
  message: "Marriage Planner API Running 🚀",
});
});

app.use("/api/v1/auth", authRoutes);
app.use(errorHandler);

module.exports = app;
