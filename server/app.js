require("dotenv").config()
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
  "http://localhost:5174",
  "http://localhost:3000",
  "http://127.0.0.1:5173",
  "http://127.0.0.1:5174",
  "https://wedding-verse-ai.vercel.app",
  process.env.CLIENT_URL,
].filter(Boolean);

app.use(cors({
    origin: (origin, callback) => {

        // Postman / server-to-server / localhost dev
        if (!origin) {
            return callback(null, true);
        }

        if (
          allowedOrigins.includes(origin) ||
          origin.startsWith("http://localhost:") ||
          origin.startsWith("http://127.0.0.1:")
        ) {
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

// API v1 Routes
app.use("/api/v1/auth", authRoutes);
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
  res.json({
    success: true,
    message: "Marriage Planner API Running 🚀",
  });
});

app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: `API endpoint ${req.method} ${req.originalUrl} not found.`,
  });
});

app.use(errorHandler);

module.exports = app;
