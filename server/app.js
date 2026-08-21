require("dotenv").config();

const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// ======================================================
// MIDDLEWARES
// ======================================================

const errorHandler = require("./src/middlewares/error.middleware");

// ======================================================
// ROUTES
// ======================================================

const authRoutes = require("./src/routes/auth.routes");
const weddingRoutes = require("./src/routes/wedding.routes");
const userRoutes = require("./src/routes/user.routes");
const guestRoutes = require("./src/routes/guest.routes");
const budgetRoutes = require("./src/routes/budget.routes");
const vendorRoutes = require("./src/routes/vendor.routes");
const dashboardRoutes = require("./src/routes/dashboard.routes");
const aiRoutes = require("./src/routes/ai.routes");
const taskRoutes = require("./src/routes/task.routes");
const notificationRoutes = require("./src/routes/notification.routes");

// ======================================================
// APP
// ======================================================

const app = express();

// ======================================================
// ALLOWED CORS ORIGINS
// ======================================================

const allowedOrigins = [
  // Local development
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:3000",

  // Localhost IP
  "http://127.0.0.1:5173",
  "http://127.0.0.1:5174",
  "http://127.0.0.1:3000",

  // Production frontend
  "https://wedding-verse-ai.vercel.app",

  // Environment variable
  process.env.CLIENT_URL,
].filter(Boolean);

// Remove duplicate origins
const uniqueAllowedOrigins = [
  ...new Set(allowedOrigins),
];

console.log(
  "🌐 Allowed CORS origins:",
  uniqueAllowedOrigins
);

// ======================================================
// CORS CONFIGURATION
// ======================================================

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests without an Origin header.
      // Examples:
      // - Postman
      // - server-to-server requests
      // - some health checks
      if (!origin) {
        return callback(null, true);
      }

      // Allow configured origins
      if (uniqueAllowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      // Allow localhost development ports
      if (
        origin.startsWith("http://localhost:") ||
        origin.startsWith("http://127.0.0.1:")
      ) {
        return callback(null, true);
      }

      console.error(
        "❌ CORS origin not allowed:",
        origin
      );

      console.log(
        "✅ Allowed origins:",
        uniqueAllowedOrigins
      );

      return callback(
        new Error("CORS origin not allowed.")
      );
    },

    // Required because authentication uses cookies
    credentials: true,

    // Allowed HTTP methods
    methods: [
      "GET",
      "POST",
      "PUT",
      "PATCH",
      "DELETE",
      "OPTIONS",
    ],

    // Allowed request headers
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Request-ID",
    ],

    // Headers exposed to the frontend
    exposedHeaders: [
      "X-RateLimit-Limit",
      "X-RateLimit-Remaining",
      "Retry-After",
    ],

    // Browser cache duration for preflight requests
    maxAge: 86400,
  })
);

// ======================================================
// BODY / COOKIE MIDDLEWARE
// ======================================================

app.use(cookieParser());

app.use(
  express.json({
    limit: "10mb",
  })
);

app.use(
  express.urlencoded({
    extended: true,
    limit: "10mb",
  })
);

// ======================================================
// API V1 ROUTES
// ======================================================

app.use(
  "/api/v1/auth",
  authRoutes
);

app.use(
  "/api/v1/weddings",
  weddingRoutes
);

app.use(
  "/api/v1/users",
  userRoutes
);

app.use(
  "/api/v1/guests",
  guestRoutes
);

app.use(
  "/api/v1/budget",
  budgetRoutes
);

app.use(
  "/api/v1/vendors",
  vendorRoutes
);

app.use(
  "/api/v1/dashboard",
  dashboardRoutes
);

app.use(
  "/api/v1/ai",
  aiRoutes
);

app.use(
  "/api/v1/tasks",
  taskRoutes
);

app.use(
  "/api/v1/notifications",
  notificationRoutes
);

// ======================================================
// HEALTH CHECK / ROOT
// ======================================================

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "WeddingVerse AI API Running 🚀",
    environment:
      process.env.NODE_ENV || "development",
  });
});

// ======================================================
// 404 HANDLER
// ======================================================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `API endpoint ${req.method} ${req.originalUrl} not found.`,
  });
});

// ======================================================
// GLOBAL ERROR HANDLER
// ======================================================

app.use(errorHandler);

// ======================================================
// EXPORT
// ======================================================

module.exports = app;