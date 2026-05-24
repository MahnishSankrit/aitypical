import http from "http";

import dotenv from "dotenv";

import app from "./app.js";

import connectDB from "./src/config/db.js";

import { initSocket } from "./src/socket/socket.js";

import startOrderWatcher from "./src/listner/orderWatcher.js";


dotenv.config();

const PORT = process.env.PORT || 5000;


// Create HTTP server
const server = http.createServer(app);


// Initialize socket.io
initSocket(server);


// Start server
const startServer = () => {

  // Start Express server first so the app can come up even if MongoDB is unavailable.
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

  // Initialize MongoDB in the background.
  void (async () => {
    try {
      await connectDB();
      await startOrderWatcher();
    } catch (error) {
      console.error("MongoDB startup error:", error);
    }
  })();
};


startServer();