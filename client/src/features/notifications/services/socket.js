import { io } from "socket.io-client";

const SOCKET_URL =
  import.meta.env.VITE_API_URL?.replace("/api/v1", "") ||
  "https://weddingverse-api-6jkq.onrender.com";

export const socket = io(SOCKET_URL, {
  withCredentials: true,
  autoConnect: false,
});