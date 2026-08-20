const http = require("http");

const env = require("./src/config/env");
const app = require("./app");
const connectDB = require("./src/config/db");

const {
  startNotificationJob,
} = require("./src/jobs/notification.job");

const { Server } = require("socket.io");
const { setIO } = require("./src/config/socket");

const server = http.createServer(app);


// ======================================================
// ALLOWED CLIENT ORIGINS
// ======================================================

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:3000",
  "http://127.0.0.1:5173",
  "http://127.0.0.1:5174",
  "https://wedding-verse-ai.vercel.app",
  process.env.CLIENT_URL,
].filter(Boolean);

// ======================================================
// SOCKET.IO
// ======================================================

const io = new Server(server, {
  cors: {
    origin: (origin, callback) => {
      if (
        !origin ||
        allowedOrigins.includes(origin) ||
        origin.startsWith("http://localhost:") ||
        origin.startsWith("http://127.0.0.1:")
      ) {
        return callback(null, true);
      }
      return callback(new Error("CORS origin not allowed for socket"));
    },
    credentials: true,
  },
});

setIO(io);

app.set("io", io);


// ======================================================
// SOCKET CONNECTION
// ======================================================

io.on("connection", (socket) => {

  console.log(
    `🔌 Socket connected: ${socket.id}`
  );


  // ----------------------------------------------------
  // USER JOINS PERSONAL ROOM
  // ----------------------------------------------------

  socket.on(
    "join-user-room",
    (userId) => {

      if (!userId) {
        return;
      }

      const room = `user:${userId}`;

      socket.join(room);

      console.log(
        `👤 User joined notification room: ${room}`
      );
    }
  );


  // ----------------------------------------------------
  // DISCONNECT
  // ----------------------------------------------------

  socket.on(
    "disconnect",
    () => {

      console.log(
        `🔌 Socket disconnected: ${socket.id}`
      );

    }
  );

});


// ======================================================
// DATABASE + SERVER
// ======================================================

connectDB();

server.listen(
  env.PORT,
  () => {

    console.log(
      `🚀 Server running on http://localhost:${env.PORT}`
    );

    console.log(
      "⚡ Socket.IO real-time notifications enabled"
    );

    startNotificationJob();

  }
);